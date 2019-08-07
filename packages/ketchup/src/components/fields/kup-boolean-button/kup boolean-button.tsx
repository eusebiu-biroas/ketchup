import { Component, Event, Prop, State, h, EventEmitter } from '@stencil/core';

@Component({
    tag: 'kup-blb',
    styleUrl: 'kup-booblean-button.scss',
    shadow: true,
})
export class KupBooleanButton {
    @Prop() name: string;
    @Prop() value: boolean = false;
    //  @Prop() color: string;  da fare in css
    @State() internalValue: boolean = false;
    @Event() /**( {
        eventName: 'kupBlbChanged',
        composed: true,
        cancelable: true,
        bubbles: true,
    })*/
    kupBlbChanged: EventEmitter<boolean>;

    handleClick() {
        // alert('Received the button click!');
        //  <div> {this.value ? <p>Si {this.value}</p> : <p>NO</p>} </div>;
        //  this.value = !this.value; //= di assegnazione
        this.internalValue = !this.internalValue;
        this.kupBlbChanged.emit(this.internalValue);
    }
    /***
     * creare var con state da usare quando utente clicca internalValue
     * evento che mi dice che ho cliccato sul bottone
     */
    // creare un lifecycle
    componentWillLoad() {
        this.internalValue = this.value;
    }
    render() {
        return (
            // <p>mi chiamo {this.name}</p>;

            <button
                class={this.internalValue ? 'active' : ''}
                onClick={this.handleClick.bind(this)}
            >
                {this.internalValue ? 'SI' : 'NO'}
            </button>
            //   <div> {this.value ? <p>Si {this.value}</p> : <p>NO</p>} </div>
        );
    }
}
