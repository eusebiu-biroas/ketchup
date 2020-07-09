import numeral from 'numeral';
import moment from 'moment';

import { Cell } from '../components/kup-data-table/kup-data-table-declarations';

export function formatToNumber(cell: Cell): number {
    if (cell.obj) {
        return numeral(cell.obj.k).value();
    }

    return numeral(cell.value).value();
}

export function formatToMomentDate(cell: Cell): any {
    let format = 'YYYYMMDD';

    if (cell.obj) {
        const obj = cell.obj;

        if ('D8' === obj.t && '*DMYY' === obj.p) {
            format = 'DDMMYYYY';
        }

        return moment(cell.obj.k, format);
    }

    return moment(cell.value, 'DD/MM/YYYY');
}

/** unformat string date DD/MM/YYYY; return Date object */
export function unformatDate(value: string): Date {
    value = value.replace(/\//g, '');
    let format = 'DDMMYYYY';

    return moment(value, format).toDate();
}

/**
 * input formatted by locale US, decimal separator . (like java decimal numbers)
 * output number
 **/
export function stringToNumber(input: string): number {
    if (input == null || input.trim() == '') {
        input = '0';
    }
    return numeral(input).value();
}

/**
 * input number
 * output formatted by actual browser locale
 **/
export function numberToString(input: number, decimals: number): string {
    if (input == null) {
        return '';
    }
    return _numberToString(input, decimals, navigator.language);
}

/**
 * input formatted by locale US, decimal separator . (like java decimal numbers)
 * output formatted by actual browser locale
 **/
export function unformattedStringToFormattedStringNumber(
    input: string,
    decimals: number
): string {
    return numberToString(stringToNumber(input), decimals);
}

/**
 * input formatted by actual browser locale
 * output formatted by locale US, decimal separator . (like java decimal numbers)
 **/
export function formattedStringToUnformattedStringNumber(
    input: string
): string {
    if (input == null || input.trim() == '') {
        input = '0';
    }
    let decFmt: string = getDecimalSeparator(navigator.language);
    let regExpr: RegExp = null;
    if (decFmt == '.') {
        regExpr = /,/g;
    } else {
        regExpr = /\./g;
    }

    input = input.replace(regExpr, '');
    if (decFmt != '.') {
        input = input.replace(/,/g, '.');
    }
    let unf: number = Number(input);

    return _numberToString(unf, -1, 'en-US');
}

function getDecimalSeparator(locale) {
    const numberWithDecimalSeparator = 1.1;
    return Intl.NumberFormat(locale)
        .formatToParts(numberWithDecimalSeparator)
        .find((part) => part.type === 'decimal').value;
}

export function _numberToString(
    input: number,
    decimals: number,
    locale: string
): string {
    if (input == null) {
        input = 0;
    }
    let n: Number = Number(input);
    let f: Intl.NumberFormatOptions =
        decimals > -1
            ? {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
              }
            : {};
    return n.toLocaleString(locale, f);
}
