import { toRadians, toDegrees } from "../static/Formula"
import { v4 as uuidv4 } from 'uuid';

const earthRadius = 6371e3;

export type TGpsPoint = {
  lat: number;
  lng: number;
}

export default class GpsPoint {
  lat: number;
  lng: number;
  id: string;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    this.id = uuidv4();
  }

  public terminalPoint(bearing: number, distance: number): GpsPoint {
    let φ1 = toRadians(this.lat)
    let λ1 = toRadians(this.lng)
    let θ = toRadians(bearing)

    let φ2 = Math.asin(
      Math.sin(φ1) * Math.cos(distance / earthRadius) +
      Math.cos(φ1) * Math.sin(distance / earthRadius) * Math.cos(θ)
    )

    let λ2 =
      λ1 +
      Math.atan2(
        Math.sin(θ) * Math.sin(distance / earthRadius) * Math.cos(φ1),
        Math.cos(distance / earthRadius) - Math.sin(φ1) + Math.sin(φ2)
      )

    return new GpsPoint(toDegrees(φ2), toDegrees(λ2))
  }
}