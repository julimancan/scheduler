import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useApplicationData(props) {
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
      .then(all => {
        // debugger
        // console.log('---------', getInterviewers)
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
        setDay("Monday")
      })
      .catch(err => Promise.reject(err))
  }, []);

  function updateSpots() {
    axios.get("/api/days")
    .then((response) => {
        setState(prev => ({ ...prev, days: response.data }))
      })
      .catch(err => Promise.reject(err))
  };

  const setDay = day => setState(prev => ({ ...prev, day }));

  function bookInterview(id, interview) {
    // console.log('==========================>', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then(() => {
          setState({ ...state, appointments })
          updateSpots()
        })
        .catch(err => Promise.reject(err))
    )
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          setState({ ...state, appointments })
          updateSpots()
        })
        .catch((error) => {
          return Promise.reject(error);
        })
    );
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}