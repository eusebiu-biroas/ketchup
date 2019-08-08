import { Component, Event, Prop, State, h, EventEmitter } from '@stencil/core';

@Component({
    tag: 'kup-blb',
    styleUrl: 'kup-booblean-button.scss',
    shadow: true,
})
export class KupBooleanButton {
    @Prop() name: string;
    @Prop() value: boolean = false;
    @Prop({ reflect: true }) yeslabel: string = 'SI';
    @Prop({ reflect: true }) nolabel: string = 'NO';
    @State() internalValue: boolean = false;
    @Event() /**( {
        eventName: 'kupBlbChanged',
        composed: true,
        cancelable: true,
        bubbles: true,
    })*/
    kupBlbChanged: EventEmitter<boolean>;

    handleClick() {
        this.internalValue = !this.internalValue;
        this.kupBlbChanged.emit(this.internalValue);
    }
    componentWillLoad() {
        this.internalValue = this.value;
    }
    render() {
        return (
            <button
                class={this.internalValue ? 'active' : ''}
                onClick={this.handleClick.bind(this)}
            >
                {this.internalValue ? this.yeslabel : this.nolabel}
            </button>
        );
    }
}
