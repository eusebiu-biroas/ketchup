import {
    Component,
    Element,
    Event,
    EventEmitter,
    Method,
    Prop,
    State,
} from '@stencil/core'
import { ComboItem } from './ketchup-combo-declarations';
import { eventFromElement } from "../../utils/utils";

/**
 * TODO: Control if there can be issues with z-index and elements not correctly triggering the functions to close the combo box list
 * See this article here to use the method to get the current position and avoid opening the menu in the wrong direction
 * https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
 **/

@Component({
    tag: 'ketchup-combo',
    styleUrl: 'ketchup-combo.scss',
    shadow: true
})
export class KetchupCombo {
    /***
     * Chooses which field of an item object should be used to create the list and be filtered.
     */
    @Prop() displayedField: string = 'id';
    /**
     * Allows to pass an initial selected item for the combobox
     */
    @Prop() initialValue: string = '';
    /**
     * Marks the field as clearable, allowing an icon to delete its content
     */
    @Prop() isClearable: boolean = false;
    /**
     * Items which can be selected
     * */
    @Prop() items: ComboItem[] = [];
    /**
     * Label to describe the radio group
     */
    @Prop() label: string = '';

    //-- Validating props --


    //---- Internal state ----
    @State() value: string = '';
    @State() filter: string = '';
    @State() isOpen: boolean = false;

    //-- Not reactive state --
    @Element() comboEl: HTMLElement;
    selected: ComboItem;
    /**
     * Creates a variable with an instance of the handler for the click event and binds this instance of the combo box to it.
     * This is used to add and more importantly remove events listeners attached to the body.
     * Sets listener on document to check if a click originated elsewhere
     * In that case closes the combo
     */
    clickFunction = this.onDocumentClick.bind(this);

    //-- Constants --
    baseClass = 'ketchup-combo';

    //---- Lifecycle Hooks  ----
    componentWillLoad() {
        // Sets initial value inside the element
        this.value = this.initialValue;
    }

    componentDidLoad() {
        // When component is created, then the listener is set. @See clickFunction for more details
        document.addEventListener('click', this.clickFunction);
    }

    componentDidUnload() {
        // When component is destroyed, then the listener is removed. @See clickFunction for more details
        document.removeEventListener('click', this.clickFunction);
    }

    //---- Public Methods ----
    /**
     * Opens the combo box
     * @method closeCombo
     */
    @Method()
    closeCombo() {
        this.isOpen = false;
    }

    /**
     * Opens the combo box
     * @method openCombo
     */
    @Method()
    openCombo() {
        this.isOpen = true;
    }

    //---- Private methods ----


    //---- Events and handlers ----
    /**
     * Clear the current content inside the the text input
     * @method onClearClick
     */
    onClearClick() {
        this.value = '';
        this.selected = null;
        this.onComboSelected(null);
    }

    /**
     * Opens the combo box when clicked
     * @method onComboClick
     */
    onComboClick() {
        this.openCombo();
    }

    /**
     * Function to trigger when document is clicked
     */
    onDocumentClick(event: UIEvent) {
        let ele = event.target as HTMLElement;
        if (!eventFromElement(this.comboEl, ele)) {
            this.closeCombo();
        }
    }

    /**
     * Function which gets triggered when filter changes
     * @param event
     */
    onFilterUpdate(event: CustomEvent) {
        this.filter = event.detail.newValue.toLowerCase();
    }

    /**
     * When an item gets selected
     * @param item
     */
    onItemSelected(item: ComboItem) {
        if (item[this.displayedField] !== this.value) {
            this.onComboSelected(item);
            this.selected = item;
            this.value = item[this.displayedField];
        }
        this.closeCombo();
    }

    //-- Emitted --
    // When an element has been selected
    @Event({
        eventName: 'ketchupComboSelected',
        composed: true,
        cancelable: false,
        bubbles: true
    })
    ketchupComboSelected: EventEmitter;

    onComboSelected(item: ComboItem | null) {
        this.ketchupComboSelected.emit({
            newValue: item,
        });
    }

    //---- Rendering functions ----
    render() {
        const containerClass = this.baseClass + '__container';

        return ([
            <div class={containerClass + (this.isClearable ? ' ' + containerClass + '--clearable' : '')}>
                <span
                    class={this.baseClass + '__current-value'}
                    onClick={this.onComboClick.bind(this)}
                >
                    {this.value}
                    <svg
                        class={this.baseClass + '__chevron' + (this.isOpen ? ' ' + this.baseClass + '__chevron--open' : '')}
                        viewBox="0 0 24 24">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                </span>
                {this.isClearable ?
                    <button
                        aria-label="Close"
                        class={this.baseClass + '__clear'}
                        role="button"
                        onClick={this.onClearClick.bind(this)}>
                        <svg viewBox="0 0 24 24">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>:
                    null
                }
            </div>,

            <div class={this.baseClass + '__menu' + (this.isOpen ? ' is-open' : '')}>
                <div>
                    <ketchup-text-input onKetchupTextInputUpdated={this.onFilterUpdate.bind(this)}/>
                </div>
                <ul class={this.baseClass + '__list'}>
                    {this.items.filter(item => !this.filter || item[this.displayedField].toLowerCase().indexOf(this.filter) >= 0)
                        .map(item =>
                            <li onClick={() => this.onItemSelected(item) }>
                                <span>{item[this.displayedField]}</span>
                            </li>
                        )
                    }
                </ul>
            </div>
        ]);
    }
}