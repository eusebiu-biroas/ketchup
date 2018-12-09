/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface KupMatrix {
    'text': string;
  }
  interface KupMatrixAttributes extends StencilHTMLAttributes {
    'text'?: string;
  }

  interface KupLabel {
    'text': string;
  }
  interface KupLabelAttributes extends StencilHTMLAttributes {
    'text'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'KupMatrix': Components.KupMatrix;
    'KupLabel': Components.KupLabel;
  }

  interface StencilIntrinsicElements {
    'kup-matrix': Components.KupMatrixAttributes;
    'kup-label': Components.KupLabelAttributes;
  }


  interface HTMLKupMatrixElement extends Components.KupMatrix, HTMLStencilElement {}
  var HTMLKupMatrixElement: {
    prototype: HTMLKupMatrixElement;
    new (): HTMLKupMatrixElement;
  };

  interface HTMLKupLabelElement extends Components.KupLabel, HTMLStencilElement {}
  var HTMLKupLabelElement: {
    prototype: HTMLKupLabelElement;
    new (): HTMLKupLabelElement;
  };

  interface HTMLElementTagNameMap {
    'kup-matrix': HTMLKupMatrixElement
    'kup-label': HTMLKupLabelElement
  }

  interface ElementTagNameMap {
    'kup-matrix': HTMLKupMatrixElement;
    'kup-label': HTMLKupLabelElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
