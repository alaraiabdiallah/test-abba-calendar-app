'use client'

import { CALENDAR_TYPES } from "@/app/constants";
import { useParams, useRouter } from "next/navigation"
import { useState } from "react";

export default function NavCalendar() {
    const { calendarType } = useParams();
    const [calendarTypeSelected, setCalendarTypeSelected] = useState(calendarType);
    const router = useRouter()
    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        setCalendarTypeSelected(value)
        router.push("/calendar/" + value)
    }
    const calendarTypes = CALENDAR_TYPES
    return (
        <nav className="border-b-2 border-solid border-grey-700 p-4">
            Nav Calendar
            <select name="calendarTypeSelect" value={calendarTypeSelected} onChange={onSelectChange} className="text-black">
                {calendarTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </nav>
    )
}