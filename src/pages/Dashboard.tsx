import React, {useEffect, useState} from 'react';
import {useAuth} from "../use-auth";
import axios from "axios";
import {Task} from "../entities/Task";


const GET_TASKS_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/tasks' :
	'http://178.168.41.217:5037/tasks';


export default function Dashboard() {
	
	let auth: any = useAuth();
	
	const [ taskList, setTaskList ] = useState<Task[]>([]);
	
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
	
	
	return (
		<div>
			<h2>
				Dashboard
			</h2>
			
			<ul>
				{
					taskList.map((task: Task) =>
							<li>
								{task.taskName}
							</li>
					)
				}
			</ul>
		</div>
	)
}