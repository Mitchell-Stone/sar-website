const EarthRadius = 6378137

module.exports.calculateCentroid = function ({ points }) {
  const length = points.length
  return points.reduce((acc, curr, index) => {
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

module.exports.pointToPointDistance = function ({ pointA, pointB }) {
  const R = 6371e3 // metres
  // φ, λ in radians
  const φ1 = (pointA.lat * Math.PI) / 180
  const φ2 = (pointB.lat * Math.PI) / 180
  const Δφ = ((pointB.lat - pointA.lat) * Math.PI) / 180
  const Δλ = ((pointB.lng - pointA.lng) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // in metres
}

module.exports.calculateTerminalPoint = function ({ origin, bearing, distance }) {
  const R = 6371e3 // metres

  const φ1 = (origin.lat * Math.PI) / 180
  const λ1 = (origin.lng * Math.PI) / 180
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

module.exports.pointToPointeBearing = function ({ pointA, pointB }) {
  const φ1 = (pointA.lat * Math.PI) / 180
  const φ2 = (pointB.lat * Math.PI) / 180
  const λ1 = (pointA.lng * Math.PI) / 180
  const λ2 = (pointB.lng * Math.PI) / 180

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2)
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)
  const θ = Math.atan2(y, x)
  return ((θ * 180) / Math.PI + 360) % 360
}
