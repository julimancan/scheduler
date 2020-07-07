import React, { useState } from "react";
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss";
import classNames from 'classnames';


const InterviewerList = props => {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


    return (
     <section className={"interviewers"}>
       <h4 className="interviewers__header">Interviewer</h4>
       <ul className="interviewers__list">
        {props.interviewers.map(interviewer => 
         <InterviewerListItem 
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.value}
          setInterviewer={event => props.setInterviewer(interviewer.id)}
         />)}
       </ul>
     </section>
    )
}

export default InterviewerList;