import React, { useReducer, useEffect, useState } from 'react'
import InteractiveMap from "../mapping/InteractiveGoogleMap"
import { getPolygonVertices } from "../mapping/MapInteractions"
import { ACTIONS } from './NewJob.types'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Rover from "./classes/Rover"
import GpsPoint from "./classes/GpsPoint"
import AllProperties from "./classes/AllProperties"

const initialState = {
  mapData: {
    center: {
      lat: -28.003805072352318,
      lng: 153.29708040847075
    },
    polygons: {
      primaryPerimeter: [],
      testLines: []
    }
  }
};

export default function CreateJob() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: ACTIONS.ADD_ROVER,
      payload: new Rover(0.9)
    })
  }, [])


  const setPolygonPoints = (polygon: any) => {
    let vertices = getPolygonVertices(polygon)
    let all = new AllProperties(vertices, state.rover)
    dispatch({
      type: ACTIONS.ALL_DATA,
      payload: all
    })
  }

  const testClick = () => {
    console.log("ALL STATE", state)
  }

  const testAbstractPolygon = () => {
    const vertices = [
      new GpsPoint(-28.003567136124772, 153.29689466549644),
      new GpsPoint(-28.003658310692483, 153.29680749370345),
      new GpsPoint(-28.004045505724317, 153.29703682257423),
      new GpsPoint(-28.00400998330231, 153.29711460663566),
      new GpsPoint(-28.00372698758863, 153.29725542260894),
      new GpsPoint(-28.003581345153385, 153.29711460663566)
    ]
    dispatch({
      type: ACTIONS.ALL_DATA,
      payload: new AllProperties(vertices, state.rover)
    })
  }


  const testPolygon = () => {
    const vertices = [
      new GpsPoint(-28.0036914650616, 153.29706431521663),
      new GpsPoint(-28.003775535023294, 153.29721586002597),
      new GpsPoint(-28.00399340616803, 153.29706967963466),
      new GpsPoint(-28.003908152294294, 153.2969167937208)
    ]
    dispatch({
      type: ACTIONS.ALL_DATA,
      payload: new AllProperties(vertices, state.rover)
    })
  }

  const testPolygon2 = () => {
    const vertices = [
      new GpsPoint(-28.003614499546206, 153.2969690967966),
      new GpsPoint(-28.003616867716726, 153.29705090417156),
      new GpsPoint(-28.00399222208691, 153.29734192384967),
      new GpsPoint(-28.003973276787264, 153.2967330624033)
    ]
    dispatch({
      type: ACTIONS.ALL_DATA,
      payload: new AllProperties(vertices, state.rover)
    })
  }


  return (
    <Container>
      <Row>
        <Col>
          <Button style={{ margin: 10, width: 250, height: 50 }} onClick={() => testClick()}>Print State</Button>
          <Button style={{ margin: 10, width: 250, height: 50 }} onClick={() => testAbstractPolygon()}>Test Abstract</Button>
          <Button style={{ margin: 10, width: 250, height: 50 }} onClick={() => testPolygon()}>Test Polygon 1</Button>
          <Button style={{ margin: 10, width: 250, height: 50 }} onClick={() => testPolygon2()}>Test Polygon 2</Button>
        </Col>
        <Col>
          <InteractiveMap
            getPolygon={setPolygonPoints}
            mapProps={state.mapData}
            allProperties={state.allProperties}
          />
        </Col>
      </Row>
    </Container>
  )
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTIONS.ALL_DATA: {
      return {
        ...state,
        allProperties: action.payload
      }
    }
    case ACTIONS.ADD_ROVER: {
      return {
        ...state, rover: action.payload
      }
    }
    default:
      throw new Error("Unkown Action Type")
  }
}

