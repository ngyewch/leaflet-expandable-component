import {Control, type ControlOptions, DomEvent, DomUtil, Map as LeafletMap} from 'leaflet';

export abstract class ExpandableControl extends Control {
    private _toggleClass: string;
    private _contentClass: string;
    private _container: HTMLElement | undefined;

    constructor(toggleClass: string, contentClass: string, options?: ControlOptions) {
        super(options);

        this._toggleClass = toggleClass;
        this._contentClass = contentClass;
    }

    protected abstract createControl(container: HTMLElement): void;

    public override onAdd(map: LeafletMap): HTMLElement {
        const container = DomUtil.create('div', 'leaflet-control-expandable');
        this._container = container;

        const toggle = DomUtil.create('a', 'leaflet-control-expandable-toggle ' + this._toggleClass, container);
        toggle.setAttribute('href', '#');
        toggle.setAttribute('role', 'button');

        const contentContainer = DomUtil.create('section', 'leaflet-control-expandable-content ' + this._contentClass, container);
        DomEvent.on(container, {
            mouseenter: () => {
                DomUtil.addClass(container, 'leaflet-control-expandable-expanded');
                contentContainer.style.height = 'fit-content';
                const acceptableHeight = map.getSize().y - (container.offsetTop + 50);
                if (acceptableHeight < contentContainer.clientHeight) {
                    DomUtil.addClass(contentContainer, 'leaflet-control-expandable-scrollbar');
                    contentContainer.style.height = acceptableHeight + 'px';
                } else {
                    DomUtil.removeClass(contentContainer, 'leaflet-control-expandable-scrollbar');
                }
            },
            mouseleave: () => {
                DomUtil.removeClass(container, 'leaflet-control-expandable-expanded');
            },
        });

        this.createControl(contentContainer);

        return container;
    }

    public override onRemove(_map: LeafletMap): void {
        if (this._container !== undefined) {
            DomEvent.off(this._container);
        }
    }
}
