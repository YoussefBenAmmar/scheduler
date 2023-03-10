import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Form from "./Form";
import Application from "components/Application";
import Error from "./Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const FORM = "FORM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {


  function save(name, interviewer){
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW);})
    .catch(() => transition(ERROR_SAVE, true));
  }

  function deleting(){
    transition(DELETING, true)

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => { transition(ERROR_DELETE, true);});  
    }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onCancel = () => {
    back()
  };


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />


      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} 
      onCancel={onCancel}
      onSave={save}
      />}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          message={"Are you sure you want to delete?"}
          onConfirm={deleting}
        />)}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={() => back(SHOW)}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Could not create appointment"}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment"}
          onClose={() => back()}
        />
      )}
    </article>

  );
}