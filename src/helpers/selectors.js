import React, { useState, useEffect } from "react";



 export function getAppointmentsForDay(state, day) {

  const [filteredDay] = state.days.filter(d => d.name === day);
  if (filteredDay) {
    const appointments = filteredDay.appointments;
    const listOfAppointmentObjs = [];
    for (let appointmentId of appointments) {
      if (appointmentId in state.appointments) {
        listOfAppointmentObjs.push(state.appointments[appointmentId]);
      }
    };
    return listOfAppointmentObjs;
  }
  else {
    return [];
  };
};


export function getInterview(state, day) {
  // console.log("==========================================>>>>>interviewers", state.appointments[day.interviewer])
  const interviewers = state.interviewers;
  if(day && interviewers[day.interviewer]) {
    const interviewWithData = {...day, interviewer: interviewers[day.interviewer] };
     return interviewWithData;
  } else {
    return null;
  };
};

 export function getInterviewersForDay(state, day) {

    const filteredDay = state.days.find(d => d.name === day);
    console.log('----------------------', filteredDay);
    if (!filteredDay || state.days.length === 0) {
      return [];
    } 
    return filteredDay.interviewers.map(id => state.interviewers[id]);

    
    //   const listOfInterviewerObjs = [];
    //   for (let interviewerId of interviewers) {
    //     if (interviewerId in state.interviewers) {

    //       listOfInterviewerObjs.push(state.interviewers[interviewerId]);
    //     };
    //   };
    //   console.log('===========', listOfInterviewerObjs)
    //   return listOfInterviewerObjs;
    // }
    // else {
    //   return [];
    // };  
};



