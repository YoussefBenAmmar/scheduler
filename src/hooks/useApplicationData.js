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
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
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

      setState({
        ...state,
        appointments
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

      setState({
        ...state,
        appointments
      });
    });    
  }

  return {  state,
      setDay,
      bookInterview,
      cancelInterview}
}