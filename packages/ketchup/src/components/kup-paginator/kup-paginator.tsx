import {
    Component,
    Event,
    EventEmitter,
    Prop,
    h,
    JSX,
    Watch,
} from '@stencil/core';
import { PaginatorMode } from './kup-paginator-declarations';

@Component({
    tag: 'kup-paginator',
    styleUrl: 'kup-paginator.scss',
    shadow: true,
})
export class KupPaginator {
    @Prop()
    max = 0;

    @Prop()
    perPage = 10;

    @Prop()
    selectedPerPage = 10;

    @Prop()
    currentPage = 1;

    @Prop({ reflect: true })
    mode: PaginatorMode = PaginatorMode.SIMPLE;

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

    @Watch('max')
    @Watch('selectedPerPage')
    updateMaxNumberOfPage() {
        this.numberOfPages = Math.ceil(this.max / this.selectedPerPage);
    }

    // ---- not reactive ----
    private numberOfPages = 0;

    // ---- lifecycle
    componentWillLoad() {
        this.updateMaxNumberOfPage();
    }

    // ---- private methods ----
    private isPrevPageDisabled() {
        return this.currentPage === 1;
    }

    private isNextPageDisabled() {
        return this.currentPage === this.numberOfPages;
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

    private onFirstPage() {
        if (this.isPrevPageDisabled()) {
            return;
        }

        this.kupPageChanged.emit({
            newPage: 1,
        });
    }

    private onLastPage() {
        if (this.isNextPageDisabled()) {
            return;
        }

        this.kupPageChanged.emit({
            newPage: this.numberOfPages,
        });
    }

    private onSimpleGoToPage(page: number) {
        this.kupPageChanged.emit({
            newPage: page,
        });
    }

    private onGoToPage({ target }) {
        this.kupPageChanged.emit({
            newPage: parseInt(target.value),
        });
    }

    private onRowsPerPage({ target }) {
        this.kupRowsPerPageChanged.emit({
            newRowsPerPage: parseInt(target.value),
        });
    }

    // render functions
    private getGoToPageOptions(): JSX.Element[] {
        const goToPageOptions: JSX.Element[] = [];

        goToPageOptions.push(
            <option value="1" selected={this.currentPage === 1}>
                1
            </option>
        );

        for (let i = 2; i <= this.numberOfPages; i++) {
            goToPageOptions.push(
                <option value={i} selected={this.currentPage === i}>
                    {i}
                </option>
            );
        }

        return goToPageOptions;
    }

    private getRowsPerPageOptions(): JSX.Element[] {
        const rowsPerPageOptions: JSX.Element[] = [];

        if (this.currentPage != this.max) {
            let i = this.perPage;

            if (i === 0) {
                return rowsPerPageOptions;
            }

            while (i < this.max) {
                rowsPerPageOptions.push(
                    <option value={i} selected={i === this.selectedPerPage}>
                        {i}
                    </option>
                );
                i = i * 2;
            }

            // adding 'max' option
            rowsPerPageOptions.push(
                <option value={this.max} selected={this.max === this.perPage}>
                    {this.max}
                </option>
            );
        } else {
            rowsPerPageOptions.push(
                <option value={this.perPage} selected>
                    {this.perPage}
                </option>
            );
        }

        return rowsPerPageOptions;
    }

    // ---- Render ----
    private simplePaginator() {
        const pageNumbers = [];

        let firstPage: number;
        let lastPage: number;

        if (this.numberOfPages <= 10) {
            firstPage = 1;
            lastPage = this.numberOfPages;
        } else {
            firstPage = this.currentPage - 5;
            if (firstPage < 1) {
                firstPage = 1;
            }

            lastPage = firstPage + 9;
            if (lastPage > this.numberOfPages) {
                lastPage = this.numberOfPages;
            }

            if (lastPage - firstPage < 9) {
                firstPage = lastPage - 9;
            }
        }

        for (let i = firstPage; i <= lastPage; i++) {
            // see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
            // for docs on role="button"
            const isActive = this.currentPage === i;

            pageNumbers.push(
                <div
                    class={{ 'page-number': true, active: isActive }}
                    role="button"
                    tabindex="0"
                    aria-pressed={isActive ? 'true' : 'false'}
                    onClick={() => this.onSimpleGoToPage(i)}
                >
                    {i}
                </div>
            );
        }

        return (
            <div id="simple-paginator">
                <div
                    aria-label="First page"
                    onClick={() => this.onFirstPage()}
                    class={{
                        disabled: this.isPrevPageDisabled(),
                    }}
                >
                    <svg
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z" />
                    </svg>
                </div>

                <div
                    aria-label="Previous page"
                    onClick={() => this.onPrevPage()}
                    class={{
                        disabled: this.isPrevPageDisabled(),
                    }}
                >
                    <svg
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                    </svg>
                </div>

                {pageNumbers}

                <div
                    aria-label="Next page"
                    onClick={() => this.onNextPage()}
                    class={{
                        disabled: this.isNextPageDisabled(),
                    }}
                >
                    <svg
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                    </svg>
                </div>

                <div
                    aria-label="Last page"
                    onClick={() => this.onLastPage()}
                    class={{
                        disabled: this.isNextPageDisabled(),
                    }}
                >
                    <svg
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z" />
                    </svg>
                </div>
            </div>
        );
    }

    private fullPaginator() {
        const prevPageClassName = {
            'prev-page': true,
            'mdi mdi-chevron-left': true,
            disabled: this.isPrevPageDisabled(),
        };

        const nextPageClassName = {
            'next-page': true,
            'mdi mdi-chevron-right': true,
            disabled: this.isNextPageDisabled(),
        };

        const goToPageOptions = this.getGoToPageOptions();

        const rowsPerPageOptions = this.getRowsPerPageOptions();

        return (
            <div id="paginator">
                <div class="align-left">
                    Pagina
                    <span
                        aria-label="Previous page"
                        class={prevPageClassName}
                        onClick={() => this.onPrevPage()}
                        tabIndex={0}
                    />
                    <select onChange={(e) => this.onGoToPage(e)}>
                        {goToPageOptions}
                    </select>
                    <span
                        aria-label="Next page"
                        class={nextPageClassName}
                        onClick={() => this.onNextPage()}
                        tabIndex={0}
                    />
                    Di {this.numberOfPages}
                </div>

                <div class="align-right">
                    <span class="nextPageGroup">
                        Numero risultati: {this.max}
                    </span>
                    <slot name="more-results" />
                    Mostra
                    <select onChange={(e) => this.onRowsPerPage(e)}>
                        {rowsPerPageOptions}
                    </select>
                    righe per pagina
                </div>
            </div>
        );
    }

    render() {
        return this.mode === PaginatorMode.SIMPLE
            ? this.simplePaginator()
            : this.fullPaginator();
    }
}
