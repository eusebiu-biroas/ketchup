import {
    Component,
    Element,
    Event,
    EventEmitter,
    // Method,
    Prop,
    //State,
    //Watch,
    h
} from '@stencil/core';
import {
    KupTooltipClickedPartEvent,
    KupTooltipLayouts,
    KupTooltipAllowedComponents,
} from './kup-tooltip-declarations';
import {
    ElementAlignment,
    getElementAlignment,
    getElementOffset
} from "../../utils/offset";

@Component({
    tag: 'kup-tooltip',
    styleUrl: 'kup-tooltip.scss',
    shadow: true,
})
export class KupTooltip {
    /**
     * The data to pass to the rendered component.
     */
    @Prop() componentData?: any = null;
    /**
     * Specifies the rendered component type.
     * @see KupTooltipAllowedComponents
     */
    @Prop() componentType: string = KupTooltipAllowedComponents.None;
    /**
     * Displays or hides the tooltip. It can be set programmatically.
     *
     * The component can mutate this prop.
     */
    @Prop({ reflect: true, mutable: true }) isActive: boolean = false;
    /**
     * Sets the Layout.
     * Possible Values: 1,2,3,4
     * @see KupTooltipLayouts
     */
    @Prop() layout: number = KupTooltipLayouts.Image;
    /**
     * The HTML reference to the element which opens the tooltip.
     * This prop is mandatory.
     */
    @Prop() tooltipController: HTMLElement = null;

    //-- Validating props --

    //---- Internal state ----


    //-- Not reactive state --
    @Element() tooltipEl: HTMLElement;
    portalRef?: HTMLKupPortalElement = null;
    // Determines the position on which the menu will be open
    tooltipPosition: ElementAlignment = {
        isRight: false,
        isTop: false
    };

    //-- Constants --

    //---- Lifecycle Hooks  ----

    //---- Public Methods ----

    //---- Events and handlers ----

    //-- Emitted --

    /**
     * When the input text value gets updated
     */
    @Event({
        eventName: 'kupTooltipClicked',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    ketchupTextInputUpdated: EventEmitter<KupTooltipClickedPartEvent>;

    onInputUpdated(event: UIEvent & { target: HTMLInputElement }) {
        // const { target } = event;
        console.log("KupTooltipClickedPartEvent",event);
        this.ketchupTextInputUpdated.emit({
            part: 'TODO'
        });
    }

    //---- Rendering functions ----
    // @see https://stackoverflow.com/questions/54004635/how-to-list-all-css-variables-names-values-pairs-from-element

    composeActionBar() {}

    composeTooltip() {
        return <div></div>;
    }

    render() {
        this.tooltipPosition = getElementAlignment(this.tooltipController);

        return <kup-portal
          isVisible={this.isActive}
          mirroredCssVars={['--cmb_menu-background', '--cmb_tr-duration']}
          nodes={this.composeTooltip()}
          portalParentRef={this.tooltipController}
          ref={el => this.portalRef = el as HTMLKupPortalElement}
          // Notice that the portal offset MUST be calculated considering the menu button, not the whole web component
          refOffset={getElementOffset(this.tooltipController, this.tooltipPosition)}
          styleNode={this.tooltipEl.shadowRoot.querySelector('style')}
        />;
    }
}
