import React, {useEffect, useState} from 'react';
import {useAuth} from "../use-auth";
import axios from "axios";
import {Task} from "../entities/Task";
import TaskPage from "./TaskPage";


const GET_TASKS_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/tasks' :
	'http://178.168.41.217:5037/tasks';


interface DashboardProps {
	setPageTools: any;
}

export default function Dashboard(props: DashboardProps) {
	
	let auth: any = useAuth();
	const { setPageTools } = props;
	const [ taskList, setTaskList ] = useState<Task[]>([]);
	const [ showTaskDialog, setShowTaskDialog ] = useState<boolean>(false);
	
	//console.dir(auth.user.token);
	
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
				onClick={() => setShowTaskDialog(!showTaskDialog)}
			>
				<i className="material-icons">add</i>
			</button>
		]);
		
	},[setPageTools, showTaskDialog]);
	
	
	return (
		<div>
			<h2>
				Dashboard
			</h2>
			
			<ul>
				{
					taskList.map((task: Task) =>
							<li key={task.id}>
								{task.taskName}
							</li>
					)
				}
			</ul>
			
			{
				showTaskDialog && (<TaskPage setShowTaskDialog={setShowTaskDialog}/>)
			}
		</div>
	)
}