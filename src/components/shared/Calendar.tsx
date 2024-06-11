
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import {  useGetCurrentUser } from '@/lib/react.query/queriesAndMutations';
import { Models } from 'appwrite';

const Calendar = () => {
  const {data: currentUser} = useGetCurrentUser();
  console.log(currentUser)
  const events = currentUser?.appointments.map((appointment: Models.Document) => ({
    id: appointment.$id,
    title: appointment.title, 
    start: appointment.startTime, 
    end: appointment.endTime 
  }));
  console.log(events)
  
  return (
    <div className="p-5">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        eventClassNames="text-white bg-gray-500 border-none rounded"
        dayHeaderClassNames="bg-dark-1 text-light-1"
        dayCellClassNames="border border-dark-4"
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
      />
    </div>
  );
}

export default Calendar