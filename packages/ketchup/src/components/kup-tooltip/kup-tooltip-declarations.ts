/**
 * Defines the possible layouts of the tooltip.
 * @enum {number}
 */
export enum KupTooltipLayouts {
  Image = 1,
  NoImage = 2,
  FewInfo = 3,
  Component = 4,
}

/**
 * Defines which components the tooltip components can render.
 * @enum {string}
 */
export enum KupTooltipAllowedComponents {
  Chart = 'chart',
  Dash = 'dash',
  Knob = 'knob',
  None = 'none',
  Rating = 'rating',
}

/**
 * Event payload of title or image clicked.
 */
export interface KupTooltipClickedPartEvent {
  part: string;
}

/**
 * Image interface to pass to the component.
 */
export interface KupTooltipImage {
  alt?: string;
  src: string;
}


/**
 * A tooltip action.
 * @todo This action bar is not yet defined. Will implement.
 */
export interface KupTooltipAction {
  text?: string;
  icon?: string;
}