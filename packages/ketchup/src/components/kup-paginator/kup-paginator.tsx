import {
    Component,
    Prop,
    Element,
    Event,
    EventEmitter,
    h,
} from '@stencil/core';

import { PaginatorMode } from './kup-paginator-declarations';
import { isNumber } from '../../utils/utils';
import {
    KupManager,
    kupManagerInstance,
} from '../../utils/kup-manager/kup-manager';
import { FButton } from '../../f-components/f-button/f-button';
import { FButtonMDC } from '../../f-components/f-button/f-button-mdc';

@Component({
    tag: 'kup-paginator',
    styleUrl: 'kup-paginator.scss',
    shadow: true,
})
export class KupPaginator {
    @Element() rootElement: HTMLElement;

    @Prop() currentPage: number = 1;

    @Prop() max: number = 0;

    @Prop() mode: PaginatorMode = PaginatorMode.FULL;

    @Prop() perPage: number = 10;

    @Prop() selectedPerPage: number = 10;

    private comboPageSelectorEl: any = undefined;
    private comboRowsSelectorEl: any = undefined;
    /**
     * Instance of the KupManager class.
     */
    private kupManager: KupManager = kupManagerInstance();

    /**
     * When the current page change
     */
    @Event({
        eventName: 'kupPageChanged',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupPageChanged: EventEmitter<{ newPage: number }>;

    /**
     * When the rows per page change
     */
    @Event({
        eventName: 'kupRowsPerPageChanged',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupRowsPerPageChanged: EventEmitter<{ newRowsPerPage: number }>;

    private isPrevPageDisabled() {
        return this.currentPage == 1;
    }

    private isNextPageDisabled() {
        return this.currentPage * this.selectedPerPage >= this.max;
    }

    private onPageChange(event: CustomEvent) {
        event.stopPropagation();
        if (event.detail.value) {
            if (isNumber(event.detail.value)) {
                const numberOfPages = Math.ceil(
                    this.max / this.selectedPerPage
                );
                let tmpNewPage: number = event.detail.value;
                if (tmpNewPage > numberOfPages) {
                    tmpNewPage = numberOfPages;
                }
                if (tmpNewPage < 1) {
                    tmpNewPage = 1;
                }
                this.kupPageChanged.emit({
                    newPage: tmpNewPage,
                });
            }
        }
    }

    private onPrevPage() {
        if (this.isPrevPageDisabled()) {
            return;
        }

        // fire next page event
        this.kupPageChanged.emit({
            newPage: this.currentPage - 1,
        });
    }

    private onNextPage() {
        if (this.isNextPageDisabled()) {
            return;
        }

        // fire next page event
        this.kupPageChanged.emit({
            newPage: this.currentPage + 1,
        });
    }

    private onRowsPerPage(event: CustomEvent) {
        event.stopPropagation();

        if (event.detail.value) {
            if (isNumber(event.detail.value)) {
                let tmpRowsPerPage: number = event.detail.value;
                if (tmpRowsPerPage > this.max) {
                    tmpRowsPerPage = this.max;
                }
                if (tmpRowsPerPage < 1) {
                    tmpRowsPerPage = 1;
                }
                this.kupRowsPerPageChanged.emit({
                    newRowsPerPage: tmpRowsPerPage,
                });
            }
        }
    }

    // render functions
    private getGoToPageItems(maxNumberOfPage: number) {
        const goToPageItems = [];

        for (let i = 1; i <= maxNumberOfPage; i++) {
            let selected = i == this.currentPage;
            goToPageItems.push({
                text: i.toString(),
                value: i.toString(),
                selected: selected,
            });
        }

        return goToPageItems;
    }

    private getRowsPerPageItems() {
        const rowsPerPageItems = [];

        /*if (this.currentPage !== this.max) {*/
        let i = this.selectedPerPage;

        if (i === 0) {
            return rowsPerPageItems;
        }

        while (i < this.max) {
            let selected = i == this.selectedPerPage;
            rowsPerPageItems.push({
                text: i.toString(),
                value: i.toString(),
                selected: selected,
            });
            i = i * 2;
        }

        let selected = this.max == this.selectedPerPage;
        // adding 'max' option
        rowsPerPageItems.push({
            text: this.max,
            value: this.max,
            selected: selected,
        });
        /*} else {
            rowsPerPageItems.push({
                text: this.perPage,
                value: this.perPage,
                selected: true,
            });
        }*/

        return rowsPerPageItems;
    }

    private setEvents(): void {
        const root: ShadowRoot = this.rootElement.shadowRoot;

        if (root) {
            const nextButton: HTMLElement = root.querySelector(
                '.f-button--wrapper.next-page'
            );
            const prevButton: HTMLElement = root.querySelector(
                '.f-button--wrapper.prev-page'
            );
            if (nextButton) {
                const buttonEl: HTMLButtonElement = nextButton.querySelector(
                    'button'
                );
                if (buttonEl) {
                    buttonEl.onclick = () => this.onNextPage();
                }
                FButtonMDC(nextButton);
            }
            if (prevButton) {
                const buttonEl: HTMLButtonElement = prevButton.querySelector(
                    'button'
                );
                if (buttonEl) {
                    buttonEl.onclick = () => this.onPrevPage();
                }
                FButtonMDC(prevButton);
            }
        }
    }

    //---- Lifecycle hooks ----

    componentWillLoad() {
        this.kupManager.debug.logLoad(this, false);
        this.selectedPerPage = this.perPage;
    }

    componentDidLoad() {
        this.kupManager.debug.logLoad(this, true);
    }

    componentWillRender() {
        this.kupManager.debug.logRender(this, false);
    }

    componentDidRender() {
        this.setEvents();
        if (this.comboPageSelectorEl) {
            this.comboPageSelectorEl.setValue(this.currentPage.toString());
        }
        if (this.comboRowsSelectorEl) {
            this.comboRowsSelectorEl.setValue(this.selectedPerPage.toString());
        }
        this.kupManager.debug.logRender(this, true);
    }

    render() {
        const maxNumberOfPage = Math.ceil(this.max / this.selectedPerPage);

        const goToPageItems = this.getGoToPageItems(maxNumberOfPage);

        const rowsPerPageItems = this.getRowsPerPageItems();

        let textfieldDataPage = {
            label: 'Page',
            helper: `of ${maxNumberOfPage}`,
            helperWhenFocused: true,
        };
        let listDataPage = {
            data: goToPageItems,
            selectable: true,
        };

        let textfieldDataRows = {
            label: 'Rows / page',
            helper: `Total rows: ${this.max}`,
            helperWhenFocused: true,
        };
        let listDataRows = {
            data: rowsPerPageItems,
            selectable: true,
        };

        let dataPageSelector = {
            'kup-list': listDataPage,
            'kup-text-field': textfieldDataPage,
        };
        let dataRowsSelector = {
            'kup-list': listDataRows,
            'kup-text-field': textfieldDataRows,
        };
        let compCreated = (
            <div id="kup-component">
                <div class="align-left">
                    <div class="nav-section">
                        <FButton
                            icon="chevron_left"
                            disabled={this.isPrevPageDisabled()}
                            wrapperClass="prev-page"
                        />
                        <kup-combobox
                            class="page-selector"
                            data={dataPageSelector}
                            initialValue={this.currentPage.toString()}
                            onKupComboboxItemClick={(e) => this.onPageChange(e)}
                            onKupComboboxTextFieldSubmit={(e) =>
                                this.onPageChange(e)
                            }
                            onKupComboboxBlur={(e) => this.onPageChange(e)}
                            ref={(el) => (this.comboPageSelectorEl = el as any)}
                        />
                        <FButton
                            icon="chevron_right"
                            disabled={this.isNextPageDisabled()}
                            wrapperClass="next-page"
                        />
                    </div>
                    <div class="tot-section">
                        <slot name="more-results" />
                        <kup-combobox
                            class="rows-selector"
                            data={dataRowsSelector}
                            initialValue={this.perPage.toString()}
                            onKupComboboxItemClick={(e) =>
                                this.onRowsPerPage(e)
                            }
                            onKupComboboxTextFieldSubmit={(e) =>
                                this.onRowsPerPage(e)
                            }
                            onKupComboboxBlur={(e) => this.onRowsPerPage(e)}
                            ref={(el) => (this.comboRowsSelectorEl = el as any)}
                        />
                        <slot name="right" />
                    </div>
                </div>

                <div class="align-left"></div>
            </div>
        );

        return compCreated;
    }
}
