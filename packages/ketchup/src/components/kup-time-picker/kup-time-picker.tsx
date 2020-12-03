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
    Watch,
} from '@stencil/core';

import { logLoad, logMessage, logRender } from '../../utils/debug-manager';
import { positionRecalc } from '../../utils/recalc-position';
import { setThemeCustomStyle, setCustomStyle } from '../../utils/theme-manager';
import { ComponentListElement } from '../kup-list/kup-list-declarations';

import {
    ISO_DEFAULT_TIME_FORMAT,
    isValidFormattedStringTime,
    formattedStringToDefaultUnformattedStringTime,
    unformattedStringToFormattedStringTime,
    unformatDateTime,
    formatTime,
} from '../../utils/utils';
import {
    PICKER_COMPONENT_INFO,
    PICKER_SOURCE_EVENT,
    PICKER_STATUS,
} from './kup-time-picker-declarations';

@Component({
    tag: 'kup-time-picker',
    styleUrl: 'kup-time-picker.scss',
    shadow: true,
})
export class KupTimePicker {
    @Element() rootElement: HTMLElement;
    @State() customStyleTheme: string = undefined;
    @State() timeValue: string = '';
    /**
     * Props of the time text field.
     */
    @Prop() timeTextfieldData: Object = {};
    /**
     * The initial value of the time picker.
     */
    @Prop() timeInitialValue: string = '';
    /**
     * Minutes step
     */
    @Prop() timeMinutesStep: number = 10;
    /**
     * Custom style of the component. For more information: https://ketchup.smeup.com/ketchup-showcase/#/customization
     */
    @Prop() customStyle: string = undefined;

    private status: PICKER_STATUS = {};

    //---- Events ----

    @Event({
        eventName: 'kupTimePickerBlur',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupBlur: EventEmitter<{
        value: any;
        source: PICKER_SOURCE_EVENT;
    }>;

    @Event({
        eventName: 'kupTimePickerChange',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupChange: EventEmitter<{
        value: any;
        source: PICKER_SOURCE_EVENT;
    }>;

    @Event({
        eventName: 'kupTimePickerClick',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupClick: EventEmitter<{
        value: any;
        source: PICKER_SOURCE_EVENT;
    }>;

    @Event({
        eventName: 'kupTimePickerFocus',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupFocus: EventEmitter<{
        value: any;
        source: PICKER_SOURCE_EVENT;
    }>;

    @Event({
        eventName: 'kupTimePickerInput',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupInput: EventEmitter<{
        value: any;
        source: PICKER_SOURCE_EVENT;
    }>;

    @Event({
        eventName: 'kupTimePickerIconClick',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupIconClick: EventEmitter<{
        value: any;
        source: PICKER_SOURCE_EVENT;
    }>;

    @Event({
        eventName: 'kupTimePickerItemClick',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupItemClick: EventEmitter<{
        value: any;
        source: PICKER_SOURCE_EVENT;
    }>;

    @Event({
        eventName: 'kupTimePickerTextFieldSubmit',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupTextFieldSubmit: EventEmitter<{
        value: any;
        source: PICKER_SOURCE_EVENT;
    }>;

    @Listen('keyup', { target: 'document' })
    listenKeyup(e: KeyboardEvent) {
        let source: PICKER_SOURCE_EVENT = this.getSourceEvent();
        if (this.isPickerOpened(source)) {
            if (e.key === 'Escape') {
                this.closePicker(source);
            }
            if (e.key === 'Enter') {
                e.stopPropagation();
                this.setPickerValueSelected(source);
            }
        }
    }

    onKupTimePickerItemClick(value: string) {
        let source = PICKER_SOURCE_EVENT.TIME;
        this.setPickerValueSelected(source, value);

        this.kupChange.emit({
            value: this.timeValue,
            source: source,
        });

        this.kupItemClick.emit({
            value: this.timeValue,
            source: source,
        });
    }

    @Watch('timeInitialValue')
    watchTimeInitialValue() {
        this.timeValue = this.timeInitialValue;
        this.setTextFieldInitalValue(
            PICKER_SOURCE_EVENT.TIME,
            this.getTimeForOutput()
        );
    }

    @Watch('timeMinutesStep')
    watchTimeMinutesStep() {
        if (this.timeMinutesStep <= 0) {
            logMessage(
                this,
                'property time-minutes-step=[' +
                    this.timeMinutesStep +
                    '] not allowed: it must be > 0 and divisor of 60',
                'warning'
            );
            this.timeMinutesStep = 10;
            return;
        }
        let result: number = 60 % this.timeMinutesStep;

        if (result != 0) {
            logMessage(
                this,
                'property time-minutes-step=[' +
                    this.timeMinutesStep +
                    '] not allowed: it must be > 0 and divisor of 60',
                'warning'
            );
            this.timeMinutesStep = 10;
            return;
        }
    }

    //---- Methods ----

    @Method()
    async refreshCustomStyle(customStyleTheme: string) {
        this.customStyleTheme = customStyleTheme;
    }

    onKupBlur(e: UIEvent, source: PICKER_SOURCE_EVENT) {
        e.stopPropagation();
        this.closePicker(source, true);
        this.kupBlur.emit({
            value: this.timeValue,
            source: source,
        });
    }

    onKupChange(e: CustomEvent, source: PICKER_SOURCE_EVENT) {
        this.refreshPickerValue(source, e.detail.value, this.kupChange);
    }

    onKupClick(e: UIEvent, source: PICKER_SOURCE_EVENT) {
        e.stopPropagation();
        this.kupClick.emit({
            value: this.timeValue,
            source: source,
        });
    }

    onKupFocus(e: UIEvent, source: PICKER_SOURCE_EVENT) {
        e.stopPropagation();
        this.kupFocus.emit({
            value: this.timeValue,
            source: source,
        });
    }

    onKupInput(e: CustomEvent, source: PICKER_SOURCE_EVENT) {
        this.refreshPickerValue(source, e.detail.value, this.kupInput);
    }

    onKupTextFieldSubmit(e: CustomEvent, source: PICKER_SOURCE_EVENT) {
        this.refreshPickerValue(
            source,
            e.detail.value,
            this.kupTextFieldSubmit
        );
    }

    onKupIconClick(e: UIEvent, source: PICKER_SOURCE_EVENT) {
        e.stopPropagation();
        if (this.isPickerOpened(source)) {
            this.closePicker(source);
        } else {
            this.openPicker(source);
        }
        this.kupIconClick.emit({
            value: this.timeValue,
            source: source,
        });
    }

    getSourceEvent(): PICKER_SOURCE_EVENT {
        return PICKER_SOURCE_EVENT.TIME;
    }

    refreshPickerValue(
        source: PICKER_SOURCE_EVENT,
        eventDetailValue: string,
        eventToRaise: EventEmitter
    ) {
        let newValue = null;
        if (source == PICKER_SOURCE_EVENT.TIME) {
            if (isValidFormattedStringTime(eventDetailValue)) {
                this.timeValue = formattedStringToDefaultUnformattedStringTime(
                    eventDetailValue
                );
                newValue = this.timeValue;
            }
        }

        if (newValue != null) {
            this.refreshPickerComponentValue(source, newValue);
            eventToRaise.emit({
                value: newValue,
                source: source,
            });
        }
    }

    refreshPickerComponentValue(source: PICKER_SOURCE_EVENT, value: string) {
        if (!this.isPickerOpened(source)) {
            return;
        }
        this.status[source].pickerEl.data = this.createTimeListData(value);
    }

    setPickerValueSelected(source: PICKER_SOURCE_EVENT, newValue?: string) {
        if (!this.isPickerOpened(source)) {
            return;
        }
        if (newValue == null) {
            newValue = this.getPickerValueSelected();
        }
        this.closePicker(source);
        if (newValue == null) {
            return;
        }
        if (source == PICKER_SOURCE_EVENT.TIME) {
            this.timeValue = newValue;
            this.setTextFieldInitalValue(source, this.getTimeForOutput());
        }
    }

    getPickerValueSelected(/*source: PICKER_SOURCE_EVENT*/): string {
        //return this.status[source].pickerEl.value;
        return this.timeValue;
    }

    setTextFieldInitalValue(source: PICKER_SOURCE_EVENT, value: string) {
        if (this.status[source].textfieldEl !== undefined) {
            this.status[source].textfieldEl.initialValue = value;
        }
    }

    getTextFieldInitalValue(source: PICKER_SOURCE_EVENT): string {
        if (this.status[source].textfieldEl !== undefined) {
            return this.status[source].textfieldEl.initialValue;
        }
        return null;
    }

    getValueForPickerComponent(source: PICKER_SOURCE_EVENT) {
        if (source == PICKER_SOURCE_EVENT.TIME) {
            return this.timeValue;
        }
        return null;
    }

    openPicker(source: PICKER_SOURCE_EVENT) {
        let textfieldEl = this.status[source].textfieldEl;
        let containerEl = this.status[source].pickerContainerEl;
        this.status[source].pickerOpened = true;
        this.refreshPickerComponentValue(
            source,
            this.getValueForPickerComponent(source)
        );

        let textFieldWidth = null;
        if (textfieldEl != null) {
            textFieldWidth = textfieldEl.shadowRoot.querySelector(
                '.mdc-text-field'
            ).clientWidth;
            textfieldEl.classList.add('toggled');
            textfieldEl.emitSubmitEventOnEnter = false;
            textfieldEl.forceFocus = true;
        }
        if (containerEl != null) {
            containerEl.classList.add('dynamic-position-active');
            containerEl.classList.add('visible');
            let elStyle: any = containerEl.style;
            elStyle.height = 'auto';
            if (textFieldWidth != null) {
                elStyle.minWidth = textFieldWidth + 'px';
            }
        }
    }

    closePicker(source: PICKER_SOURCE_EVENT, fromOnBlur?: boolean) {
        let textfieldEl = this.status[source].textfieldEl;
        let containerEl = this.status[source].pickerContainerEl;
        this.status[source].pickerOpened = false;
        if (textfieldEl != null) {
            textfieldEl.classList.remove('toggled');
            textfieldEl.emitSubmitEventOnEnter = true;
            if (fromOnBlur != true) {
                textfieldEl.forceFocus = true;
            }
        }
        if (containerEl != null) {
            containerEl.classList.remove('dynamic-position-active');
            containerEl.classList.remove('visible');
        }
    }

    isPickerOpened(source: PICKER_SOURCE_EVENT): boolean {
        return this.status[source].pickerOpened;
    }

    getTextFieldId(source: PICKER_SOURCE_EVENT): string {
        return this.status[source].textfieldEl.id;
    }

    prepTimeTextfield(): PICKER_COMPONENT_INFO {
        let source = PICKER_SOURCE_EVENT.TIME;
        let ret: PICKER_COMPONENT_INFO = this.prepTextfield(
            source,
            this.timeTextfieldData,
            this.status[source].elStyle,
            this.getTextFieldInitalValue(source)
        );
        return ret;
    }

    prepTextfield(
        source: PICKER_SOURCE_EVENT,
        textfieldData,
        elStyle,
        initialValue: string
    ): PICKER_COMPONENT_INFO {
        if (textfieldData['fullWidth']) {
            elStyle = {
                ...elStyle,
                width: '100%',
            };
        }

        if (textfieldData['fullHeight']) {
            elStyle = {
                ...elStyle,
                height: '100%',
            };
        }

        if (!textfieldData['icon']) {
            textfieldData['icon'] = 'access_time';
        }

        if (textfieldData['icon']) {
            textfieldData['trailingIcon'] = true;
        }

        let ref: PICKER_COMPONENT_INFO = { type: source };

        let comp: HTMLElement = (
            <kup-text-field
                {...textfieldData}
                style={elStyle}
                initial-value={initialValue}
                id={this.rootElement.id + '_text-field'}
                /* onKupTextFieldBlur={(e: any) => this.onKupBlur(e)} */
                onKupTextFieldChange={(e: any) => this.onKupChange(e, source)}
                onKupTextFieldClick={(e: any) => this.onKupClick(e, source)}
                onKupTextFieldFocus={(e: any) => this.onKupFocus(e, source)}
                onKupTextFieldInput={(e: any) => this.onKupInput(e, source)}
                onKupTextFieldIconClick={(e: any) =>
                    this.onKupIconClick(e, source)
                }
                onKupTextFieldSubmit={(e: any) =>
                    this.onKupTextFieldSubmit(e, source)
                }
                ref={(el) => (this.status[source].textfieldEl = el as any)}
            ></kup-text-field>
        );

        this.status[source].elStyle = elStyle;
        ref.kupComponent = comp;
        ref.style = elStyle;
        ref.type = source;
        return ref;
    }

    prepTimePicker() {
        let source = PICKER_SOURCE_EVENT.TIME;

        return (
            <div
                tabindex="0"
                id="time-picker-div"
                ref={(el) =>
                    (this.status[source].pickerContainerEl = el as any)
                }
                onBlur={(e: any) => {
                    if (e.relatedTarget) {
                        if (e.relatedTarget.id != this.getTextFieldId(source)) {
                            this.onKupBlur(e, this.getSourceEvent());
                        }
                    } else {
                        this.onKupBlur(e, this.getSourceEvent());
                    }
                }}
            >
                <kup-list
                    data={this.createTimeListData(this.timeValue)}
                    is-menu
                    menu-visible
                    onKupListClick={(e) =>
                        this.onKupTimePickerItemClick(e.detail.selected.value)
                    }
                    id={this.rootElement.id + '_list'}
                    ref={(el) => (this.status[source].pickerEl = el as any)}
                ></kup-list>
            </div>
        );
    }

    private createTimeListData(value: string) {
        let listData: ComponentListElement[] = [];

        let selectedTime: Date;
        if (value == null || value.trim() == '') {
            selectedTime = new Date();
        } else {
            selectedTime = unformatDateTime(value, ISO_DEFAULT_TIME_FORMAT);
        }

        let totalDayMinutes: number = 24 * 60;
        let itemsCount = totalDayMinutes / this.timeMinutesStep;

        let date: Date = new Date();
        date.setHours(0, 0, 0);
        for (let i = 0; i < itemsCount; i++) {
            let selected: boolean = false;
            if (
                date.getHours() == selectedTime.getHours() &&
                date.getMinutes() == selectedTime.getMinutes()
            ) {
                selected = true;
            }
            let text: string = formatTime(date);
            let value = formattedStringToDefaultUnformattedStringTime(text);
            let item: ComponentListElement = {
                text: text,
                value: value,
                selected: selected,
            };
            listData[listData.length] = item;
            date.setMinutes(date.getMinutes() + this.timeMinutesStep);
        }

        return listData;
    }

    getTimeForOutput(): string {
        if (this.timeValue == null || this.timeValue.trim() == '') {
            return '';
        }
        let v1 = unformattedStringToFormattedStringTime(this.timeValue);
        return v1;
    }

    recalcPosition(source: PICKER_SOURCE_EVENT) {
        if (
            this.status[source] &&
            this.status[source].pickerContainerEl != null &&
            this.status[source].textfieldEl != null
        ) {
            positionRecalc(
                this.status[source].pickerContainerEl,
                this.status[source].textfieldEl
            );
        }
    }
    //---- Lifecycle hooks ----

    componentWillLoad() {
        logLoad(this, false);
        setThemeCustomStyle(this);
        this.status[PICKER_SOURCE_EVENT.TIME] = {
            pickerOpened: false,
        };

        this.watchTimeMinutesStep();
        this.watchTimeInitialValue();
    }

    componentDidLoad() {
        logLoad(this, true);
    }

    componentWillRender() {
        logRender(this, false);
    }

    componentDidRender() {
        let source = PICKER_SOURCE_EVENT.TIME;
        this.recalcPosition(source);
        logRender(this, true);
    }

    render() {
        let timeTextfieldEl: PICKER_COMPONENT_INFO = this.prepTimeTextfield();
        let timePickerContainerEl = this.prepTimePicker();

        let style = null;
        if (timeTextfieldEl != null && timeTextfieldEl.style != null) {
            style = {
                ...timeTextfieldEl.style,
            };
        }

        return (
            <Host
                style={style}
                onBlur={(e) => this.onKupBlur(e, this.getSourceEvent())}
            >
                <style>{setCustomStyle(this)}</style>
                <div id="kup-component" style={style}>
                    {timeTextfieldEl.kupComponent}
                    {timePickerContainerEl}
                </div>
            </Host>
        );
    }
}