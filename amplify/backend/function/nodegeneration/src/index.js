/*
To know how to push lambda up
"amplify function build" builds all of your functions currently in the project
"amplify mock function <functionName>" runs your function locally
"amplify push" builds all of your local backend resources and provisions them in the cloud
"amplify publish" builds all of your local backend and front-end resources (if you added hosting category) and provisions them in the cloud
*/

const {
  calculateCentroid,
  vertexToVertexDistance,
  calculateTerminalVertex,
  vertexToVertexBearing,
  bearingAngleDifference,
  polygonDirection,
  internalPerpendicularBearing,
} = require("./gpsCalculations")

const { isInside } = require("./racasting")

exports.handler = async event => {
  // Each vertex in vertices represents a corner of the polygon
  const { vertices, internalShape } = event

  const centroid = calculateCentroid({ vertices: vertices })

  const polygon_direction = polygonDirection({ vertices: vertices })

  let array_length = vertices.length

  const split_vertex_array = ({ vertices: vertices }) => {
    let temp_array = []
    let chunk = internalShape.vertexCount
    for (let i = 0, j = vertices.length; i < j; i += chunk) {
      temp_array = vertices.slice(i, i + chunk)
    }
    return temp_array
  }

  const array_chunks = (array, chunk_size) =>
    Array(Math.ceil(array.length / chunk_size))
      .fill()
      .map((_, index) => index * chunk_size)
      .map(begin => array.slice(begin, begin + chunk_size))

  const boundary_threads = vertices.map((vertex, index) => {
    let next_vertex =
      index === vertices.length - 1 ? vertices[0] : vertices[index + 1]
    let bearing = vertexToVertexBearing({
      vertexA: vertex,
      vertexB: next_vertex,
    })

    let thread = {
      start: vertex,
      end: next_vertex,
      length: vertexToVertexDistance({ vertexA: vertex, vertexB: next_vertex }),
      bearing: bearing,
      internalPerpendicularBearing: internalPerpendicularBearing({
        bearing: bearing,
        direction: polygon_direction,
      }),
    }

    return thread
  })

  // const framework = boundary_threads.map((thread, index) => {
  //   let next_edge =
  //     index === boundary_threads.length - 1
  //       ? boundary_threads[0]
  //       : boundary_threads[index + 1]

  //   let internal_angle = bearingAngleDifference({
  //     bearingA: edge.bearing,
  //     bearingB: pointProperties.previouBearing,
  //   })

  //   let internal_bearing =
  //     polygon_direction === "CLOCKWISE"
  //       ? pointProperties.bearingToNext + internal_angle / 2
  //       : pointProperties.bearingToNext - internal_angle / 2

  //   let frame = {
  //     start: centroid,
  //   }
  // })

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      split_vertex_array: array_chunks(vertices, 2),
    }),
  }
  return response
}

/* 

const corners = points.map((point, index) => {
    const current = point
    const next = index === points.length - 1 ? points[0] : points[index + 1]
    const previous = index === 0 ? points[points.length - 1] : points[index - 1]

    let pointProperties = {
      point: current,
      next: next,
      previous: previous,
      nextDistance: pointToPointDistance({ pointA: current, pointB: next }),
      previousDistance: pointToPointDistance({
        pointA: current,
        pointB: previous,
      }),
      nextBearing: pointToPointeBearing({ pointA: current, pointB: next }),
      previouBearing: pointToPointeBearing({
        pointA: current,
        pointB: previous,
      }),
    }
    // Find the internal direction for the point given the 2 bearings
    let internal_angle = bearingAngleDifference({
      nextBearing: pointProperties.nextBearing,
      previousBearing: pointProperties.previouBearing,
    })

    let internal_bearing =
      polygon_direction === "CLOCKWISE"
        ? pointProperties.bearingToNext + internal_angle / 2
        : pointProperties.bearingToNext - internal_angle / 2

    pointProperties["internalBearing"] = internal_bearing

    return pointProperties
  })

*/
