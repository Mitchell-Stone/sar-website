import React from 'react'
import GpsPoint from "../jobs/classes/GpsPoint"
import { PolygonFromPoints, PolygonFromPolylines } from "../jobs/classes/Polygon"
import Polyline from "../jobs/classes/Polyline"
import Node from "../jobs/classes/Node"
import AllProperties from "../jobs/classes/AllProperties"
import Rover from "../jobs/classes/Rover"

import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
  Circle,
  Polyline as Line,
} from '@react-google-maps/api';

const center = {
  lat: -28.003805072352318,
  lng: 153.29708040847075
}

interface IMapProps {
  mapProps: { center: GpsPoint }
  allProperties: AllProperties
  getPolygon(polygon: PolygonFromPoints): any
}

const libraries: any = ["geometry", "drawing", "places"]

export default function InteractiveMap(props: IMapProps) {
  const { getPolygon, mapProps, allProperties } = props
  const key = "AIzaSyD_9SUYUb4hiLGtH71eIsqiQ4RIHIlQvtc"

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key,
    libraries: libraries
  })

  const containerStyle = {
    width: '100%',
    height: '70vh'
  };

  const drawingOnLoad = (drawingManager: any) => {
    console.log('DRAWING ON LOAD', drawingManager)
  }

  const drawPolygons = (polygons: Array<PolygonFromPoints | PolygonFromPolylines>) => {
    return polygons.map((polygon) => {
      return polygon.polylines.map((polyline, index) => {
        const points = [{ ...polyline.start }, { ...polyline.end }]
        let color = ""
        switch (index) {
          case 0:
            color = "red"
            break;
          case 1:
            color = "green"
            break;
          default:
            color = "blue"
        }
        return <Line
          key={polyline.id}
          path={points}
          options={{
            strokeColor: color,
            strokeOpacity: 0.75,
            strokeWeight: 2
          }}
          onClick={(e) => console.log(e)}
        />
      })
    })
  }

  const drawPolylines = (polylines: Array<Polyline>) => {
    return polylines.map((polyline, index) => {
      let color = ""
        switch (index) {
          case 0:
            color = "red"
            break;
          case 1:
            color = "green"
            break;
          default:
            color = "blue"
        }
      return <Line
        key={polyline.id}
        path={[{ ...polyline.start }, { ...polyline.end }]}
        options={{
          strokeColor: color,
          strokeOpacity: 0.75,
          strokeWeight: 2
        }}
        onClick={(e) => console.log(e)}
      />
    })
  }


  const drawNodes = (nodes: Array<Node>, rover: Rover) => {
    return nodes.map((node, index) => {
      return <Circle
        key={node.id}
        options={{
          strokeColor: "green"
        }}
        center={node.gpsPoint}
        radius={rover.width / 2} />
    })
  }

  return (
    <div style={{ width: 1200, height: 750 }}>
      {isLoaded ?
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapProps.center || center}
          zoom={20}
          onClick={(e: any) => console.log(e)}
        >
          <DrawingManager
            onLoad={drawingOnLoad}
            onPolygonComplete={(polygon: any) => getPolygon(polygon)}
          />
          {/* {allProperties && drawPolygons(allProperties.allPolygons)} */}
          {allProperties && drawPolylines(allProperties.allPolylines)}
          {allProperties && drawNodes(allProperties.allNodes, allProperties.rover)}
        </GoogleMap>
        : <></>
      }
    </div>
  )
}
