import React from "react"
import MonthCalendar from "../../components/month_calendar";
import WeekCalendar from "../../components/week_calendar";
import DayCalendar from "../../components/day_calendar";

export default function CalendarPageWithType({ params }: { params: { calendarType: string } }) {
    const { calendarType } = params
    let calendarComponent = null;
    switch (calendarType) {
        case "day":
            calendarComponent = <DayCalendar />;
            break;
        case "week":
            calendarComponent = <WeekCalendar />;
            break;
        case "month":
            calendarComponent = <MonthCalendar />;
            break;
        default:
            calendarComponent = <MonthCalendar />;
    }
    return (
        <div>
            {calendarComponent}
        </div>
    )
}