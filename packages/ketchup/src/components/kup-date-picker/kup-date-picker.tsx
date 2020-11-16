import {
    Component,
    Event,
    EventEmitter,
    Prop,
    Element,
    Host,
    State,
    h,
    Listen,
    Method,
} from '@stencil/core';

import { logLoad, logRender } from '../../utils/debug-manager';
import { positionRecalc } from '../../utils/recalc-position';
import { setThemeCustomStyle, setCustomStyle } from '../../utils/theme-manager';
import 'app-datepicker/dist/app-datepicker-dialog';

@Component({
    tag: 'kup-date-picker',
    styleUrl: 'kup-date-picker.scss',
    shadow: true,
})
export class KupDatePicker {
    @Element() rootElement: HTMLElement;
    @State() customStyleTheme: string = undefined;

    /**
     * Props of the text field.
     */
    @Prop() textfieldData: Object = {};

    private textfieldEl: any = undefined;
    private datePickerContainerEl: any = undefined;
    private datePickerEl: any = undefined;
    private value: string = undefined;
    private elStyle: any = undefined;
    private datePickerOpened = false;

    /**
     * Events.
     */
    @Event({
        eventName: 'kupDatePickerBlur',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupBlur: EventEmitter<{
        value: any;
    }>;

    @Event({
        eventName: 'kupDatePickerChange',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupChange: EventEmitter<{
        value: any;
    }>;

    @Event({
        eventName: 'kupDatePickerClick',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupClick: EventEmitter<{
        value: any;
    }>;

    @Event({
        eventName: 'kupDatePickerFocus',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupFocus: EventEmitter<{
        value: any;
    }>;

    @Event({
        eventName: 'kupDatePickerInput',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupInput: EventEmitter<{
        value: any;
    }>;

    @Event({
        eventName: 'kupDatePickerIconClick',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupIconClick: EventEmitter<{
        value: any;
    }>;

    @Event({
        eventName: 'kupDatePickerItemClick',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupItemClick: EventEmitter<{
        value: any;
    }>;

    @Listen('keyup', { target: 'document' })
    listenKeyup(e: KeyboardEvent) {
        if (this.isDatePickerOpened()) {
            if (e.key === 'Escape') {
                this.closeDatePicker();
            }
            if (e.key === 'Enter') {
                this.setDatePickerValueSelected();
            }
        }
    }

    @Listen('datepicker-value-updated', { target: 'document' })
    onKupItemClick(e: CustomEvent) {
        this.setDatePickerValueSelected(e.detail.value);

        this.kupChange.emit({
            value: this.value,
        });

        this.kupItemClick.emit({
            value: this.value,
        });
    }

    //---- Methods ----

    @Method()
    async refreshCustomStyle(customStyleTheme: string) {
        this.customStyleTheme = customStyleTheme;
    }

    onKupBlur(e: UIEvent & { target: HTMLInputElement }) {
        this.closeDatePicker();
        const { target } = e;
        this.kupBlur.emit({
            value: target.value,
        });
    }

    onKupChange(e: CustomEvent) {
        this.value = e.detail.value;
        this.kupChange.emit({
            value: this.value,
        });
    }

    onKupClick(e: UIEvent & { target: HTMLInputElement }) {
        const { target } = e;
        this.kupClick.emit({
            value: target.value,
        });
    }

    onKupFocus(e: UIEvent & { target: HTMLInputElement }) {
        const { target } = e;
        this.kupFocus.emit({
            value: target.value,
        });
    }

    onKupInput(e: CustomEvent) {
        this.value = e.detail.value;
        this.refreshDatePickerValue();
        this.kupInput.emit({
            value: this.value,
        });
    }

    onKupIconClick(event: UIEvent & { target: HTMLInputElement }) {
        const { target } = event;

        if (this.isDatePickerOpened()) {
            this.closeDatePicker();
        } else {
            this.openDatePicker();
        }
        this.kupIconClick.emit({
            value: target.value,
        });
    }

    refreshDatePickerValue() {
        this.datePickerEl.value = this.value;
    }

    setDatePickerValueSelected(newValue?: string) {
        if (!this.isDatePickerOpened()) {
            return;
        }
        if (newValue == null) {
            newValue = this.datePickerEl.value;
        }
        this.value = newValue;
        this.textfieldEl.initialValue = this.value;
        this.closeDatePicker();
    }

    openDatePicker(): boolean {
        this.refreshDatePickerValue();
        let textFieldWidth = this.textfieldEl.shadowRoot.querySelector(
            '.mdc-text-field'
        ).clientWidth;
        this.textfieldEl.classList.add('toggled');
        this.textfieldEl.emitSubmitEventOnEnter = false;
        this.datePickerOpened = true;
        this.datePickerContainerEl.classList.add('dynamic-position-active');
        this.datePickerContainerEl.classList.add('visible');
        let elStyle: any = this.datePickerContainerEl.style;
        elStyle.height = 'auto';
        elStyle.minWidth = textFieldWidth + 'px';
        return true;
    }

    closeDatePicker() {
        this.textfieldEl.classList.remove('toggled');
        this.textfieldEl.emitSubmitEventOnEnter = true;
        this.datePickerOpened = false;
        this.datePickerContainerEl.classList.remove('dynamic-position-active');
        this.datePickerContainerEl.classList.remove('visible');
    }

    isDatePickerOpened(): boolean {
        return this.datePickerOpened;
    }

    prepTextfield() {
        if (this.textfieldData['fullWidth']) {
            this.elStyle = {
                ...this.elStyle,
                width: '100%',
            };
        }

        if (this.textfieldData['fullHeight']) {
            this.elStyle = {
                ...this.elStyle,
                height: '100%',
            };
        }

        if (!this.textfieldData['icon']) {
            this.textfieldData['icon'] = 'date_range';
        }

        if (this.textfieldData['icon']) {
            this.textfieldData['trailingIcon'] = true;
        }

        let comp: HTMLElement = (
            <kup-text-field
                {...this.textfieldData}
                style={this.elStyle}
                initial-value={this.value}
                id={this.rootElement.id + '_text-field'}
                /* onKupTextFieldBlur={(e: any) => this.onKupBlur(e)} */
                onKupTextFieldChange={(e: any) => this.onKupChange(e)}
                onKupTextFieldClick={(e: any) => this.onKupClick(e)}
                onKupTextFieldFocus={(e: any) => this.onKupFocus(e)}
                onKupTextFieldInput={(e: any) => this.onKupInput(e)}
                onKupTextFieldIconClick={(e: any) => this.onKupIconClick(e)}
                ref={(el) => (this.textfieldEl = el as any)}
            ></kup-text-field>
        );

        return comp;
    }

    prepDatePicker() {
        let comp: any = (
            <div
                id="app-date-picker-div"
                ref={(el) => (this.datePickerContainerEl = el as any)}
            >
                <app-datepicker
                    firstdayofweek="1"
                    startview="calendar"
                    value=""
                    locale="it"
                    dragratio="0.15"
                    inline="true"
                    ref={(el) => (this.datePickerEl = el as any)}
                ></app-datepicker>
            </div>
        );
        return comp;
    }

    //---- Lifecycle hooks ----
    componentWillLoad() {
        logLoad(this, false);
        setThemeCustomStyle(this);
    }

    componentDidLoad() {
        logLoad(this, true);
    }

    componentWillRender() {
        logRender(this, false);
    }

    componentDidRender() {
        positionRecalc(this.datePickerContainerEl, this.textfieldEl);
        logRender(this, true);
    }

    render() {
        let textfieldEl = this.prepTextfield();
        let datePickerContainerEl = this.prepDatePicker();

        return (
            <Host onBlur={(e: any) => this.onKupBlur(e)} style={this.elStyle}>
                <style>{setCustomStyle(this)}</style>
                <div id="kup-component" style={this.elStyle}>
                    {textfieldEl}
                    {datePickerContainerEl}
                </div>
            </Host>
        );
    }
}
