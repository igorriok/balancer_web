import React, {CSSProperties, useState} from 'react';
import {useAuth} from "../use-auth";
import "./TaskPage.css";
import axios from "axios";
import {Task} from "../entities/Task";

const SAVE_TASK_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/savetask' :
	'http://178.168.41.217:5037/savetask';

const groupList: string[] = ['solonari', 'daniliuc', 'igor+ida'];

interface StylesDictionary {
	[Key: string]: CSSProperties;
}
const styles: StylesDictionary = {
	taskPage: {
		position: "fixed",
		zIndex: 1, /* Sit on top */
		left: 0,
		top: 0,
		width: "100%", /* Full width */
		height: "100%", /* Full height */
		overflow: "auto", /* Enable scroll if needed */
		backgroundColor: 'rgba(21,33,60,0.8)',
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		//paddingTop: '5%'
	},
	container: {
		//padding: '0% 25% 5% 25%',
		padding: '0 1% 0 1%',
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(254, 254, 254, 0.9)',
		margin: '5% 0 0 0',
		border: '1px solid #888',
		width: '95%',
		maxWidth: '600px',
		//minWidth: '400px',
		borderRadius: '8px',
	},
	title: {
		margin: '0',
	}
}


interface TaskPageProps {
	setShowTaskDialog: any;
	setTaskList: any;
	task: Task;
}

export default function TaskPage(props: TaskPageProps) {
	
	const { setShowTaskDialog, setTaskList, task } = props;
	let auth: any = useAuth();
	const [ taskName, setTaskName ] = useState<string>(task.taskName);
	const [ groupName, setGroupName ] = useState<string>(task.groupName);
	
	//console.log(taskName);
	
	async function saveTask(event: any) {
		
		event.preventDefault();
		
		console.log(taskName);
		console.log(groupName);
		
		setShowTaskDialog(false);
		
		await axios.post(SAVE_TASK_URL,
			{taskName: taskName, groupName: groupName},
			{ headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${auth.user.token}`
				},
			}).then((response) => {
				console.log(response);
				setTaskList(response.data);
			}).catch(error => {
				console.error('Error:', error);
			});
	}
	
	
	//console.dir(auth.user.token);
	
	return (
		<div id="taskPage" style={styles.taskPage}>
			
			<form onSubmit={saveTask} style={styles.container} autoComplete="on">
				
				<div className={"closeRow"}>
					<div
						//style={styles.closeButton}
						className={"close"}
						title="Close"
						onClick={() => setShowTaskDialog(false)}
					>
						<i className="material-icons">clear</i>
					</div>
				</div>
			
				<h1 style={styles.title}>New task</h1>
				
				<label htmlFor="taskName">
					<b>Task name: </b>
					<input
						type="text"
						placeholder="Enter task name"
						name="taskName"
						required
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
					/>
				</label>
				
				<label htmlFor="groupName">
					<b>Group: </b>
					<select
						placeholder="Select group name"
						name="groupName"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
					>
						<option value=""/>
						{
							groupList.map(group => {
								return (
									<option value={group} key={group}>
										{group}
									</option>
								)
							})
						}
					</select>
				</label>
				
				<button type="submit" className="confirmButton">
					Done
				</button>
			</form>
			
		</div>
	)
}
