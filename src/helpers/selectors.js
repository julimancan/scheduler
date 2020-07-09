import React, { useState, useEffect } from "react";



export function getAppointmentsForDay(state, day) {

  const [filteredDay] = state.days.filter(d => d.name === day);
  if (filteredDay) {
    const appointments = filteredDay.appointments
    const listOfAppointmentObjs = []
    for (let appointmentId of appointments) {
      if (appointmentId in state.appointments) {
        listOfAppointmentObjs.push(state.appointments[appointmentId])
      }
    }
    return listOfAppointmentObjs
  }
  else {
    return [];
  }
}

export function getInterview(state, day) {
  // console.log("==========================================>>>>>interviewers", state.appointments[day.interviewer])
  const interviewers = state.interviewers;
  if(day && interviewers[day.interviewer]) {
    const interviewWithData = {...day, interviewer: interviewers[day.interviewer] }
    console.log(interviewWithData, "interviewer exists!!!!!!!!!!!!!!!!!!!!!!!!!")
     return interviewWithData;
  } else {
    return null
  }
  
  const expectedOutput = {  
    "student": "Lydia Miller-Jones",
    "interviewer": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    }
  }
  // return
}
