import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'kup-blb',
    styleUrl: 'kup-booblean-button.scss',
    shadow: true,
})
export class KupBooleanButton {
    @Prop() name: string;
    @Prop() value: boolean = false;
    //  @Prop() color: string;  da fare in css

    handleClick() {
        // alert('Received the button click!');
        //  <div> {this.value ? <p>Si {this.value}</p> : <p>NO</p>} </div>;
        this.value = !this.value; //= di assegnazione
    }

    render() {
        return (
            // <p>mi chiamo {this.name}</p>;

            <button onClick={this.handleClick.bind(this)}>
                {this.value ? 'SI' : 'NO'}
            </button>
            //   <div> {this.value ? <p>Si {this.value}</p> : <p>NO</p>} </div>
        );
    }
}
