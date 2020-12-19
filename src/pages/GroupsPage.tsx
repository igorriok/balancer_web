import React, {useEffect, useState} from 'react';
import {useAuth} from "../use-auth";
import axios from "axios";
import {Task} from "../entities/Task";
import GroupDialog from "./GroupDialog";


const GET_TASKS_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/tasks' :
	'http://178.168.41.217:5037/tasks';


interface DashboardProps {
	setPageTools: any;
}

export default function GroupsPage(props: DashboardProps) {
	
	let auth: any = useAuth();
	const { setPageTools } = props;
	const [ taskList, setTaskList ] = useState<Task[]>([]);
	const [ showTaskDialog, setShowTaskDialog ] = useState<boolean>(false);
	const [ task, setTask ] = useState<Task>({id: undefined, taskName: "", groupName: ""});
	
	//console.dir(auth.user.token);
	
	//TODO: Add page for groups
	
	useEffect(() => {
		
		axios.get(GET_TASKS_URL,
			{
				headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${auth.user.token}`
				},
			}).then((response) => {
				console.log(response);
				
				setTaskList(response.data);
				//return response.data;
			}).catch(error => {
				console.error('Error:', error);
			});
	
	},[auth.user.token]);
	
	useEffect(() => {
		
		setPageTools([
			<button
				className="btn"
				key={"addButton"}
				onClick={() => openTaskDialog({id: undefined, taskName: "", groupName: ""})}
			>
				<i className="material-icons">add</i>
			</button>
		]);
		
	},[setPageTools, showTaskDialog]);
	
	
	const openTaskDialog = (task: Task) => {
		//console.dir(task);
		setTask(task);
		setShowTaskDialog(true);
	}
	
	
	return (
		<div>
			<h2>
				Groups
			</h2>
			
			<ul>
				{
					taskList.map((task: Task) =>
							<li
								key={task.id}
								onClick={() => openTaskDialog(task)}
							>
								{task.taskName}
							</li>
					)
				}
			</ul>
			
			{
				showTaskDialog
				&& (
					<GroupDialog
						setShowGroupDialog={setShowTaskDialog}
						setGroupList={setTaskList}
						group={task}
					/>
					)
			}
		</div>
	)
}