import { h, VNode } from '@stencil/core';
import type { KupCard } from '../kup-card';
/**
 * 1st dialog card layout, used to display information in string format.
 * @param {KupCard}  comp - Card component.
 * @returns {VNode} 1st standard layout virtual node.
 */
export function create1(component: KupCard): VNode {
    //Title, subtitle and description
    const textArray: string[] = component.data['text']
        ? component.data['text']
        : [];
    const divs: VNode[] = [];
    //Loop starts from 1: occurence [0] is the dialog's title
    for (let index = 1; index < textArray.length; index++) {
        const isEven: boolean = index % 2 == 0;
        divs.push(
            <span class={`text ${!isEven ? 'label' : ''}`}>
                {textArray[index]}
            </span>
        );
    }
    return (
        <div class={`dialog-layout-${component.layoutNumber} dialog-element`}>
            {prepHeader(textArray[0])}
            <div class="section-1">{divs}</div>
        </div>
    );
}
/**
 * 2d dialog card layout, used to display information in string format and features an highlighted row on top.
 * @param {KupCard}  comp - Card component.
 * @returns {VNode} 1st standard layout virtual node.
 */
export function create2(component: KupCard): VNode {
    //Title, subtitle and description
    const textArray: string[] = component.data['text']
        ? component.data['text']
        : [];
    const divs: VNode[] = [];
    //Loop starts from 3: occurence [0] is the dialog's title, [1] and [2] are the highlighted strings
    for (let index = 3; index < textArray.length; index++) {
        const isEven: boolean = index % 2 == 0;
        divs.push(
            <span class={`text ${!isEven ? 'label' : ''}`}>
                {textArray[index]}
            </span>
        );
    }
    return (
        <div class={`dialog-layout-${component.layoutNumber} dialog-element`}>
            {textArray[0] ? prepHeader(textArray[0]) : prepHeader('')}
            {textArray[1] && textArray[2] ? (
                <div class="section-1">
                    <div class="text label">{textArray[1]}</div>
                    <div class="text ">{textArray[2]}</div>
                </div>
            ) : null}
            <div class="section-2">{divs}</div>
        </div>
    );
}
/**
 * Called by the layouts method to return the header bar of the dialog.
 * @param {string} title - Title of the dialog.
 * @returns {VNode} Virtual node of the dialog's header bar.
 */
function prepHeader(title: string): VNode {
    return (
        <div id="header-bar">
            {title ? <div id="dialog-title">{title}</div> : null}
            <kup-button icon="clear" id="dialog-close"></kup-button>
        </div>
    );
}
