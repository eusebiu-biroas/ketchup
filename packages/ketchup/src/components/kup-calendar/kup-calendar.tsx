import { Component, h, Prop } from '@stencil/core';
import Calendar, { ISchedule } from 'tui-calendar';
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

    private calendarContainer: HTMLDivElement = null;

    private calendar: Calendar = null;

    // ---- Private methods ----
    private getRows(): Row[] {
        if (this.data && this.data.rows) {
            return this.data.rows;
        }

        return [];
    }

    private initSchedules() {
        const schedules: ISchedule[] = this.getRows().map((row) => {
            const date = formatToMomentDate(row.cells[this.dateCol]);

            const schedule: ISchedule = {
                title: row.cells[this.descrCol].value,
                category: 'allday',
                isAllDay: true,
                start: date.toISOString(),
                end: date.toISOString(),
                raw: { ...row },
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

            return schedule;
        });

        this.calendar.createSchedules(schedules);
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
        this.calendar = new Calendar(this.calendarContainer, {
            defaultView: this.weekView ? 'week' : 'month',
            taskView: true,
            scheduleView: true,
            usageStatistics: false,
        });

        this.initSchedules();
    }

    componentDidUnload() {
        this.calendar.destroy();
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
