import React, { Fragment } from "react";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props){

  return(
    <article className="appointment">
      <Header time={props.time}/>
      if ({props.interview}){
        <Show/>
      } else {
        <Empty/>
      }
      </article>
    
  );
}