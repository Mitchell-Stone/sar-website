import GpsPoint from "./GpsPoint"
import {PolygonFromPoints} from "./Polygon"

export default class Raycasting {
  
  public isInsidePolygon = (polygon: PolygonFromPoints, point: GpsPoint) => {
    let n = polygon.vertices.length
    let extreme = new GpsPoint(0,point.lng)
  
    if (n < 3) {
      return false
    }
  
    let count = 0
    let i = 0
  
    do {
      let next = (i + 1) % n
      if (this.doIntersect(polygon.vertices[i], polygon.vertices[next], point, extreme)) {
        // If the point is colinear with line
        // segment 'i-next', then check if it lies
        // on segment. If it lies, return true, otherwise false
        if (this.nodeOrientation(polygon.vertices[i], point, polygon.vertices[next]) === 0) {
          return this.onSegment(polygon.vertices[i], point, polygon.vertices[next])
        }
        count++
      }
      i = next
    } while (i !== 0)
  
    return count % 2 === 1;
  }

  private doIntersect(p1: GpsPoint, q1: GpsPoint, p2: GpsPoint, q2: GpsPoint) {
    // Find the four orientations needed for
    // general and special cases
    let o1 = this.nodeOrientation(p1, q1, p2)
    let o2 = this.nodeOrientation(p1, q1, q2)
    let o3 = this.nodeOrientation(p2, q2, p1)
    let o4 = this.nodeOrientation(p2, q2, q1)

    let check = false
    // General case
    if (o1 !== o2 && o3 !== o4) {
      check = true
    }
    // Special Cases
    // p1, q1 and p2 are colinear and
    // p2 lies on segment p1q1
    if (o1 === 0 && this.onSegment(p1, p2, q1)) {
      check = true
    }
  
    // p1, q1 and p2 are colinear and
    // q2 lies on segment p1q1
    if (o2 === 0 && this.onSegment(p1, q2, q1)) {
      check = true
    }
  
    // p2, q2 and p1 are colinear and
    // p1 lies on segment p2q2
    if (o3 === 0 && this.onSegment(p2, p1, q2)) {
      check = true
    }
  
    // p2, q2 and q1 are colinear and
    // q1 lies on segment p2q2
    if (o4 === 0 && this.onSegment(p2, q1, q2)) {
      check = true
    }
  
    // Doesn't fall in any of the above cases
    return check
  }

  private onSegment(p: GpsPoint, q: GpsPoint, r: GpsPoint) {
    if (
      q.lat <= Math.max(p.lat, r.lat) &&
      q.lat >= Math.min(p.lat, r.lat) &&
      q.lng <= Math.max(p.lng, r.lng) &&
      q.lng >= Math.min(p.lng, r.lng)
    ) {
      return true
    }
    return false
  }

  private nodeOrientation(p: GpsPoint, q: GpsPoint, r: GpsPoint) {
    let val =
      (q.lat - p.lat) * (r.lng - q.lng) - (q.lng - p.lng) * (r.lat - q.lat)
  
    if (val === 0) {
      return 0 // colinear
    }
    return val > 0 ? 1 : 2 // clock or counterclock wise
  } 
}