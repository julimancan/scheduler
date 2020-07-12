import React, { useState, useEffect } from "react";



import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData"

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Jose Feliciano",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Willy Colon",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Victor Manuel",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];


const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};


let appointment = []

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  

 


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyinterviewers = getInterviewersForDay(state, state.day);
  
  

  
  const schedule = dailyAppointments.map(appointment => {
     
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyinterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        state={state}
      />
    );
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
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
        <ul>
          {schedule}
          <Appointment key="last" time="5pm"  />
        </ul>
      </section>
    </main>
  );
}



  // const setDay = day => setState(prev => {  
  //   const appointmentsForDay = getAppointmentsForDay(prev, day)
  //   console.log(appointmentsForDay, "--------appointments for the day===============") 
  //   appointment = appointmentsForDay.map((appointment, index) => {
  //     return <Appointment
  //       key={appointment.id} {...appointment} bookInterview={bookInterview}
  //     />
  //   })
  //   return ({ ...prev, day })
  // });



      // return Axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      //   .then(() => {
      //     dispatch({type: SET_INTERVIEW, value: {id, interview}})
      //     });