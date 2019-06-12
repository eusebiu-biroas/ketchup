/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  ButtonConfig,
} from './components/kup-btn/kup-btn-declarations';
import {
  ChartConfig,
} from './components/kup-chart/kup-chart-declarations';
import {
  ComboItem,
  KetchupComboEvent,
} from './components/kup-combo/kup-combo-declarations';
import {
  EventEmitter,
} from '@stencil/core';
import {
  Column,
  GenericMap,
  GroupObject,
  PaginatorPos,
  Row,
  SortObject,
  TotalsMap,
} from './components/kup-data-table/kup-data-table-declarations';
import {
  KetchupFldChangeEvent,
  KetchupFldSubmitEvent,
} from './components/kup-fld/kup-fld-declarations';
import {
  ElementOffset,
} from './utils/offset';
import {
  KetchupRadioChangeEvent,
  KetchupRadioElement,
} from './components/kup-radio/kup-radio-declarations';
import {
  GenericObject,
} from './types/GenericTypes';
import {
  KetchupTextInputEvent,
} from './components/kup-text-input/kup-text-input-declarations';


export namespace Components {

  interface KupBtn {
    'buttons': any[];
    'config': ButtonConfig;
  }
  interface KupBtnAttributes extends StencilHTMLAttributes {
    'buttons'?: any[];
    'config'?: ButtonConfig;
  }

  interface KupButton {
    'align': string;
    'buttonClass': string;
    'fillspace': boolean;
    'flat': boolean;
    'iconClass': string;
    'iconUrl': string;
    'label': string;
    'rounded': boolean;
    'showicon': boolean;
    'showtext': boolean;
    'textmode': string;
    'transparent': boolean;
  }
  interface KupButtonAttributes extends StencilHTMLAttributes {
    'align'?: string;
    'buttonClass'?: string;
    'fillspace'?: boolean;
    'flat'?: boolean;
    'iconClass'?: string;
    'iconUrl'?: string;
    'label'?: string;
    'onKetchupButtonClicked'?: (event: CustomEvent<{
      id: string;
    }>) => void;
    'rounded'?: boolean;
    'showicon'?: boolean;
    'showtext'?: boolean;
    'textmode'?: string;
    'transparent'?: boolean;
  }

  interface KupChart {
    'config': ChartConfig;
    'data': any;
  }
  interface KupChartAttributes extends StencilHTMLAttributes {
    'config'?: ChartConfig;
    'data'?: any;
  }

  interface KupCombo {
    /**
    * Programmatically close the combo box
    */
    'closeCombo': () => void;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'displayedField': string;
    /**
    * Allows to pass an initial selected item for the combobox
    */
    'initialValue': ComboItem | null;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'isClearable': boolean;
    /**
    * Items which can be selected
    */
    'items': ComboItem[];
    /**
    * Label to describe the radio group
    */
    'label': string;
    /**
    * Programmatically opens the combo box
    */
    'openCombo': () => void;
    /**
    * If true, the combobox uses a Stencil portal to create the menu. Please use this feature carefully, only if needed.
    */
    'usePortal': boolean;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'valueField': string;
  }
  interface KupComboAttributes extends StencilHTMLAttributes {
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'displayedField'?: string;
    /**
    * Allows to pass an initial selected item for the combobox
    */
    'initialValue'?: ComboItem | null;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'isClearable'?: boolean;
    /**
    * Items which can be selected
    */
    'items'?: ComboItem[];
    /**
    * Label to describe the radio group
    */
    'label'?: string;
    /**
    * When an element has been selected
    */
    'onKetchupComboSelected'?: (event: CustomEvent<KetchupComboEvent>) => void;
    /**
    * If true, the combobox uses a Stencil portal to create the menu. Please use this feature carefully, only if needed.
    */
    'usePortal'?: boolean;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'valueField'?: string;
  }

  interface KupDash {
    'fontsize': string;
    'layout': string;
  }
  interface KupDashAttributes extends StencilHTMLAttributes {
    'fontsize'?: string;
    'layout'?: string;
    'onKetchupDashClicked'?: (event: CustomEvent<{
    }>) => void;
  }

  interface KupDataTable {
    'columnsWidth': Array<{
      column: string;
      width: number;
    }>;
    'data': { columns?: Array<Column>; rows?: Array<Row> };
    'filters': GenericMap;
    'globalFilter': boolean;
    'groups': Array<GroupObject>;
    'multiSelection': boolean;
    'paginatorPos': PaginatorPos;
    'rowsPerPage': number;
    'selectRow': number;
    'showFilters': boolean;
    'showGrid': boolean;
    'showHeader': boolean;
    'sort': Array<SortObject>;
    'sortEnabled': boolean;
    'totals': TotalsMap;
  }
  interface KupDataTableAttributes extends StencilHTMLAttributes {
    'columnsWidth'?: Array<{
      column: string;
      width: number;
    }>;
    'data'?: { columns?: Array<Column>; rows?: Array<Row> };
    'filters'?: GenericMap;
    'globalFilter'?: boolean;
    'groups'?: Array<GroupObject>;
    'multiSelection'?: boolean;
    /**
    * When a row is selected
    */
    'onKupRowSelected'?: (event: CustomEvent<Array<Row>>) => void;
    'paginatorPos'?: PaginatorPos;
    'rowsPerPage'?: number;
    'selectRow'?: number;
    'showFilters'?: boolean;
    'showGrid'?: boolean;
    'showHeader'?: boolean;
    'sort'?: Array<SortObject>;
    'sortEnabled'?: boolean;
    'totals'?: TotalsMap;
  }

  interface KupFld {
    /**
    * Data the FLD must parse to fully be configured. It must be either an Object or a JSON parsable string
    */
    'config': string | object;
    /**
    * Effective data to pass to the component
    */
    'data': any;
    /**
    * Provides an interface to get the current value programmatically
    */
    'getCurrentValue': () => Promise<string | object>;
  }
  interface KupFldAttributes extends StencilHTMLAttributes {
    /**
    * Data the FLD must parse to fully be configured. It must be either an Object or a JSON parsable string
    */
    'config'?: string | object;
    /**
    * Effective data to pass to the component
    */
    'data'?: any;
    /**
    * Launched when the value of the current FLD changes.
    */
    'onKetchupFldChanged'?: (event: CustomEvent<KetchupFldChangeEvent>) => void;
    /**
    * Launched when the FLD values are confirmed and a submit event is triggered.
    */
    'onKetchupFldSubmit'?: (event: CustomEvent<KetchupFldSubmitEvent>) => void;
  }

  interface KupHtml {
    /**
    * If true, the kup-html takes the shape of a button
    */
    'isButton': boolean;
    /**
    * The label to show when button isButton is active
    */
    'label': string;
    /**
    * The address which must be referenced by the iframe
    */
    'src': string;
  }
  interface KupHtmlAttributes extends StencilHTMLAttributes {
    /**
    * If true, the kup-html takes the shape of a button
    */
    'isButton'?: boolean;
    /**
    * The label to show when button isButton is active
    */
    'label'?: string;
    /**
    * When loading the frame has thrown an error
    */
    'onKetchupHtmlError'?: (event: CustomEvent) => void;
    /**
    * When the iframe has been loaded
    */
    'onKetchupHtmlLoaded'?: (event: CustomEvent) => void;
    /**
    * The address which must be referenced by the iframe
    */
    'src'?: string;
  }

  interface KupPaginator {
    'currentPage': number;
    'max': number;
    'perPage': number;
    'selectedPerPage': number;
  }
  interface KupPaginatorAttributes extends StencilHTMLAttributes {
    'currentPage'?: number;
    'max'?: number;
    /**
    * When the current page change
    */
    'onKupPageChanged'?: (event: CustomEvent<{ newPage: number }>) => void;
    /**
    * When the rows per page change
    */
    'onKupRowsPerPageChanged'?: (event: CustomEvent<{ newRowsPerPage: number }>) => void;
    'perPage'?: number;
    'selectedPerPage'?: number;
  }

  interface KupPortalInstance {
    /**
    * Specifies if the current portal instance should be displayed or not.
    */
    'isVisible': boolean;
    /**
    * A style node to be copied into the KetchupPortalInstance
    */
    'styleNode': HTMLStyleElement;
    /**
    * Virtual node list the KetchupPortalInstance must render
    */
    'vNodes'?: JSX.Element[] | JSX.Element;
  }
  interface KupPortalInstanceAttributes extends StencilHTMLAttributes {
    /**
    * Specifies if the current portal instance should be displayed or not.
    */
    'isVisible'?: boolean;
    /**
    * A style node to be copied into the KetchupPortalInstance
    */
    'styleNode'?: HTMLStyleElement;
    /**
    * Virtual node list the KetchupPortalInstance must render
    */
    'vNodes'?: JSX.Element[] | JSX.Element;
  }

  interface KupPortal {
    /**
    * Reference to the html element from which CSS Custom Properties must be derived
    */
    'cssVarsRef': HTMLElement;
    /**
    * Returns the root node instance of the KetchupPortalInstance element
    */
    'getPortalInstance': () => Promise<HTMLElement>;
    /**
    * Tells the portal instance if it can be visible or not
    */
    'isVisible': boolean;
    /**
    * Array of custom css vars which needs to be mirrored. Their value is computed from cssVarsRef
    */
    'mirroredCssVars': string[];
    /**
    * Virtual node list the KetchupPortalInstance must render
    */
    'nodes': JSX.Element[] | JSX.Element;
    /**
    * The HTML element on which the virtual node must be appended
    */
    'portalRootNode': HTMLElement;
    /**
    * Calculated offset of where the portal must be positioned
    */
    'refOffset': ElementOffset;
    /**
    * A style node to be copied into the KetchupPortalInstance
    */
    'styleNode': HTMLStyleElement;
  }
  interface KupPortalAttributes extends StencilHTMLAttributes {
    /**
    * Reference to the html element from which CSS Custom Properties must be derived
    */
    'cssVarsRef'?: HTMLElement;
    /**
    * Tells the portal instance if it can be visible or not
    */
    'isVisible'?: boolean;
    /**
    * Array of custom css vars which needs to be mirrored. Their value is computed from cssVarsRef
    */
    'mirroredCssVars'?: string[];
    /**
    * Virtual node list the KetchupPortalInstance must render
    */
    'nodes'?: JSX.Element[] | JSX.Element;
    /**
    * The HTML element on which the virtual node must be appended
    */
    'portalRootNode'?: HTMLElement;
    /**
    * Calculated offset of where the portal must be positioned
    */
    'refOffset'?: ElementOffset;
    /**
    * A style node to be copied into the KetchupPortalInstance
    */
    'styleNode'?: HTMLStyleElement;
  }

  interface KupRadio {
    /**
    * Direction in which the radio elements must be placed
    */
    'direction': string;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'displayedField': string;
    /**
    * Allows to pass an initial selected item for the Radio group
    */
    'initialValue': KetchupRadioElement;
    /**
    * Radio elements to display
    */
    'items': KetchupRadioElement[];
    /**
    * Label to describe the radio group
    */
    'label': string;
    /**
    * Radio elements value
    */
    'radioName': string;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'valueField': string;
  }
  interface KupRadioAttributes extends StencilHTMLAttributes {
    /**
    * Direction in which the radio elements must be placed
    */
    'direction'?: string;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'displayedField'?: string;
    /**
    * Allows to pass an initial selected item for the Radio group
    */
    'initialValue'?: KetchupRadioElement;
    /**
    * Radio elements to display
    */
    'items'?: KetchupRadioElement[];
    /**
    * Label to describe the radio group
    */
    'label'?: string;
    /**
    * When currently selected radio button has been changed.
    */
    'onKetchupRadioChanged'?: (event: CustomEvent<KetchupRadioChangeEvent>) => void;
    /**
    * Radio elements value
    */
    'radioName'?: string;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'valueField'?: string;
  }

  interface KupTextInput {
    /**
    * Set the amount of time, in milliseconds, to wait to trigger the `ketchupTextInputUpdated` event after each keystroke.
    */
    'debounce': number;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'initialValue': string;
    /**
    * Specify the type of input. Allowed values: password, text.
    */
    'inputType': string;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'isClearable': boolean;
    /**
    * Label to describe the text-input clear button group
    */
    'label': string;
    /**
    * The max length of the text field. Default value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp
    */
    'maxLength': number;
    /**
    * A generic object which can be passed to the component. Once this object is set, it will always be returned inside the info field of the ketchupTextInputUpdated and ketchupTextInputSubmit.
    */
    'obj'?: GenericObject;
    /**
    * Triggers the focus event on the input text
    */
    'triggerFocus': () => void;
  }
  interface KupTextInputAttributes extends StencilHTMLAttributes {
    /**
    * Set the amount of time, in milliseconds, to wait to trigger the `ketchupTextInputUpdated` event after each keystroke.
    */
    'debounce'?: number;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'initialValue'?: string;
    /**
    * Specify the type of input. Allowed values: password, text.
    */
    'inputType'?: string;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'isClearable'?: boolean;
    /**
    * Label to describe the text-input clear button group
    */
    'label'?: string;
    /**
    * The max length of the text field. Default value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp
    */
    'maxLength'?: number;
    /**
    * A generic object which can be passed to the component. Once this object is set, it will always be returned inside the info field of the ketchupTextInputUpdated and ketchupTextInputSubmit.
    */
    'obj'?: GenericObject;
    /**
    * When text field loses focus (blur)
    */
    'onKetchupTextInputBlurred'?: (event: CustomEvent<KetchupTextInputEvent>) => void;
    /**
    * When the text input gains focus
    */
    'onKetchupTextInputFocused'?: (event: CustomEvent<KetchupTextInputEvent>) => void;
    /**
    * When a keydown enter event occurs it generates
    */
    'onKetchupTextInputSubmit'?: (event: CustomEvent<KetchupTextInputEvent>) => void;
    /**
    * When the input text value gets updated
    */
    'onKetchupTextInputUpdated'?: (event: CustomEvent<KetchupTextInputEvent>) => void;
  }

  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
  interface MyComponentAttributes extends StencilHTMLAttributes {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'KupBtn': Components.KupBtn;
    'KupButton': Components.KupButton;
    'KupChart': Components.KupChart;
    'KupCombo': Components.KupCombo;
    'KupDash': Components.KupDash;
    'KupDataTable': Components.KupDataTable;
    'KupFld': Components.KupFld;
    'KupHtml': Components.KupHtml;
    'KupPaginator': Components.KupPaginator;
    'KupPortalInstance': Components.KupPortalInstance;
    'KupPortal': Components.KupPortal;
    'KupRadio': Components.KupRadio;
    'KupTextInput': Components.KupTextInput;
    'MyComponent': Components.MyComponent;
  }

  interface StencilIntrinsicElements {
    'kup-btn': Components.KupBtnAttributes;
    'kup-button': Components.KupButtonAttributes;
    'kup-chart': Components.KupChartAttributes;
    'kup-combo': Components.KupComboAttributes;
    'kup-dash': Components.KupDashAttributes;
    'kup-data-table': Components.KupDataTableAttributes;
    'kup-fld': Components.KupFldAttributes;
    'kup-html': Components.KupHtmlAttributes;
    'kup-paginator': Components.KupPaginatorAttributes;
    'kup-portal-instance': Components.KupPortalInstanceAttributes;
    'kup-portal': Components.KupPortalAttributes;
    'kup-radio': Components.KupRadioAttributes;
    'kup-text-input': Components.KupTextInputAttributes;
    'my-component': Components.MyComponentAttributes;
  }


  interface HTMLKupBtnElement extends Components.KupBtn, HTMLStencilElement {}
  var HTMLKupBtnElement: {
    prototype: HTMLKupBtnElement;
    new (): HTMLKupBtnElement;
  };

  interface HTMLKupButtonElement extends Components.KupButton, HTMLStencilElement {}
  var HTMLKupButtonElement: {
    prototype: HTMLKupButtonElement;
    new (): HTMLKupButtonElement;
  };

  interface HTMLKupChartElement extends Components.KupChart, HTMLStencilElement {}
  var HTMLKupChartElement: {
    prototype: HTMLKupChartElement;
    new (): HTMLKupChartElement;
  };

  interface HTMLKupComboElement extends Components.KupCombo, HTMLStencilElement {}
  var HTMLKupComboElement: {
    prototype: HTMLKupComboElement;
    new (): HTMLKupComboElement;
  };

  interface HTMLKupDashElement extends Components.KupDash, HTMLStencilElement {}
  var HTMLKupDashElement: {
    prototype: HTMLKupDashElement;
    new (): HTMLKupDashElement;
  };

  interface HTMLKupDataTableElement extends Components.KupDataTable, HTMLStencilElement {}
  var HTMLKupDataTableElement: {
    prototype: HTMLKupDataTableElement;
    new (): HTMLKupDataTableElement;
  };

  interface HTMLKupFldElement extends Components.KupFld, HTMLStencilElement {}
  var HTMLKupFldElement: {
    prototype: HTMLKupFldElement;
    new (): HTMLKupFldElement;
  };

  interface HTMLKupHtmlElement extends Components.KupHtml, HTMLStencilElement {}
  var HTMLKupHtmlElement: {
    prototype: HTMLKupHtmlElement;
    new (): HTMLKupHtmlElement;
  };

  interface HTMLKupPaginatorElement extends Components.KupPaginator, HTMLStencilElement {}
  var HTMLKupPaginatorElement: {
    prototype: HTMLKupPaginatorElement;
    new (): HTMLKupPaginatorElement;
  };

  interface HTMLKupPortalInstanceElement extends Components.KupPortalInstance, HTMLStencilElement {}
  var HTMLKupPortalInstanceElement: {
    prototype: HTMLKupPortalInstanceElement;
    new (): HTMLKupPortalInstanceElement;
  };

  interface HTMLKupPortalElement extends Components.KupPortal, HTMLStencilElement {}
  var HTMLKupPortalElement: {
    prototype: HTMLKupPortalElement;
    new (): HTMLKupPortalElement;
  };

  interface HTMLKupRadioElement extends Components.KupRadio, HTMLStencilElement {}
  var HTMLKupRadioElement: {
    prototype: HTMLKupRadioElement;
    new (): HTMLKupRadioElement;
  };

  interface HTMLKupTextInputElement extends Components.KupTextInput, HTMLStencilElement {}
  var HTMLKupTextInputElement: {
    prototype: HTMLKupTextInputElement;
    new (): HTMLKupTextInputElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLElementTagNameMap {
    'kup-btn': HTMLKupBtnElement
    'kup-button': HTMLKupButtonElement
    'kup-chart': HTMLKupChartElement
    'kup-combo': HTMLKupComboElement
    'kup-dash': HTMLKupDashElement
    'kup-data-table': HTMLKupDataTableElement
    'kup-fld': HTMLKupFldElement
    'kup-html': HTMLKupHtmlElement
    'kup-paginator': HTMLKupPaginatorElement
    'kup-portal-instance': HTMLKupPortalInstanceElement
    'kup-portal': HTMLKupPortalElement
    'kup-radio': HTMLKupRadioElement
    'kup-text-input': HTMLKupTextInputElement
    'my-component': HTMLMyComponentElement
  }

  interface ElementTagNameMap {
    'kup-btn': HTMLKupBtnElement;
    'kup-button': HTMLKupButtonElement;
    'kup-chart': HTMLKupChartElement;
    'kup-combo': HTMLKupComboElement;
    'kup-dash': HTMLKupDashElement;
    'kup-data-table': HTMLKupDataTableElement;
    'kup-fld': HTMLKupFldElement;
    'kup-html': HTMLKupHtmlElement;
    'kup-paginator': HTMLKupPaginatorElement;
    'kup-portal-instance': HTMLKupPortalInstanceElement;
    'kup-portal': HTMLKupPortalElement;
    'kup-radio': HTMLKupRadioElement;
    'kup-text-input': HTMLKupTextInputElement;
    'my-component': HTMLMyComponentElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
