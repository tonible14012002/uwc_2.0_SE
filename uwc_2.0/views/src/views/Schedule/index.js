import React from 'react';
import { Inject, ScheduleComponent, Day, Week, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import './styles/schedule.css';

function Schedule() {
    return (
        <ScheduleComponent>
            <Inject services={[Day, Week, Month, Agenda]}/>
        </ScheduleComponent>
    )
}

export default Schedule;