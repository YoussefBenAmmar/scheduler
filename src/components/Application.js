import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import DayListItem from "./DayListItem";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";
import PropTypes from 'prop-types'






export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });


  // const setDay = day => setState({ ...state, day });

  // function bookInterview(id, interview) {
  //   return axios.put(`/api/appointments/${id}`, { interview }).then(() => {

  //     console.log(id, interview);

  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview }
  //     };

  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };

  //     setState({
  //       ...state,
  //       appointments
  //     });
  //   }
  //   );
  // }

  // function cancelInterview(id) {

  //   return axios.delete(`/api/appointments/${id}`).then(() => {

  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null,
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };

  //     setState({
  //       ...state,
  //       appointments
  //     });
  //   });    
  // }

  // useEffect(() => {
  //   Promise.all([
  //     axios.get(`http://localhost:8001/api/days`),
  //     axios.get(`http://localhost:8001/api/appointments`),
  //     axios.get(`http://localhost:8001/api/interviewers`),
  //   ]).then((all) => {
  //     setState(prev => ({
  //       ...prev,
  //       days: all[0].data,
  //       appointments: all[1].data,
  //       interviewers: all[2].data,
  //     }));
  //     console.log(all);
  //   });
  // }, []);

  const dailyAppointements = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointements.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
