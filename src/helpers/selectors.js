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

