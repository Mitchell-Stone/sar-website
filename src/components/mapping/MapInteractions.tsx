import GpsPoint from "../jobs/classes/GpsPoint";

export const getPolygonVertices = (polygon: any): GpsPoint[] => {
  var polygonBounds = polygon.getPath();
  var perimeter: GpsPoint[] = [];
  for (var i = 0; i < polygonBounds.length; i++) {
    perimeter.push(
      new GpsPoint(
        polygonBounds.getAt(i).lat(), 
        polygonBounds.getAt(i).lng()
        )
      );
  }
  return perimeter;
}