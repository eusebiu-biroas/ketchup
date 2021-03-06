import {
    Component,
    Prop,
    Element,
    Host,
    State,
    h,
    JSX,
    Method,
} from '@stencil/core';
import { GenericObject } from '../../types/GenericTypes';
import {
    KupManager,
    kupManagerInstance,
} from '../../utils/kup-manager/kup-manager';
import { KupGridProps } from './kup-grid-declarations';

@Component({
    tag: 'kup-grid',
    styleUrl: 'kup-grid.scss',
    shadow: true,
})
export class KupGrid {
    @Element() rootElement: HTMLElement;
    @State() customStyleTheme: string = undefined;

    /**
     * The number of columns displayed by the grid, the default behavior is 12.
     */
    @Prop() columns: number = 12;
    /**
     * Custom style of the component. For more information: https://ketchup.smeup.com/ketchup-showcase/#/customization
     */
    @Prop() customStyle: string = '';
    /**
     * When set to true, forces the content on a single line.
     */
    @Prop() singleLine: boolean = false;

    private elStyle = undefined;
    /**
     * Instance of the KupManager class.
     */
    private kupManager: KupManager = kupManagerInstance();

    //---- Methods ----

    @Method()
    async themeChangeCallback(customStyleTheme: string) {
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
            props = KupGridProps;
        } else {
            for (const key in KupGridProps) {
                if (Object.prototype.hasOwnProperty.call(KupGridProps, key)) {
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
        let slots = this.rootElement.children;
        if (!slots || slots.length === 0) {
            let message = 'Missing slots, not rendering!';
            this.kupManager.debug.logMessage(this, message, 'warning');
            return;
        }

        let componentClass = '';
        let contentClass = '';
        if (this.singleLine) {
            componentClass = 'flex-layout';
            contentClass = 'flex-layout__inner';
        } else {
            componentClass = 'mdc-layout-grid';
            contentClass = 'mdc-layout-grid__inner';
        }

        this.elStyle = undefined;
        if (this.columns !== 12) {
            contentClass += ' custom-grid';
            this.elStyle = {
                ['--columns-number']: this.columns,
            };
        }

        let el: JSX.Element[] = [];

        for (let i = 0; i < slots.length; i++) {
            let content = undefined;

            if (this.singleLine) {
                content = <slot name={`${i}`}></slot>;
            } else {
                let span: number = 1;
                let spanClass: string = 'mdc-layout-grid__cell';
                if (slots[i]['span']) {
                    span = slots[i]['span'];
                }
                spanClass += ' mdc-layout-grid__cell--span-' + span;
                content = (
                    <div class={spanClass}>
                        <slot name={`${i}`}></slot>
                    </div>
                );
            }
            el.push(content);
        }

        return (
            <Host style={this.elStyle}>
                <style>{this.kupManager.theme.setCustomStyle(this)}</style>
                <div id="kup-component">
                    <div class={componentClass}>
                        <div class={contentClass}>{el}</div>
                    </div>
                </div>
            </Host>
        );
    }

    componentDidUnload() {
        this.kupManager.theme.unregister(this);
    }
}
