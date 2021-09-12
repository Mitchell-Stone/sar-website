/*
To know how to push lambda up
"amplify function build" builds all of your functions currently in the project
"amplify mock function <functionName>" runs your function locally
"amplify push" builds all of your local backend resources and provisions them in the cloud
"amplify publish" builds all of your local backend and front-end resources (if you added hosting category) and provisions them in the cloud
*/
const {
  calculateCentroid,
  pointToPointDistance,
  calculateTerminalPoint,
  pointToPointeBearing
} = require("./formula")

exports.handler = async event => {
  // Each point in points represents a corner of the polygon
  const { points, rover } = event

  const centroid = calculateCentroid({ points: points })

  const edges = points.map(point => {
    
  })

  const threads = points.map(point => {
    return {
      start: centroid,
      end: point,
      distance: pointToPointDistance({ pointA: centroid, pointB: point }),
      bearing: pointToPointeBearing({ pointA: centroid, pointB: point }),
    }
  })

  const nodes = threads.map(thread => {
    const split = thread.distance / rover.width


  })


  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify({
      threads: threads,
    }),
  }
  return response
}
