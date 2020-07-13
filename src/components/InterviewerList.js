import React, { useState } from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

const InterviewerList = (props) => {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <section className={"interviewers"}>
      <h4 className="interviewers__header">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.value}
            setInterviewer={(event) => props.onChange(interviewer.id)}
          />
        ))}
      </ul>
    </section>
  );
};

export default InterviewerList;
