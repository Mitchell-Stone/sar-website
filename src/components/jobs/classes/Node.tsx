import GpsPoint from "./GpsPoint"
import { v4 as uuidv4 } from 'uuid';

export default class Node {
    lat: number;
    lng: number;
    id: string;
    public get gpsPoint() {
        return new GpsPoint(this.lat, this.lng)
    }

    constructor(lat: number, lng: number) {
        this.lat = lat
        this.lng = lng
        this.id = uuidv4()
    }
}
