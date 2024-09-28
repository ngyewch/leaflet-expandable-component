import {Control, Map, TileLayer} from 'leaflet';
import {TestControl} from './testControl.js';

import 'leaflet/dist/leaflet.css';
import 'leaflet-expandable-control/dist/leaflet-expandable-control.css';

const mapElement = document.getElementById('map') as HTMLElement;
const map = new Map(mapElement, {
    center: [
        1.3521,
        103.8198,
    ],
    zoom: 3,
});

const layersControl = new Control.Layers();
layersControl.addTo(map);

const osmTileLayer = new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
});
osmTileLayer.addTo(map);
layersControl.addBaseLayer(osmTileLayer, 'OpenStreetMaps');

const testControl1 = new TestControl();
testControl1.addTo(map);

const testControl2 = new TestControl();
testControl2.addTo(map);
