import GpsPoint from "../classes/GpsPoint"

const earthRadius = 6371e3;

export function pointToPointMidpoint(pointA: GpsPoint, pointB: GpsPoint): GpsPoint {
    return new GpsPoint((pointA.lat + pointB.lat) / 2, (pointA.lng + pointB.lng) / 2)
}

export function pointToPointDistance (pointA: GpsPoint, pointB: GpsPoint): number {
    const φ1 = toRadians(pointA.lat)
    const φ2 = toRadians(pointB.lat)
    const Δφ = toRadians(pointB.lat - pointA.lat)
    const Δλ = toRadians(pointB.lng - pointA.lng)
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  
    return earthRadius * c // in metres
  }

  export function toRadians(input: number): number {
    return (input * Math.PI) / 180
  }

  export function toDegrees(input: number): number {
    return (input * 180) / Math.PI
  }

  export function bearingNormalization(bearing: number): number {
    let new_bearing = 0
    if (bearing > 360) {
      new_bearing = bearing - 360
    } else if (bearing < 0) {
      new_bearing = 360 - Math.abs(bearing)
    } else {
      new_bearing = bearing
    }
    return new_bearing
  }