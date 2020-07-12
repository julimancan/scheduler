import React from "react";
import './styles.scss';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';
import Form from './Form.js';
import Confirm from './Confirm.js';
import Status from './Status.js';
import Error from './Error.js';
import useVisualMode from '../../hooks/useVisualMode'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE ";


export default function Appointment(props) {
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);
		
	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		
		// props.spots
		transition(SAVING)
		props.bookInterview(props.id, interview)
			.then(() => transition(SHOW))
			.catch(err => transition(ERROR_SAVE, true))
	}

	function deleting() {

		transition(DELETING)
		props.cancelInterview(props.id)
			.then(() => {
				// debugger
				transition(EMPTY)

			})
			.catch(err => transition(ERROR_DELETE, true))
	}

	// const formatSpots = (props) => {
	// 	//  return props.spots === 0 ? "no spots remaining" :
	// 	//  props.spots === 1 ? "1 spot remaining": 
	// 	//  `${props.spots} spots remaining`
		
	// 		if (props.spots === 0 ) {
	// 			return "no spots remaining"
	// 		} else if (props.spots === 1) {
	// 		 return "1 spot remaining" 
	// 		} else {
	// 			return `${props.spots} spots remaining`
	// 		} 
			
	// 	}

		// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", props.state)
	return <article className="appointment">

		<Header time={props.time} />
		{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
		{mode === SHOW && (
			<Show
				student={props.interview.student}
				interviewer={props.interview.interviewer.name}
				onEdit={() => transition(EDITING)}
				onDelete={() => transition(CONFIRM)}
			/>
		)}

		{mode === CREATE && (
			<Form
				name={props.name ? props.name : ""}
				onCancel={back}
				onSave={save} 
				interviewers={props.interviewers}
			/>
		)}

		{mode === SAVING && (
			<Status
				message="Saving"
			/>
		)}

		{mode === DELETING && (
			<Status
				message="Deleting"
			/>
		)}

		{mode === CONFIRM && (
			<Confirm
				message="Are you sure you want to delete your appointment?"
				onCancel={back}
				onConfirm={deleting}
			/>
		)}
		{mode === EDITING && (
			<Form
				name={props.interview.student}
				onCancel={back}
				onSave={save}
				interviewers={props.interviewers}
				interviewer={props.interview.interviewer.id}
			/>
		)}
		{mode === ERROR_DELETE && (
			<Error
				message="Could not delete appointment!"
				onClose={back}
			/>
		)}
		{mode === ERROR_SAVE && (
			<Error
				message="Could not save appointment!"
				onClose={back}
			/>
		)}
		{/* {props.interview ? <Show

			student={props.interview.student}
			interviewer={props.interview.interviewer.name}
			onEdit={props.onEdit}
			onDelete={props.onDelete}
		/> : <Empty />} */}

	</article>
}