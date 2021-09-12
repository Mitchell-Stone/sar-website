module.exports.calculateCentroid = function ({ vertices }) {
  const length = vertices.length
  return vertices.reduce((acc, curr, index) => {
    if (index === length - 1) {
      return {
        lat: (acc.lat + curr.lat) / length,
        lng: (acc.lng + curr.lng) / length,
      }
    } else {
      return {
        lat: acc.lat + curr.lat,
        lng: acc.lng + curr.lng,
      }
    }
  })
}

module.exports.vertexToVertexDistance = function ({ vertexA, vertexB }) {
  const R = 6371e3 // metres
  // φ, λ in radians
  const φ1 = (vertexA.lat * Math.PI) / 180
  const φ2 = (vertexB.lat * Math.PI) / 180
  const Δφ = ((vertexB.lat - vertexA.lat) * Math.PI) / 180
  const Δλ = ((vertexB.lng - vertexA.lng) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // in metres
}

module.exports.calculateTerminalVertex = function ({
  originVertex,
  bearing,
  distance,
}) {
  const R = 6371e3 // metres

  const φ1 = (originVertex.lat * Math.PI) / 180
  const λ1 = (originVertex.lng * Math.PI) / 180
  const θ = (bearing * Math.PI) / 180

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(distance / R) +
      Math.cos(φ1) * Math.sin(distance / R) * Math.cos(θ)
  )

  const λ2 =
    λ1 +
    Math.atan2(
      Math.sin(θ) * Math.sin(distance / R) * Math.cos(φ1),
      Math.cos(distance / R) - Math.sin(φ1) + Math.sin(φ2)
    )

  return {
    terminalPoint: {
      lat: (φ2 * 180) / Math.PI,
      lng: (λ2 * 180) / Math.PI,
    },
  }
}

module.exports.vertexToVertexBearing = function ({ vertexA, vertexB }) {
  const φ1 = (vertexA.lat * Math.PI) / 180
  const φ2 = (vertexB.lat * Math.PI) / 180
  const λ1 = (vertexA.lng * Math.PI) / 180
  const λ2 = (vertexB.lng * Math.PI) / 180

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2)
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)
  const θ = Math.atan2(y, x)
  return ((θ * 180) / Math.PI + 360) % 360
}

module.exports.bearingAngleDifference = function ({ bearingA, bearingB }) {
  if (bearingA > bearingB) {
    return bearingA - bearingB
  } else {
    return 360 - Math.abs(bearingA - bearingB)
  }
}

module.exports.polygonDirection = function ({ vertices }) {
  let signed_area = 0

  for (let i = 0; i < vertices.length; i++) {
    let φ1 = vertices[i].lat
    let λ1 = vertices[i].lng

    if (i === vertices.length - 1) {
      let φ2 = vertices[0].lat
      let λ2 = vertices[0].lng
      signed_area += (φ1 * λ2 - φ2 * λ1) / 2
    } else {
      let φ2 = vertices[i + 1].lat
      let λ2 = vertices[i + 1].lng
      signed_area += φ1 * λ2 - φ2 * λ1
    }
  }

  if (signed_area > 0) {
    return { direction: "CLOCKWISE", signedArea: signed_area }
  } else {
    return { direction: "ANTI-CLOCKWISE", signedArea: signed_area }
  }
}

module.exports.internalPerpendicularBearing = function ({
  bearing,
  direction,
}) {
  if (direction === "CLOCKWISE") {
    // add 90
    return bearingCorrection({ bearing: bearing + 90 })
  } else {
    // subtract 90
    return bearingCorrection({ bearing: bearing - 90 })
  }
}

function bearingCorrection({ bearing }) {
  if (bearing > 360) {
    return bearing - 360
  } else if (bearing < 0) {
    return 360 - Math.abs(bearing)
  } else {
    return bearing
  }
}

module.exports.pythagorasTheorem = function ({ length, height }) {
  return Math.sqrt(length * length + height * height)
}
