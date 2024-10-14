import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);
export default function CalenderView() {
    const tasks = [
        {
          title: 'Design Meeting',
          start: '2024-10-30',
          end: '2024-10-30',
        },
        {
          title: 'Code Review',
          start: '2024-10-01',
          end: '2024-10-01',
        },
        {
          title: 'App Launch',
          start: '2024-10-05',
          end: '2024-10-05',
        },
        {
          title: 'Client Presentation',
          start: '2024-10-07',
          end: '2024-10-20',
        },
      ];
    
      // Convert the YYYY-MM-DD strings to JavaScript Date objects
      const events = tasks.map(task => ({
        title: task.title,
        start: new Date(task.start), // Automatically parses the string
        end: new Date(task.end),
      }));
    
      return (
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: '50px' }}
          />
        </div>
      );
}
