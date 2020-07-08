import React, { useState, useEffect } from "react";



export function getAppointmentsForDay(state, day) {
  // console.log('00000000000000000000000000000000000000', state)
  const [filteredDay] = state.days.filter(d => d.name === day);
// put a conditional to filter the undefines and return an empty array
if (filteredDay) {
const appointments = filteredDay.appointments
  // const appointments = filteredDays.appointments.filter(d => d.id === states.appointments);
  // console.log('==================================================>>>>>>>>>>>>', appointments)
  const listOfAppointmentObjs = []
  for (let appointmentId of appointments) {
    if (appointmentId in state.appointments) {
      listOfAppointmentObjs.push(state.appointments[appointmentId])
    }
  }
  // let filteredList = filteredDays.appointments.filter(day => {
  //   return day === filteredDays.id;
  // })
  console.log('lllllllllllllllllllllllllllllll=============================<>', listOfAppointmentObjs)
  return listOfAppointmentObjs
}
else {
  return [];
}
}

