import { Component, h, Prop } from '@stencil/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
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

                // title: row.cells[this.descrCol].value,
                // category: 'allday',
                // isAllDay: true,
                // start: date.toISOString(),
                // end: date.toISOString(),
                // raw: { ...row },
            };

            // if (this.styleCol) {
            //     const cell = row.cells[this.styleCol];
            //     if (cell && cell.style) {
            //         const { style } = cell;

            //         if (style.color) {
            //             schedule.color = style.color;
            //         }

            //         if (style.background) {
            //             schedule.bgColor = style.background;
            //         }
            //     }
            // }
        });
    }

    // ---- Lifecycle ----
    componentDidLoad() {
        this.calendar = new Calendar(this.calendarContainer, {
            plugins: [dayGridPlugin],
            events: this.getEvents(),
            header: {
                left: '',
                center: 'title',
                right: '',
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
                <div ref={(el) => (this.calendarContainer = el)}></div>
            </div>
        );
    }
}
