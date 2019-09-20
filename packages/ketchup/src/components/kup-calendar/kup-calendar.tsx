import { Component, h, Prop } from '@stencil/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DataTable, Row } from '../kup-data-table/kup-data-table-declarations';
import { formatToMomentDate } from '../../utils/cell-formatter';

@Component({
    tag: 'kup-calendar',
    styleUrl: 'kup-calendar.scss',
    shadow: true,
})
export class KupCalendar {
    @Prop() data: DataTable;
    @Prop({ reflect: true }) dateCol: string;
    @Prop({ reflect: true }) descrCol: string;
    @Prop({ reflect: true }) styleCol: string;
    @Prop({ reflect: true }) weekView = false;
    @Prop({ reflect: true }) hideNavigation = false;

    private calendar: Calendar;

    private calendarContainer: HTMLDivElement = null;

    // ---- Private methods ----
    private getRows(): Row[] {
        if (this.data && this.data.rows) {
            return this.data.rows;
        }

        return [];
    }

    private getEvents() {
        return this.getRows().map((row) => {
            const date = formatToMomentDate(row.cells[this.dateCol]);

            return {
                title: row.cells[this.descrCol].value,
                allDay: true,
                start: date.toISOString(),
                extendedProps: {
                    row,
                },

                // title: row.cells[this.descrCol].value,
                // category: 'allday',
                // isAllDay: true,
                // start: date.toISOString(),
                // end: date.toISOString(),
                // raw: { ...row },
            };
        });
    }
    private onPrev() {
        this.calendar.prev();
    }

    private onNext() {
        this.calendar.next();
    }

    private onToday() {
        this.calendar.today();
    }

    // ---- Lifecycle ----
    componentDidLoad() {
        const plugins = [];
        if (this.weekView) {
            plugins.push(timeGridPlugin);
        } else {
            plugins.push(dayGridPlugin);
        }

        this.calendar = new Calendar(this.calendarContainer, {
            plugins,
            events: this.getEvents(),
            header: {
                left: '',
                center: 'title',
                right: '',
            },
            defaultView: this.weekView ? 'timeGridWeek' : 'dayGridMonth',
            eventRender: (info) => {
                if (this.styleCol) {
                    const row: Row = info.event.extendedProps.row;
                    const cell = row.cells[this.styleCol];
                    if (cell && cell.style) {
                        Object.keys(cell.style).forEach(
                            (k) => (info.el.style[k] = cell.style[k])
                        );
                    }
                }
            },
        });

        this.calendar.render();
    }

    componentDidUnload() {
        if (this.calendar) {
            this.calendar.destroy();
        }
    }

    render() {
        return (
            <div id="kup-calendar">
                {this.hideNavigation ? null : (
                    <div id="kup-calendar__menu">
                        <kup-button
                            iconClass="mdi mdi-chevron-left"
                            onKupButtonClicked={() => this.onPrev()}
                        ></kup-button>
                        <kup-button
                            iconClass="mdi mdi-chevron-right"
                            onKupButtonClicked={() => this.onNext()}
                        ></kup-button>
                        <kup-button
                            iconClass="mdi mdi-calendar-today"
                            onKupButtonClicked={() => this.onToday()}
                        ></kup-button>
                    </div>
                )}
                <div ref={(el) => (this.calendarContainer = el)}></div>
            </div>
        );
    }
}
