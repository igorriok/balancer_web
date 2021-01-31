import React, {CSSProperties, useEffect, useState} from 'react';
import {useAuth} from "../use-auth";
import "./TaskPage.css";
import axios from "axios";
import {Task} from "../entities/Task";
import {Group} from "../entities/Group";



const SAVE_TASK_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/savetask' :
	'http://178.168.41.217:5037/savetask';
const GET_GROUPS_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/groups' :
	'http://178.168.41.217:5037/groups';
const DELETE_TASK_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/deletetask/' :
	'http://178.168.41.217:5037/deletetask/';


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
		margin: '0',
		border: '1px solid #888',
		width: '95%',
		maxWidth: '600px',
		//minWidth: '400px',
		borderRadius: '8px',
	},
}


interface TaskPageProps {
	setShowTaskDialog: any;
	setTaskList: any;
	task: Task;
}

export default function TaskDialog(props: TaskPageProps) {
	
	const { setShowTaskDialog, setTaskList, task } = props;
	let auth: any = useAuth();
	const [ taskName, setTaskName ] = useState<string>(task.taskName);
	const [ groupId, setGroupId ] = useState<number>(task.groupId);
	const [ groupList, setGroupList ] = useState<Group[]>([{id: 0, groupName: "", participants: []}]);
	
	//console.log(taskName);
	
	useEffect(() => {
		
		axios.get(GET_GROUPS_URL,
			{
				headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${auth.user.token}`
				},
			}).then((response) => {
			//console.log(response);
			setGroupList(response.data);
			//return response.data;
		}).catch(error => {
			console.error('Error:', error);
		});
		
	},[auth.user.token]);
	
	
	async function saveTask(event: any) {
		
		event.preventDefault();
		
		console.log(taskName);
		console.log(groupId);
		
		setShowTaskDialog(false);
		
		await axios.post(SAVE_TASK_URL,
			{taskName: taskName, groupId: groupId},
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
	
	const deleteTask = async () => {
		
		setShowTaskDialog(false);
		
		await axios.delete(DELETE_TASK_URL + task.id,
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
		<div id={"taskDialog"} style={styles.taskPage}>
			
			<form onSubmit={saveTask} style={styles.container} autoComplete="on">
				
				<div className={"toolBar"}>
					
					<div
						//style={styles.closeButton}
						className={"close"}
						title="Delete"
						onClick={() => deleteTask()}
					>
						<i className="material-icons">delete</i>
					</div>
					
					<div
						//style={styles.closeButton}
						className={"close"}
						title="Close"
						onClick={() => setShowTaskDialog(false)}
					>
						<i className="material-icons">clear</i>
					</div>
					
				</div>
			
				<h1 style={styles.title}>
					Task details
				</h1>
				
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
						value={groupId}
						// @ts-ignore
						onChange={(e) => setGroupId(e.target.value)}
					>
						<option value=""/>
						{
							groupList.map((group: Group) => {
								return (
									<option value={group.id} key={group.id}>
										{group.groupName}
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
