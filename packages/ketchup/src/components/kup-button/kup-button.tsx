import {
    Component,
    Event,
    EventEmitter,
    Prop,
    Element,
    Host,
    State,
    h,
    Method,
} from '@stencil/core';
import type { GenericObject } from '../../types/GenericTypes';
import {
    KupManager,
    kupManagerInstance,
} from '../../utils/kup-manager/kup-manager';
import { FButton } from '../../f-components/f-button/f-button';
import { FButtonMDC } from '../../f-components/f-button/f-button-mdc';
import {
    FButtonProps,
    FButtonStyling,
} from '../../f-components/f-button/f-button-declarations';
import { KupButtonProps } from './kup-button-declarations';

@Component({
    tag: 'kup-button',
    styleUrl: 'kup-button.scss',
    shadow: true,
})
export class KupButton {
    /**
     * References the root HTML element of the component (<kup-button>).
     */
    @Element() rootElement: HTMLElement;

    /*-------------------------------------------------*/
    /*                   S t a t e s                   */
    /*-------------------------------------------------*/

    /**
     * The value of the component.
     * @default ""
     */
    @State() value: string = '';
    /**
     * The component-specific CSS set by the current Ketch.UP theme.
     * @default ""
     */
    @State() customStyleTheme: string = '';

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * When set to true, the icon button state will be on.
     * @default false
     */
    @Prop() checked: boolean = false;
    /**
     * Custom style of the component.
     * @default ""
     * @see https://ketchup.smeup.com/ketchup-showcase/#/customization
     */
    @Prop() customStyle: string = '';
    /**
     * Defaults at false. When set to true, the component is disabled.
     * @default false
     */
    @Prop() disabled: boolean = false;
    /**
     * When set, the button will show this icon.
     * @default null
     */
    @Prop() icon: string = null;
    /**
     * When set, the icon button off state will show this icon. Otherwise, an outlined version of the icon prop will be displayed.
     * @default null
     */
    @Prop() iconOff: string = null;
    /**
     * When set, the button will show this text.
     * @default null
     */
    @Prop() label: string = null;
    /**
     * Defines the style of the button. Styles available: "flat", "outlined" and "raised" which is also the default.
     * @default FButtonStyling.RAISED
     */
    @Prop() styling: FButtonStyling = FButtonStyling.RAISED;
    /**
     * When set to true, the icon button will be toggable on/off.
     * @default false
     */
    @Prop() toggable: boolean = false;
    /**
     * When set, the icon will be shown after the text.
     * @default false
     */
    @Prop() trailingIcon: boolean = false;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    /**
     * Instance of the KupManager class.
     */
    private kupManager: KupManager = kupManagerInstance();

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    @Event({
        eventName: 'kupButtonBlur',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupBlur: EventEmitter<{
        id: string;
        value: string;
    }>;

    @Event({
        eventName: 'kupButtonClick',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupClick: EventEmitter<{
        id: string;
        value: string;
    }>;

    @Event({
        eventName: 'kupButtonFocus',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupFocus: EventEmitter<{
        id: string;
        value: string;
    }>;

    onKupBlur() {
        this.kupBlur.emit({
            id: this.rootElement.id,
            value: this.value,
        });
    }

    onKupClick() {
        if (!this.label && this.icon) {
            if (this.checked) {
                this.checked = false;
                this.value = 'off';
            } else {
                this.checked = true;
                this.value = 'on';
            }
        } else {
            this.value = 'N/A';
        }
        this.kupClick.emit({
            id: this.rootElement.id,
            value: this.value,
        });
    }

    onKupFocus() {
        this.kupFocus.emit({
            id: this.rootElement.id,
            value: this.value,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * This method is invoked by the theme manager.
     * Whenever the current Ketch.UP theme changes, every component must be re-rendered with the new component-specific customStyle.
     * @param customStyleTheme - Contains current theme's component-specific CSS.
     * @see https://ketchup.smeup.com/ketchup-showcase/#/customization
     * @see https://ketchup.smeup.com/ketchup-showcase/#/theming
     */
    @Method()
    async themeChangeCallback(customStyleTheme: string): Promise<void> {
        this.customStyleTheme = customStyleTheme;
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        let props: GenericObject = {};
        if (descriptions) {
            props = KupButtonProps;
        } else {
            for (const key in KupButtonProps) {
                if (Object.prototype.hasOwnProperty.call(KupButtonProps, key)) {
                    props[key] = this[key];
                }
            }
        }
        return props;
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    /**
     * Set the events of the component and instantiates Material Design.
     */
    private setEvents(): void {
        const root: ShadowRoot = this.rootElement.shadowRoot;
        if (root) {
            const f: HTMLElement = root.querySelector('.f-button--wrapper');
            if (f) {
                const buttonEl: HTMLButtonElement = f.querySelector('button');
                if (buttonEl) {
                    buttonEl.onblur = () => this.onKupBlur();
                    buttonEl.onclick = () => this.onKupClick();
                    buttonEl.onfocus = () => this.onKupFocus();
                }
                FButtonMDC(f);
            }
        }
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.kupManager.debug.logLoad(this, false);
        this.kupManager.theme.register(this);
    }

    componentDidLoad() {
        this.kupManager.debug.logLoad(this, true);
    }

    componentWillRender() {
        this.kupManager.debug.logRender(this, false);
        if (!this.label && this.icon) {
            if (this.checked) {
                this.value = 'on';
            } else {
                this.value = 'off';
            }
        } else {
            this.value = 'N/A';
        }
    }

    componentDidRender() {
        this.setEvents();
        this.kupManager.debug.logRender(this, true);
    }

    render() {
        let props: FButtonProps = {
            checked: this.checked,
            disabled: this.disabled,
            fullHeight: this.rootElement.classList.contains('kup-full-height')
                ? true
                : false,
            fullWidth: this.rootElement.classList.contains('kup-full-width')
                ? true
                : false,
            icon: this.icon,
            iconOff: this.iconOff,
            label: this.label,
            large: this.rootElement.classList.contains('kup-large')
                ? true
                : false,
            shaped: this.rootElement.classList.contains('kup-shaped')
                ? true
                : false,
            styling: this.styling,
            toggable: this.toggable,
            trailingIcon: this.trailingIcon,
        };

        if (!this.label && !this.icon) {
            let message = 'Empty button.';
            this.kupManager.debug.logMessage(this, message, 'warning');
            return;
        }

        return (
            <Host>
                <style>{this.kupManager.theme.setCustomStyle(this)}</style>
                <div id="kup-component">
                    <FButton {...props} />
                </div>
            </Host>
        );
    }

    componentDidUnload() {
        this.kupManager.theme.unregister(this);
    }
}
