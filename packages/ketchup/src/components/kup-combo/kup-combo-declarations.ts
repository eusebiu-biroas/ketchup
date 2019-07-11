import {KupPayloadEvent} from "../../types/EventInterfaces";
import {GenericObject} from "../../types/GenericTypes";

export interface ComboItem {
    [key: string]: any;
}

export type KetchupComboEvent = KupPayloadEvent<ComboItem,GenericObject>;