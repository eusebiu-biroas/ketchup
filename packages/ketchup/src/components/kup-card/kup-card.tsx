import {
    Component,
    Prop,
    Element,
    Host,
    Event,
    EventEmitter,
    State,
    h,
} from '@stencil/core';
import * as collapsibleLayouts from './collapsible/kup-card-collapsible';
import * as customLayouts from './custom/kup-card-custom';
import * as dashboardLayouts from './dashboard/kup-card-dashboard';
import * as materialLayouts from './material/kup-card-material';
import { MDCRipple } from '@material/ripple';
import { ComponentCardElement } from './kup-card-declarations';
import { errorLogging } from '../../utils/error-logging';
import { fetchThemeCustomStyle, setCustomStyle } from '../../utils/theming';

@Component({
    tag: 'kup-card',
    styleUrl: 'kup-card.scss',
    shadow: true,
})
export class KupCard {
    @Element() rootElement: HTMLElement;
    @State() refresh: boolean = false;

    /**
     * Custom style to be passed to the component.
     */
    @Prop({ reflect: true }) customStyle: string = undefined;
    /**
     * The actual data of the card.
     */
    @Prop() data: ComponentCardElement = undefined;
    /**
     * Defines whether the card is a menu or not.
     */
    @Prop({ reflect: true }) isMenu: boolean = false;
    /**
     * Sets the type of the card. Currently supported values: "collapsible", "custom", "dashboard", "material".
     */
    @Prop({ reflect: true }) layoutFamily: string = 'material';
    /**
     * Sets the number of the layout.
     */
    @Prop({ reflect: true }) layoutNumber: number = 1;
    /**
     * Sets the status of the menu, when false it's hidden otherwise it's visible.
     */
    @Prop({ reflect: true }) menuVisible: boolean = false;
    /**
     * The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).
     */
    @Prop({ reflect: true }) sizeX: string = '100%';
    /**
     * The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).
     */
    @Prop({ reflect: true }) sizeY: string = '100%';

    private elStyle = undefined;
    private oldSizeY = undefined;

    @Event({
        eventName: 'kupCardClick',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupClick: EventEmitter<{
        id: any;
    }>;

    @Event({
        eventName: 'kupCardEvent',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupEvent: EventEmitter<{
        id: any;
        value: any;
        event: any;
    }>;

    //---- Methods ----

    onKupClick() {
        this.kupClick.emit({
            id: this.rootElement.id,
        });
    }

    onKupEvent(e) {
        const root = this.rootElement.shadowRoot;

        if (e.type === 'kupImageLoad') {
            let rippleEl: any = root.querySelector('.mdc-ripple-surface');
            if (rippleEl) {
                MDCRipple.attachTo(rippleEl);
            }
        }

        if (e.type === 'kupButtonClick' && e.detail.id === 'expand-action') {
            let collapsibleCard = root.querySelector('.collapsible-card');
            if (!collapsibleCard.classList.contains('expanded')) {
                collapsibleCard.classList.add('expanded');
                this.oldSizeY = this.sizeY;
                this.sizeY = 'auto';
            } else if (this.oldSizeY) {
                collapsibleCard.classList.remove('expanded');
                this.sizeY = this.oldSizeY;
            }
        }

        this.kupEvent.emit({
            id: this.rootElement.id,
            value: e.detail,
            event: e,
        });
    }

    getLayout() {
        let card: HTMLElement = undefined;
        let method: string = 'create' + this.layoutNumber;

        try {
            switch (this.layoutFamily) {
                case 'collapsible': {
                    card = collapsibleLayouts[method](this);
                    break;
                }
                case 'custom': {
                    card = customLayouts[method](this);
                    break;
                }
                case 'dashboard': {
                    card = dashboardLayouts[method](this);
                    break;
                }
                case 'material': {
                    card = materialLayouts[method](this);
                    break;
                }
                default: {
                    card = materialLayouts[method](this);
                    break;
                }
            }
        } catch (error) {
            card = (
                <kup-image
                    resource="warning"
                    title="Layout not yet implemented!"
                ></kup-image>
            );
        }

        return card;
    }

    collapsibleManager() {
        const root = this.rootElement.shadowRoot;
        let collapsibleEl = root.querySelector('.collapsible-element');
        let collapsibleCard = root.querySelector('.collapsible-card');
        let collapsibleWrap = root.querySelector('.collapsible-wrapper');
        if (!collapsibleCard.classList.contains('expanded')) {
            if (collapsibleEl.clientHeight > collapsibleWrap.clientHeight) {
                if (!collapsibleCard.classList.contains('collapsible-active')) {
                    collapsibleCard.classList.add('collapsible-active');
                }
            } else {
                if (collapsibleCard.classList.contains('collapsible-active')) {
                    collapsibleCard.classList.remove('collapsible-active');
                }
            }
        }
    }

    dashboardManager() {
        const root: ShadowRoot = this.rootElement.shadowRoot;
        let dashboardEl: HTMLElement = root.querySelector('.dashboard-element');
        let dashboardCard: HTMLElement = root.querySelector('.dashboard-card');
        let multiplier: number = parseFloat(
            dashboardCard.style.getPropertyValue('--multiplier')
        );
        let cardHeight40: number = (40 / 100) * dashboardCard.clientHeight;
        let cardWidth45: number = (45 / 100) * dashboardCard.clientWidth;
        let cardWidth55: number = (55 / 100) * dashboardCard.clientWidth;
        let tooManyAttempts: number = 0;
        do {
            tooManyAttempts++;
            if (
                dashboardEl.clientWidth < cardWidth45 &&
                dashboardEl.clientHeight < cardHeight40
            ) {
                multiplier = multiplier + 0.05;
                dashboardCard.style.setProperty(
                    '--multiplier',
                    multiplier + ''
                );
            } else if (
                dashboardEl.clientWidth > cardWidth55 ||
                dashboardEl.clientHeight > cardHeight40
            ) {
                multiplier = multiplier - 0.05;
                dashboardCard.style.setProperty(
                    '--multiplier',
                    multiplier + ''
                );
            } else {
                tooManyAttempts = 100;
            }
        } while (
            ((dashboardEl.clientWidth < cardWidth45 ||
                dashboardEl.clientWidth > cardWidth55) &&
                dashboardEl.clientHeight < cardHeight40) ||
            tooManyAttempts < 100
        );
    }

    listenButtonEvents(root: ShadowRoot) {
        root.addEventListener('kupButtonBlur', (e) => {
            this.onKupEvent(e);
        });
        root.addEventListener('kupButtonClick', (e) => {
            this.onKupEvent(e);
        });
        root.addEventListener('kupButtonFocus', (e) => {
            this.onKupEvent(e);
        });
    }

    listenChipEvents(root: ShadowRoot) {
        root.addEventListener('kupChipBlur', (e) => {
            this.onKupEvent(e);
        });
        root.addEventListener('kupChipClick', (e) => {
            this.onKupEvent(e);
        });
        root.addEventListener('kupChipFocus', (e) => {
            this.onKupEvent(e);
        });
        root.addEventListener('kupChipIconClick', (e) => {
            this.onKupEvent(e);
        });
    }

    listenImageEvents(root: ShadowRoot) {
        root.addEventListener('kupImageClick', (e) => {
            this.onKupEvent(e);
        });
        root.addEventListener('kupImageLoad', (e) => {
            this.onKupEvent(e);
        });
    }

    //---- Lifecycle hooks ----

    componentWillLoad() {
        fetchThemeCustomStyle(this, false);

        const root = this.rootElement.shadowRoot;

        this.listenButtonEvents(root);
        this.listenChipEvents(root);
        this.listenImageEvents(root);
    }

    componentDidLoad() {
        if (this.layoutFamily === 'collapsible') {
            this.collapsibleManager();
            setInterval(() => {
                this.collapsibleManager();
            }, 1000);
        }
        if (this.layoutFamily === 'dashboard') {
            this.dashboardManager();
            setInterval(() => {
                this.dashboardManager();
            }, 1000);
        }
    }

    render() {
        if (
            !this.data ||
            !this.layoutNumber ||
            !this.layoutFamily ||
            this.layoutNumber < 1
        ) {
            let message = 'Data or layout information missing, not rendering!';
            errorLogging(this.rootElement.tagName, message);
            return;
        }
        let wrapperClass = undefined;

        this.elStyle = undefined;
        this.elStyle = {
            height: this.sizeY,
            minHeight: this.sizeY,
            width: this.sizeX,
            minWidth: this.sizeX,
        };

        if (this.isMenu) {
            wrapperClass = 'mdc-menu mdc-menu-surface';

            if (this.menuVisible) {
                wrapperClass += ' visible';
            }
        }

        let card = this.getLayout();

        return (
            <Host style={this.elStyle}>
                <style>{setCustomStyle(this)}</style>
                <div
                    id="kup-component"
                    class={wrapperClass}
                    onClick={() => this.onKupClick()}
                >
                    {card}
                </div>
            </Host>
        );
    }
}
