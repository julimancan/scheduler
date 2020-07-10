import React from "react";
import './styles.scss';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';
import Form	 from './Form.js';
import Confirm from './Confirm.js';
import Status from './Status.js';
import useVisualMode from '../../hooks/useVisualMode'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const interviewers = [];


export default function Appointment(props) {
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	return <article className="appointment">

		<Header time={props.time} />
		{mode === EMPTY && <Empty onAdd={() => transition(CREATE)
																		//  transition(CREATE)
										
																		 } />}
		{mode === SHOW && (
			<Show
				student={props.interview.student}
				interviewer={props.interview.interviewer.name}
				onEdit={props.onEdit}
				onDelete={props.onDelete}

			/>
		)}

{mode === CREATE && (
			<Form
				name={props.name ? props.name : ""}
				onCancel={() => back()}
				onSave={() => transition(SHOW)}
				interviewers={[]}
				
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