import { h, EventEmitter, JSX } from '@stencil/core';
import {
    Cell,
    Column,
} from '../../components/kup-data-table/kup-data-table-declarations';
import {
    isBar,
    isChart,
    isButton,
    isIcon,
    isImage,
    isLink,
    isNumber,
    isProgressBar,
    isRadio,
    isVoCodver,
    isCheckbox,
    hasTooltip,
} from '../../utils/object';
import { buildIconConfig, buildProgressBarConfig } from '../cells';
import { stringToNumber, numberToString } from '../cell-formatter';
import { buildButtonConfig } from '../widget';
import { getBoolean } from '../utils';
import {
    styleHasBorderRadius,
    styleHasWritingMode,
} from '../../components/kup-data-table/kup-data-table-helper';

/**
 * FActory function for cells.
 * @param cell - cell object
 * @param column - the cell's column name
 * @param previousRowCellValue - An optional value of the previous cell on the same column. If set and equal to the value of the current cell, makes the value of the current cell go blank.
 * @param cellData - Additional data for the current cell.
 * @param cellData.column - The column object to which the cell belongs.
 * @param cellData.row - The row object to which the cell belongs.
 */
export function renderCell(
    comp: JSX.Element,
    indend: any,
    cell: Cell,
    onCellContentClick: Function,
    column: Column,
    showOptions: boolean,
    onOptionClick: Function,
    readOnlyInputFields: boolean,
    density: string,
    kupLoadRequestTooltip: EventEmitter,
    kupDetailRequestTooltip: EventEmitter,
    previousRowCellValue: string,
    sizedColumns: Column[]
): any {
    const classObj: Record<string, boolean> = {
        'cell-content': true,
        'has-options': showOptions,
        clickable: !!column.clickable,
    };

    // When the previous row value is different from the current value, we can show the current value.
    const valueToDisplay =
        previousRowCellValue !== cell.value ? cell.value : '';

    // Sets the default value
    let content: any = valueToDisplay;

    //if (valueToDisplay) {
    if (!column.hideValuesRepetitions || valueToDisplay) {
        if (isIcon(cell.obj) || isVoCodver(cell.obj)) {
            let iconStyle = {};
            if (cell.config) {
                if (cell.config.sizeX) {
                    iconStyle = { ...iconStyle, width: cell.config.sizeX };
                }
                if (cell.config.sizeY) {
                    iconStyle = { ...iconStyle, height: cell.config.sizeY };
                }
            }
            let imageClick = null;
            let click = null;
            if (onCellContentClick) {
                imageClick = function (e: Event) {
                    e.stopPropagation();
                    onCellContentClick(comp);
                };
                click = function (e: MouseEvent) {
                    e.stopPropagation();
                };
            }
            content = (
                <span class="icon-container" style={iconStyle}>
                    <kup-image
                        {...buildIconConfig(cell, valueToDisplay)}
                        onKupImageClick={imageClick}
                        onClick={click}
                    />
                </span>
            );
        } else if (isNumber(cell.obj)) {
            content = valueToDisplay;

            if (content && content != '') {
                const cellValueNumber: number = stringToNumber(cell.value);
                const cellValue = numberToString(
                    cellValueNumber,
                    column.decimals ? column.decimals : -1
                );
                content = cellValue;
                if (cellValueNumber < 0) {
                    classObj['negative-number'] = true;
                }
            }
        } else if (isImage(cell.obj)) {
            // If we have a not duplicated image to render
            // Checks if there are badges to set
            content = (
                <kup-image
                    class="cell-image"
                    badgeData={cell.config ? cell.config.badges : undefined}
                    sizeX="auto"
                    sizeY="var(--dtt_cell-image_max-height)"
                    resource={valueToDisplay}
                />
            );
        } else if (isLink(cell.obj)) {
            content = (
                <a href={valueToDisplay} target="_blank">
                    {valueToDisplay}
                </a>
            );
        } else if (isCheckbox(cell.obj)) {
            let checked = cell.obj.k == '1';
            content = (
                <kup-checkbox
                    checked={checked}
                    disabled={readOnlyInputFields}
                />
            );
        } else if (isButton(cell.obj)) {
            let buttonClick = null;
            let click = null;
            if (onCellContentClick) {
                buttonClick = function (e: Event) {
                    e.stopPropagation();
                    onCellContentClick(comp);
                };
                click = function (e: MouseEvent) {
                    e.stopPropagation();
                };
            }
            /**
             * Here either using .bind() or () => {} function would bring more or less the same result.
             * Both those syntax would create at run time a new function for each cell on which they're rendered.
             * (See references below.)
             *
             * Another solution would be to simply bind an event handler like this:
             * onKupButtonClicked={this.onJ4btnClicked}
             *
             * The problem here is that, by using that syntax:
             * 1 - Each time a cell is rendered with an object item, either the cell or button must have a data-row,
             *      data-column and data-cell-name attributes which stores the index of cell's and the name of the clicked cell;
             * 2 - each time a click event is triggered, the handler reads the row and column index set on the element;
             * 3 - searches those column and row inside the current data for the table;
             * 4 - once the data is found, creates the custom event with the data to be sent.
             *
             * Currently there is no reason to perform such a search, but it may arise if on large data tables
             * there is a significant performance loss.
             * @see https://reactjs.org/docs/handling-events.html
             */
            content = (
                <kup-button
                    {...buildButtonConfig(cell.value, cell.config)}
                    onKupButtonClick={buttonClick}
                    onClick={click}
                />
            );
        } else if (isBar(cell.obj)) {
            if (cell.config) {
                let barData = cell.config.data;
                let barHeight = '26px';
                if (density === 'medium') {
                    barHeight = '36px';
                }
                if (density === 'big') {
                    barHeight = '50px';
                }

                if (barData) {
                    const props: {
                        data: any;
                        sizeY: string;
                    } = {
                        data: barData,
                        sizeY: barHeight,
                    };
                    /*
                    content =
                    !column.hideValuesRepetitions || valueToDisplay ? (
                        <kup-image {...props} />
                    ) : null;
                    */
                    content = <kup-image {...props} />;
                }
            } else if (cell.value) {
                const props: {
                    resource: string;
                    sizeY: string;
                    isCanvas: boolean;
                } = {
                    resource: cell.value,
                    sizeY: '35px',
                    isCanvas: true,
                };
                /*
                content =
                    !column.hideValuesRepetitions || valueToDisplay ? (
                        <kup-image {...props} />
                    ) : null;
                */
                content = <kup-image {...props} />;
            }
        } else if (isChart(cell.obj)) {
            let columnWidth;
            if (sizedColumns) {
                columnWidth = sizedColumns.find(
                    ({ name: columnName }) => columnName === column.name
                );
            }

            const props: {
                cellConfig: any;
                value: string;
                width?: number;
            } = {
                cellConfig: cell.config,
                value: cell.value,
                width: columnWidth !== undefined ? columnWidth.size : undefined,
            };

            content = <kup-chart-cell {...props} />;
        } else if (isProgressBar(cell.obj)) {
            //if (!column.hideValuesRepetitions || valueToDisplay) {
            content = (
                <kup-progress-bar
                    {...buildProgressBarConfig(
                        cell,
                        null,
                        true,
                        valueToDisplay
                    )}
                />
            );
            //} else {
            //    content = null;
            //}
        } else if (isRadio(cell.obj)) {
            //if (!column.hideValuesRepetitions || valueToDisplay) {
            let radioProp = {
                data: [
                    {
                        label: '',
                        value: cell.value,
                        checked: getBoolean(cell.obj.k),
                    },
                ],
                disabled: readOnlyInputFields,
            };
            content = <kup-radio {...radioProp} />;
            //} else {
            //    content = null;
            //}
        }
    } else {
        content = null;
    }
    // if cell.style has border, apply style to cellcontent
    let style = null;
    if (styleHasBorderRadius(cell) || styleHasWritingMode(cell)) {
        style = cell.style;
    }

    /**
     * Controls if current cell needs a tooltip and eventually adds it.
     * @todo When the option forceOneLine is active, there is a problem with the current implementation of the tooltip. See documentation in the mauer wiki for better understanding.
     */
    if (hasTooltip(cell.obj)) {
        content = (
            <kup-tooltip
                class="datatable-tooltip"
                onKupTooltipLoadData={(ev) =>
                    kupLoadRequestTooltip.emit({
                        cell,
                        tooltip: ev.srcElement,
                    })
                }
                onKupTooltipLoadDetail={(ev) =>
                    kupDetailRequestTooltip.emit({
                        cell,
                        tooltip: ev.srcElement,
                    })
                }
            >
                {content}
            </kup-tooltip>
        );
    }

    let cellElements = [];

    cellElements.push(
        <span class={classObj} style={style}>
            {indend}
            {content}
        </span>
    );
    if (showOptions) {
        cellElements.push(renderOptionElement(comp, onOptionClick));
    }
    return cellElements;

    /*
        <span class={classObj} style={style}>
            {indend}
            {content}
        </span>
        */
}

export function renderOptionElement(
    comp: JSX.Element,
    onOptionClick: Function
) {
    let buttonClick = null;
    let click = null;
    if (onOptionClick) {
        buttonClick = function (e: Event) {
            e.stopPropagation();
            onOptionClick(comp);
        };
        click = function (e: MouseEvent) {
            e.stopPropagation();
        };
    }
    return (
        <kup-button
            class="options"
            custom-style=":host{transform:scale(0.75)}#kup-component .mdc-icon-button{--mdc-ripple-fg-opacity:0!important; height:1.25rem; width:1.25rem; padding:0}#kup-component .mdc-icon-button:before{display:none}.mdc-button__ripple{display:none}"
            icon="settings"
            tooltip="Options"
            onKupButtonClick={buttonClick}
            onClick={click}
        />
    );
}
