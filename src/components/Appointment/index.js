import React from "react";
import './styles.scss';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';
import Confirm from './Confirm.js';
import Status from './Status.js';



export default function Appointment(props) {
 return <article className="appointment">
  <Header time={props.time} />
     {props.interview ?  <Show  
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          />: <Empty />}
    
    </article>
}