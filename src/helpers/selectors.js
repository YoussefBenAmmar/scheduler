export function getAppointmentsForDay(state, dayName) {
  const result = [];
  const day = state.days.filter(day => day.name === dayName);
  if (day.length > 0) {
    const appointmentIds = day[0].appointments;

    for (let appointmentId of appointmentIds) {
      result.push(state.appointments[appointmentId])
    }
  }
  return result;
};

export function getInterviewersForDay(state, dayName) {
  const result = [];
  const day = state.days.filter(day => day.name === dayName);
  let interviewIds;

  if (day.length > 0) {
    interviewIds = day[0].interviewers;

    for (let interviewId of interviewIds) {
      result.push(state.interviewers[interviewId])
    }
  }
  return result;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}