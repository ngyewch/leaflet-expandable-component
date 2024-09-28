import {DomUtil} from 'leaflet';
import {ExpandableControl} from 'leaflet-expandable-control';

export class TestControl extends ExpandableControl {
    constructor() {
        super('leaflet-control-test-toggle', 'leaflet-control-test-content');
    }

    protected override createControl(container: HTMLElement): void {
        const div = DomUtil.create("div", undefined, container);
        div.innerHTML = 'Hello, world!';
    }
}
