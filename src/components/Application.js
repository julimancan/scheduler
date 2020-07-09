import React, { useState, useEffect } from "react";



import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from "helpers/selectors"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Jose Feliciano",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Willy Colon",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Victor Manuel",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];
let appointment = []

export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}
  });

  useEffect(() => {
    const getDays = axios.get("/api/days")
    const getAppointments = axios.get("/api/appointments")
    const getInterviewers = axios.get("/api/interviewers");
    
    Promise.all([getDays, getAppointments, getInterviewers])
      .then( all  => {
        console.log('---------', getInterviewers)
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewer: all[2].data}));
        setDay("Monday")
      })
  }, []);

  const setDay = day => setState(prev => {  
    // console.log("set day!!!!!!!!", prev, day)
    const appointmentsForDay = getAppointmentsForDay(prev, day)
    console.log(appointmentsForDay, "--------appointments for the day===============")
   appointment = appointmentsForDay.map((appointment, index) => {
      // const interview = getInterview(state, appointment.interview)

      return <Appointment
        key={appointment.id} {...appointment}
      />
    })
    return ({ ...prev, day })
});
  // const setDays = days => setState(prev => ({...prev, days}));
  




  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"> <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}

        {appointment}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
