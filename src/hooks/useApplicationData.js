import { useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData(){ 

  ///*** Object State */

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      console.log(all);
    });
  }, []);


  const freeSpots = (state, appointments) => {
    const appointmentId = state.days.filter((day) => day.name === state.day);
    const appointmentsToday = appointmentId[0].appointments;

    const emptySpots = appointmentsToday.reduce((count, app) => {
      if (!appointments[app].interview) {
        return count + 1;
      }
      return count;
    }, 0);
    
    return emptySpots;
  }

  ///*** Function to set current day */

  const setDay = day => setState({ ...state, day });


  ///****  Function to make HTTP request to book an Interview */

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {

      console.log(id, interview);

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = [...state.days];
      const daysIndex = state.days.findIndex((day) => day.appointments.includes(id));
      const spots = freeSpots(state, appointments);
      const dayUpdate = { ...days[daysIndex], spots,};
      days[daysIndex] = dayUpdate;
      setState({
        ...state,
        appointments,
        days
      });
    }
    );
  }


  ///*** Function to make HTTP request to cancel an Interview */

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`).then(() => {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];
    const currentDayIndex = state.days.findIndex((day) => day.appointments.includes(id));
    const spots = freeSpots(state, appointments);
    const dayUpdate = { ...days[currentDayIndex], spots,};
    days[currentDayIndex] = dayUpdate;


      setState({
        ...state,
        appointments,
        days
      });
    });    
  }

  return {  state,
      setDay,
      bookInterview,
      cancelInterview}
}