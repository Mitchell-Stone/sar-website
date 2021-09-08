import { pointToPointDistance, bearingNormalization, toDegrees } from "../static/Formula"
import GpsPoint from "../classes/GpsPoint"
import Node from "./Node"
import Rover from "./Rover"
import { matrix, inv, multiply, index } from 'mathjs'
import { v4 as uuidv4 } from 'uuid';

type TAdjacentPolylines = {
  nextId: string,
  previousId: string
}

export default class Polyline {
  private _start: GpsPoint;
  public get start(): GpsPoint {
    return this._start
  }
  public set start(v: GpsPoint) {
    this._start = v;
  }

  private _end: GpsPoint;
  public get end(): GpsPoint {
    return this._end
  }
  public set end(v: GpsPoint) {
    this._end = v;
  }

  mid: GpsPoint;
  length: number;
  bearing: number;
  nodes: Array<Node>;
  id: string
  order: number;

  private _adjacentPolylines: TAdjacentPolylines
  public get adjacentPolylines(): TAdjacentPolylines {
    return this._adjacentPolylines
  }
  public set adjacentPolylines(value: TAdjacentPolylines) {
    this._adjacentPolylines = value;
  }

  private rover: Rover

  constructor(start: GpsPoint, end: GpsPoint, rover: Rover, order: number) {
    this.rover = rover;
    this.start = start;
    this.end = end;
    this.mid = this.polylineMidpoint()
    this.length = pointToPointDistance(start, end)
    this.bearing = this.calculateBearing()
    this.id = uuidv4()
    this.nodes = this.generateNodes()
    this.order = order;

  }

  private calculateBearing(): number {
    let bearing = bearingNormalization(
      toDegrees(
        Math.atan2(this.end.lng - this.start.lng, this.end.lat - this.start.lat)
      )
    )

    return (bearing > 0 && bearing < 90) || (bearing > 180 && bearing < 270) ? bearing - 7.55 : bearing + 8.3 // need to figure out why it does this
    // return bearing 
  }

  private polylineMidpoint(): GpsPoint {
    return new GpsPoint(
      (this.start.lat + this.end.lat) / 2,
      (this.start.lng + this.end.lng) / 2
    )
  }

  private generateNodes(): Array<Node> {
    let length = this.length
    let width = this.rover.width

    let node_count = Math.floor(length / width)
    let node_distance = (length % width / Math.floor(length / width)) + width

    let nodes: Array<Node> = []
    if (length < width * 1.8) {
      nodes.push(new Node(this.mid.lat, this.mid.lng))
    } else {
      for (let i = 1; i < node_count; i++) {
        let distance_on_line = node_distance * i;
        let point = this.terminalPointOnLine(
          distance_on_line,
          length
        )
        nodes.push(point)
      }
    }
    nodes.push(new Node(this.start.lat, this.start.lng))
    return nodes
  }

  private terminalPointOnLine(distance: number, length: number): Node {
    let distance_ratio = distance / length
    let point: GpsPoint = new GpsPoint(
      ((1 - distance_ratio) * this.start.lat + distance_ratio * this.end.lat),
      ((1 - distance_ratio) * this.start.lng + distance_ratio * this.end.lng)
    )
    return new Node(point.lat, point.lng)
  }

  public intersectionPoint(polyline: Polyline): GpsPoint {
    let φ1 = this.start.lat
    let λ1 = this.start.lng
    let φ2 = this.end.lat
    let λ2 = this.end.lng
    let φ3 = polyline.start.lat
    let λ3 = polyline.start.lng
    let φ4 = polyline.end.lat
    let λ4 = polyline.end.lng

    let matrix_a = matrix([
      [1, (λ1 - λ2) / (φ2 - φ1)],
      [1, (λ3 - λ4) / (φ4 - φ3)]
    ])
    let matrix_b = matrix([
      [λ1 - (((φ1 * λ2) - (φ1 * λ1)) / (φ2 - φ1))],
      [λ3 - (((φ3 * λ4) - (φ3 * λ3)) / (φ4 - φ3))]
    ])
    let inverse = inv(matrix_a)

    let result = multiply(inverse, matrix_b)

    let lat = result.subset(index(1, 0)) as unknown
    let lng = result.subset(index(0, 0)) as unknown

    return new GpsPoint(lat as number, lng as number)
  }

  public doesIntersect(polyline: Polyline) {
    const φ1 = this.start.lat
    const λ1 = this.start.lng
    const φ2 = this.end.lat
    const λ2 = this.end.lng
    const φ3 = polyline.start.lat
    const λ3 = polyline.start.lng
    const φ4 = polyline.end.lat
    const λ4 = polyline.end.lng

    var det = (φ2 - φ1) * (λ4 - λ3) - (φ4 - φ3) * (λ2 - λ1);
    if (det === 0) {
      return false;
    } else {
      var lambda = ((λ4 - λ3) * (φ4 - φ1) + (φ3 - φ4) * (λ4 - λ1)) / det;
      var gamma = ((λ1 - λ2) * (φ4 - φ1) + (φ2 - φ1) * (λ4 - λ1)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  }
}



