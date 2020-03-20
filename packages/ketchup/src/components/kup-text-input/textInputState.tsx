import { KupStateModel } from '../kup-state';

export class TextInputState extends KupStateModel {
    // TODO: define common attributes
    public name: string = 'Ale';

    public toDebugString() {
        return `name=${this.name}`;
    }
}
