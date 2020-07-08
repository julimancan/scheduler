import React from "react";



export default function DayList(props) {
  return (

<main className="appointment__add">
  <img onClick={props.onAdd}
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
  />
</main>

  )
}