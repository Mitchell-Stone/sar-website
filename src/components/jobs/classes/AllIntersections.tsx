import GpsPoint from './GpsPoint';
import { PolygonFromPolylines } from './Polygon'

export type Intersections = Array<Intersection>;

export default class AllIntersections {
  allIntersections: Intersections = []
  groupedIntersections: Array<Intersections> = []
  allIntersectionPoints: Array<GpsPoint> = []
  private polygon: PolygonFromPolylines

  constructor(polygon: PolygonFromPolylines) {
    this.polygon = polygon;
    this.generatePatterns(polygon)
    // this.walkThroughEdges(polygon)

  }

  walkThroughEdges(polygon: PolygonFromPolylines) {

    let points = []

    for (let i = 0; i < polygon.polylines.length; i++) {
      console.log('I', polygon.polylines[i])
      for (let j = 0; j < polygon.polylines.length; j++) {
        console.log('J', polygon.polylines[j])
        if (i !== j) {
          if (polygon.polylines[i].doesIntersect(polygon.polylines[j])) {
            points.push(polygon.polylines[i].intersectionPoint(polygon.polylines[j]))
          }
        }
      }
    }
    this.allIntersectionPoints = [...this.allIntersectionPoints, ...points]
    console.log(points)
  }

  generatePatterns(polygon: PolygonFromPolylines): void {
    let intersections: Intersections = []
    let polylines = polygon.polylines

    for (let i = 0; i < polylines.length; i++) {
      let indexOf = polylines.indexOf(polylines[i])
      for (let j = indexOf; j < polylines.length + indexOf; j++) {
        let next_index = (j + polylines.length) % polylines.length
        if (polylines[next_index].doesIntersect(polylines[i])) {
          intersections = [
            ...intersections, new Intersection(
              polylines[i].order,
              polylines[next_index].order,
              polylines[i].intersectionPoint(polylines[next_index])
            )
          ]
        }
      }
    }
    this.allIntersections = intersections
    this.alignIntersectionsByOrder()
  }

  alignIntersectionsByOrder() {
    for (const intersection of this.allIntersections) {
      this.groupedIntersections[intersection.comparisonOrder] !== undefined
        ? this.groupedIntersections[intersection.comparisonOrder] =
        [
          ...this.groupedIntersections[intersection.comparisonOrder],
          intersection
        ]
        : this.groupedIntersections[intersection.comparisonOrder] = [intersection]
    }
    this.findRelevantIntersectionPoints()
  }

  private filterIntersectionPairs(intersectionPairs: Array<Intersections>) {

    let pairs: Array<Intersection> = []

    for (let i = 0; i < intersectionPairs.length; i++) {
      if (i === 0) {
        for (const pair of intersectionPairs[i]) {
          if (Math.abs(pair.comparisonOrder - pair.intersectionOrder) > 1) {
            pairs.push(pair)
          }
        }
      }
      else {
        let comparison = intersectionPairs[i].reduce((acc, curr) => {
          if (Math.abs(curr.comparisonOrder - curr.intersectionOrder) > 1) {
            acc = curr
          }

          return acc
        })

        // check match exists
        let found = pairs.find(pair =>
          pair.comparisonOrder === comparison.intersectionOrder
          && pair.intersectionOrder === comparison.comparisonOrder
        )
        if (found) {
          continue
        }
      }
    }
    return pairs
  }

  findRelevantIntersectionPoints() {
    let groups = this.groupedIntersections

    let intersections = groups.filter(item => item.length > 2)

    let filtered = this.filterIntersectionPairs(intersections)
    console.log("filtered", filtered)

    // if (filtered.length > 0) {
    //   let indices_to_remove = filtered.map(item => {
    //     let indices = []
    //     if (Math.abs(item.comparisonOrder - item.intersectionOrder) > 1) {
    //       // intersection occured over the final index
    //       if (item.intersectionOrder === groups.length || item.intersectionOrder === groups.length - 1) {
    //         for (let i = 0; i < item.comparisonOrder; i++) {
    //           indices.push(i)
    //         }
    //       } else {
    //         for (let i = item.comparisonOrder; i < item.intersectionOrder; i++) {
    //           indices.push(i)
    //         }
    //       }
    //     }
    //     return indices
    //   }).reduce(n => n)

    //   for (let i = 0; i < indices_to_remove.length; i++) {
    //     groups.splice(indices_to_remove[i], 1)
    //   }
    // }


    // TODO remove one the other intersection with a length of 3

    // let indices_to_remove = groups.filter(group => group)
    console.log("GROUPS", groups)

    for (let i = 0; i < groups.length; i++) {

      if (groups[i].length === 2) {
        // normal intersections between the next and previous polylines
        // return the point of the intersection which is moving to the next line e.g 0 - 1 or 2 - 3
        for (const intersection of groups[i]) {
          let next = intersection.comparisonOrder + 1 === this.polygon.polylines.length ? 0 : intersection.comparisonOrder + 1

          if (intersection.intersectionOrder === next) {
            // console.log('STANDARD INTERSECTION', intersection)

            this.allIntersectionPoints = [...this.allIntersectionPoints, intersection.intersectionPoint]
          }
        }
      }

      if (groups[i].length === 3) {
        // console.log('groups[i]',groups[i])

        for (const intersection of groups[i]) {
          if (Math.abs(intersection.comparisonOrder - intersection.intersectionOrder) > 1) {
            this.allIntersectionPoints = [...this.allIntersectionPoints, intersection.intersectionPoint]
          }
        }
        // console.log(this.allIntersectionPoints)
      }
    }
  }
}

class Intersection {
  comparisonOrder: number;
  intersectionOrder: number;
  intersectionPoint: GpsPoint;

  constructor(comparisonOrder: number, intersectionOrder: number, intersectionPoint: GpsPoint) {
    this.comparisonOrder = comparisonOrder;
    this.intersectionOrder = intersectionOrder;
    this.intersectionPoint = intersectionPoint;
  }
}