import Polyline from "./Polyline"
import GpsPoint from "./GpsPoint"
import Rover from "./Rover"
import Node from "./Node"
import { v4 as uuidv4 } from 'uuid';

export enum PolygonDirection {
  CLOCKWISE = "CLOCKWISE",
  ANTICLOCKWISE = "ANTICLOCKWISE",
  INVALID = "INVALID"
}
export enum PolygonType {
  PRIMARY_POLYGON = "PRIMARY_POLYGON",
  SECONDARY_POLYGON = "SECONDARY_POLYGON",
  POLYGONS = "POLYGONS"
}

export class PolygonFromPoints {
  private _direction: PolygonDirection;
  public get direction(): PolygonDirection { return this._direction }
  public set direction(dir: PolygonDirection) { this._direction = dir; }

  polylines: Array<Polyline> = [];
  polygonNodes: Array<Node> = [];
  vertices: Array<GpsPoint> = [];
  type: string;
  id: string;
  private rover: Rover;

  constructor(vertices: GpsPoint[], rover: Rover, type: PolygonType) {
    this.rover = rover;
    this.vertices = vertices;
    this.type = type;
    this.id = uuidv4()
    this.polygonDirection();
    this.createPolylines();
    this.getPolylineNodes();
    this.setAdjacentPolylines();
  }

  private setAdjacentPolylines() {
    for (let i = 0; i < this.polylines.length; i++) {
      let prev = i === 0 ? this.polylines.length - 1 : i - 1
      let next = i === this.polylines.length - 1 ? 0 : i + 1
      this.polylines[i].adjacentPolylines = {
        nextId: this.polylines[next].id,
        previousId: this.polylines[prev].id
      }
    }
  }

  private createPolylines(): void {
    if (this.vertices.length === 2) {
      this.polylines.push(new Polyline(this.vertices[0], this.vertices[1], this.rover, 1))
      this.polygonNodes.push(new Node(this.vertices[1].lat, this.vertices[1].lng))
    } else {
      for (let i = 0; i < this.vertices.length; i++) {
        let next = i === this.vertices.length - 1 ? 0 : i + 1
        this.polylines.push(new Polyline(this.vertices[i], this.vertices[next], this.rover, i))
      }
    }
  }

  public deletePolyline(polyline: Polyline): void {
    let index = this.polylines.indexOf(polyline)
    if (index > -1) {
      this.polylines.splice(index, 1)
    }
  }

  private polygonDirection(): void {
    let vertices = this.vertices
    if (!vertices || vertices.length < 3) this.direction = PolygonDirection.INVALID;
    let area = 0
    for (let i = 0; i < vertices.length; i++) {
      let j = (i + 1) % vertices.length
      area += vertices[i].lat * vertices[j].lng
      area -= vertices[j].lat * vertices[i].lng
    }
    this.direction = area > 0 ? PolygonDirection.CLOCKWISE : PolygonDirection.ANTICLOCKWISE
  }

  private getPolylineNodes() {
    this.polylines.forEach(polyline => {
      this.polygonNodes = [...this.polygonNodes, ...polyline.nodes]
    })
  }
}

export class PolygonFromPolylines {
  private _direction: PolygonDirection;
  public get direction(): PolygonDirection { return this._direction }
  public set direction(dir: PolygonDirection) { this._direction = dir; }

  polylines: Array<Polyline> = [];
  polygonNodes: Array<Node> = [];
  vertices: Array<GpsPoint> = [];
  type: string;
  id: string;

  constructor(polylines: Array<Polyline>, type: PolygonType) {
    this.vertices = polylines.map(line =>line.start);
    this.type = type;
    this.polylines = polylines
    this.id = uuidv4()
    this.polygonDirection();
    this.getPolylineNodes();
    this.setAdjacentPolylines();
  }

  private setAdjacentPolylines() {
    for (let i = 0; i < this.polylines.length; i++) {
      let prev = i === 0 ? this.polylines.length - 1 : i - 1
      let next = i === this.polylines.length - 1 ? 0 : i + 1
      this.polylines[i].adjacentPolylines = {
        nextId: this.polylines[next].id,
        previousId: this.polylines[prev].id
      }
    }
  }

  public deletePolyline(polyline: Polyline): void {
    let index = this.polylines.indexOf(polyline)
    if (index > -1) {
      this.polylines.splice(index, 1)
    }
  }

  private polygonDirection(): void {
    let vertices = this.vertices
    if (!vertices || vertices.length < 3) this.direction = PolygonDirection.INVALID;
    let area = 0
    for (let i = 0; i < vertices.length; i++) {
      let j = (i + 1) % vertices.length
      area += vertices[i].lat * vertices[j].lng
      area -= vertices[j].lat * vertices[i].lng
    }
    this.direction = area > 0 ? PolygonDirection.CLOCKWISE : PolygonDirection.ANTICLOCKWISE
  }

  private getPolylineNodes() {
    this.polylines.forEach(polyline => {
      this.polygonNodes = [...this.polygonNodes, ...polyline.nodes]
    })
  }
}
