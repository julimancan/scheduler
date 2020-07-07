import React from "react";
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss";
import classNames from 'classnames';



export default function InterviewerList(props) {
  const interviewer = props.Interviewers.map(Interviewer => {
    return (
     <InterviewerListItem 
     interviewers={interviewers}
     interviewer={3}
     setInterviewer={action("setInterviewer")}

     />
    )
  })
  return <ul>{interviewer}</ul>
}