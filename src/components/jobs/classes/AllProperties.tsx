import { PolygonFromPoints, PolygonFromPolylines, PolygonDirection, PolygonType } from "./Polygon";
import Polyline from "./Polyline";
import GpsPoint from "./GpsPoint";
import Node from "./Node";
import Rover from "./Rover";
import AllIntersections from "./AllIntersections";

export default class AllProperties {
  allNodes: Array<Node> = []
  allPolylines: Array<Polyline> = []
  allPolygons: Array<PolygonFromPoints | PolygonFromPolylines> = []
  rover: Rover
  primaryDirection: PolygonDirection


  constructor(vertices: Array<GpsPoint>, rover: Rover) {
    this.rover = rover
    // The first polygon is always the primary perimeter
    let primary_polygon = new PolygonFromPoints(vertices, rover, PolygonType.PRIMARY_POLYGON)
    this.primaryDirection = primary_polygon.direction
    this.allPolylines = [...this.allPolylines, ...primary_polygon.polylines]
    this.allPolygons[0] = primary_polygon

    let secondary_polygon = new PolygonFromPoints(vertices, rover, PolygonType.PRIMARY_POLYGON)
    this.primaryDirection = primary_polygon.direction
    this.allPolylines = [...this.allPolylines, ...primary_polygon.polylines]
    this.allPolygons[0] = primary_polygon

    var next_polygon: PolygonFromPoints | PolygonFromPolylines = primary_polygon

    for (let i = 0; i <13; i++) {
      let scaled_polylines: Array<Polyline> = this.scaledPolylines(next_polygon, rover.width)
      let scaled_polygon = new PolygonFromPolylines(scaled_polylines, PolygonType.POLYGONS)
      this.allPolylines = [...this.allPolylines, ...scaled_polylines] // for debugging

      let all_intersections = new AllIntersections(scaled_polygon)

      // console.log('all_intersections', all_intersections)


      next_polygon = new PolygonFromPoints(all_intersections.allIntersectionPoints, this.rover, PolygonType.POLYGONS)
      this.allPolygons = [...this.allPolygons, next_polygon]
    }
  }

  scaledPolylines(polygon: PolygonFromPoints | PolygonFromPolylines, distance: number): Array<Polyline> {
    return polygon.polylines.map((line, index) => {
      let perpendicular_bearing = this.primaryDirection === PolygonDirection.CLOCKWISE
        ? line.bearing + 90
        : line.bearing - 90
      let start_point = line.start.terminalPoint(perpendicular_bearing, distance)
      let end_point = line.end.terminalPoint(perpendicular_bearing, distance)
      let polyline = new Polyline(start_point, end_point, this.rover, index)
      return polyline
    })
  }
}


//#region 
/*


    let middle_value = Math.round((group[i].intersectionOrder + group[i].comparisonOrder) / 2);
    this.allIntersections = this.allIntersections.splice(middle_value, 1)

type Intersection = {
  intersectingPolyline: Polyline
  intersectionPoint: GpsPoint
  comparisonPolyline: Polyline
}
  let sorted = polylines
      .filter(polyline => polyline.doesIntersect(polylineToCheck))
      .sort((a, b) => a.order > b.order ? 1 : -1)

      // this.firstIntersection = this.checkIntersection(scaled_polylines, scaled_polylines[scaled_polylines.length - 1])

dothing(polylines: Array<Polyline>, polyline: Polyline): void {
    let next_polyline = this.checkIntersection(polylines, polyline)
    this.tempPolylines = [...this.tempPolylines, next_polyline]
    if (next_polyline.order !== this.firstIntersection.order) {
      console.log(next_polyline.id)
      this.dothing(polylines, next_polyline)
    }
  }

  let next = i + 1 < polylines.length ? i + 1 : 0
        let previous = i === 0 ? allIntersections.length - 1 : i - 1

        let polylines: Array<Polyline> = []
      for (let j = 0; j < scaled_polylines.length; j++) {
        let next = j + 1 < scaled_polylines.length ? j + 1 : 0
        if (scaled_polylines[j].doesIntersect(scaled_polylines[next])) {
          let point = scaled_polylines[j].intersectionPoint(scaled_polylines[next])
          points.push(point)
          this.allNodes = [...this.allNodes, new Node(point.lat, point.lng)]
        }
      }
      let polygon = new PolygonFromPoints(points, this.rover, PolygonType.POLYGONS)
      this.allPolygons = [...this.allPolygons, polygon]
      points = []


    // for (let i = 0; i < 12; i++) {
    //   let scaled_polylines: Array<Polyline> = this.scaledPolylines(next_polygon, rover.width)
    //   this.allPolylines = [...this.allPolylines, ...scaled_polylines]
    //   let scaled_polygon = this.trimPolylines(scaled_polylines)
    //   console.log('POLYGON SCALED')
    //   this.allPolygons = [...this.allPolygons, scaled_polygon]

    //   next_polygon = this.manageIntersections(scaled_polygon)
    //   console.log('NEW POLYGON')
    // }


  // trimPolylines(polylines: Array<Polyline>): PolygonFromPoints {
  //   let points: Array<GpsPoint> = []
  //   for (let i = 0; i < polylines.length; i++) {
  //     let next = i + 1 < polylines.length ? i + 1 : 0
  //     if (polylines[i].doesIntersect(polylines[next])) {
  //       points.push(polylines[i].intersectionPoint(polylines[next]))
  //     } else {
  //       for (let j = 0; j < polylines.length; j++) {
  //         if (polylines[i].doesIntersect(polylines[j])) {
  //           points.push(polylines[i].intersectionPoint(polylines[j]))
  //         }
  //       }
  //     }
  //   }
  //   return new PolygonFromPoints(points, this.rover, PolygonType.POLYGONS)
  // }

  // manageIntersections(polygon: PolygonFromPoints | PolygonFromPolylines): PolygonFromPoints | PolygonFromPolylines {
  //   let all_intersections: Array<Intersection> = []
  //   console.log('intersections', polygon.polylines)

  //   for (const polyine of polygon.polylines) {
  //     all_intersections = [...all_intersections, ...this.findIntersections(polygon.polylines, polyine)]

  //   }
  //   console.log('intersections', all_intersections)
  //   return polygon
  // }

  // findIntersections(polylines: Array<Polyline>, polylineToCheck: Polyline): Array<Intersection> {
  //   let indexOf = polylines.indexOf(polylineToCheck)
  //   let allIntersections: Array<Intersection> = []
  //   // This for loop starts at the index for the polyline of interest and continues back round
  //   // e.g. if index = 3 from [0, 1, 2, 3, 4, 5] output will be 3, 4, 5, 0, 1, 2
  //   // the idea is that it only the first intersecting polyline will be first in the list
  //   for (let i = indexOf; i < polylines.length + indexOf; i++) {
  //     let next_index = (i + polylines.length) % polylines.length
  //     if (polylines[next_index].doesIntersect(polylineToCheck)) {
  //       let point = polylines[next_index].intersectionPoint(polylineToCheck)
  //       allIntersections.push({
  //         intersectingPolyline: polylines[next_index],
  //         intersectionPoint: point,
  //         comparisonPolyline: polylineToCheck
  //       })
  //     }
  //   }

  //   let updated_intersections: Array<Intersection> = []
  //   if (allIntersections.length > 0) {
  //     for (let i = 0; i < allIntersections.length; i++) {
  //       // this check is put in place because there seems to be a tiny variance in how the intersection is calculated
  //       // in this case we are only looking for intersections that appear after the next or previos polyline
  //       if (
  //         polylineToCheck.adjacentPolylines.nextId !== allIntersections[i].intersectingPolyline.id
  //         && polylineToCheck.adjacentPolylines.previousId !== allIntersections[i].intersectingPolyline.id
  //       ) {
  //         this.allNodes = [...this.allNodes, new Node(allIntersections[i].intersectionPoint.lat, allIntersections[i].intersectionPoint.lng)]
  //         updated_intersections.push(allIntersections[i])
  //       }
  //     }
  //   }
  //   return updated_intersections
  // }

  // findFirstIntersection(polylines: Array<Polyline>): Polyline {
  //   let polyline = polylines[0]
  //   for (let i = 0; i < polylines.length; i++) {
  //     if (polylines[i].doesIntersect(polylines[polylines.length - 1])) {
  //       polyline.start = polylines[i].intersectionPoint(polylines[polylines.length - 1])
  //       polyline = polylines[i]
  //       break;
  //     }
  //   }
  //   return polyline;
  // }
*/

//#endregion