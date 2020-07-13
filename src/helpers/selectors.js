export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((d) => d.name === day);
  if (filteredDay.length === 0) {
    return [];
  }
  const answer = filteredDay[0].appointments.map(
    (id) => state.appointments[id]
  );
  return filteredDay[0].appointments.map((id) => state.appointments[id]);
}

export function getInterview(state, day) {
  const interviewers = state.interviewers;
  if (day && interviewers[day.interviewer]) {
    const interviewWithData = {
      ...day,
      interviewer: interviewers[day.interviewer],
    };
    return interviewWithData;
  } else {
    return null;
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find((d) => d.name === day);
  if (!filteredDay || filteredDay.appointments.length === 0) {
    return [];
  }

  return filteredDay.interviewers.map((id) => state.interviewers[id]);
}
