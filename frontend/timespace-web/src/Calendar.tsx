import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import "./App.css";
import { TimeItem } from "./dataTypes";
import { useState, useRef, useEffect } from "react";

const Calendar = ({ data }: { data: TimeItem[] }) => {
   const calendarRef = useRef(null);

   useEffect(() => {
      calendarRef.current && calendarRef.current.getApi().refetchEvents(); // bad workaround, honestly custom calendar component might be better
   }, [data]);
   return (
      <FullCalendar
         ref={calendarRef}
         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
         initialView="timeGridWeek"
         dayHeaderFormat={{ weekday: "long" }}
         events={parseTimeData(data)}
         slotDuration="00:15:00"
         slotLabelInterval="01:00"
         height="640px"
         scrollTime="08:00"
         slotMinTime="06:00"
         slotMaxTime="20:00"
         editable={true}
         selectable={true}
         selectMirror={true}
         dateClick={() => console.log("New item")}
         select={(info) => console.log(info)}
      />
   );
};

const parseTimeData = (data: TimeItem[]): {} =>
   data.map((item) => ({
      title: item.content.title,
      start: new Date(item.timeframe.init._seconds * 1000),
      end: new Date(item.timeframe.term._seconds * 1000),
   }));

export default Calendar;
