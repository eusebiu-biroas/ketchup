import {
    Component,
    h,
    Prop,
    Method,
    Host,
    Element,
    State,
    Event,
    EventEmitter,
    Watch,
} from '@stencil/core';
import { GenericObject } from '../../types/GenericTypes';
import {
    KupManager,
    kupManagerInstance,
} from '../../utils/kup-manager/kup-manager';
import { KupDrawerProps } from './kup-drawer-declarations';

@Component({
    tag: 'kup-drawer',
    styleUrl: 'kup-drawer.scss',
    shadow: true,
})
export class KupDrawer {
    @Element() rootElement: HTMLElement;
    @State() customStyleTheme: string = undefined;

    /**
     * Custom style of the component. For more information: https://ketchup.smeup.com/ketchup-showcase/#/customization
     */
    @Prop() customStyle: string = '';
    /**
     * Defaults at false. When set to true, the drawer appears.
     */
    @Prop({ reflect: true, mutable: true }) opened: boolean = false;

    /**
     * Instance of the KupManager class.
     */
    private kupManager: KupManager = kupManagerInstance();

    //---- Watches ----

    @Watch('opened')
    onOpenedChange(newValue: boolean) {
        if (newValue) {
            this.kupDrawerOpen.emit();
        } else {
            this.kupDrawerClose.emit();
        }
    }

    //---- Events ----

    @Event() kupDrawerClose: EventEmitter;
    @Event() kupDrawerOpen: EventEmitter;

    //---- Methods ----

    @Method()
    async themeChangeCallback(customStyleTheme: string) {
        this.customStyleTheme = customStyleTheme;
    }

    @Method()
    async toggle() {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    @Method()
    async close() {
        this.opened = false;
    }

    @Method()
    async open() {
        this.opened = true;
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
            props = KupDrawerProps;
        } else {
            for (const key in KupDrawerProps) {
                if (Object.prototype.hasOwnProperty.call(KupDrawerProps, key)) {
                    props[key] = this[key];
                }
            }
        }
        return props;
    }

    //---- Lifecycle hooks ----

    componentWillLoad() {
        this.kupManager.debug.logLoad(this, false);
        this.kupManager.theme.register(this);
    }

    componentDidLoad() {
        this.kupManager.debug.logLoad(this, true);
    }

    componentWillRender() {
        this.kupManager.debug.logRender(this, false);
    }

    componentDidRender() {
        this.kupManager.debug.logRender(this, true);
    }

    render() {
        return (
            <Host>
                <style>{this.kupManager.theme.setCustomStyle(this)}</style>
                <div id="kup-component">
                    <div class="backdrop" onClick={() => this.close()} />
                    <aside>
                        <div class="header">
                            <div class="title">
                                <slot name="title" />
                            </div>
                            <div class="subtitle">
                                <slot name="subtitle" />
                            </div>
                        </div>
                        <main>
                            <slot name="main-content" />
                        </main>
                    </aside>
                </div>
            </Host>
        );
    }

    componentDidUnload() {
        this.kupManager.theme.unregister(this);
    }
}
