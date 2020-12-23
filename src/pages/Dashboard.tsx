import React, {useEffect, useState} from 'react';
import {useAuth} from "../use-auth";
import axios from "axios";
import {Task} from "../entities/Task";
import TaskPage from "./TaskPage";
import {Group} from "../entities/Group";


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
	const [ task, setTask ] = useState<Task>({id: 0, taskName: "", addedDate: new Date(Date.now()), groupId: 0, groupName: ""});
	const [ groupList, setGroupList ] = useState<Group[]>([{id: 0, groupName: "", participants: []}]);
	
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
			
				updateTaskList(response.data);
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
				onClick={() => openTaskDialog({id: 0, taskName: "", addedDate: new Date(Date.now()), groupId: 0, groupName: ""})}
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
	
	
	const updateTaskList = (tasks: Task[]) => {
		
		tasks.sort((a: Task, b: Task) => {
			return new Date(b.addedDate).valueOf() - new Date(a.addedDate).valueOf();
		});
		
		setTaskList(tasks);
		
		// filter unique groups from tasks list
		const groups: Group[] = tasks.map((task: Task) => {
			return { id: task.groupId, groupName: task.groupName, participants: [] };
		}).filter((value, index, self) => index === self.findIndex((group) => (
				group.id === value.id && group.groupName === value.groupName
			)));
		
		setGroupList(groups);
	}
	
	
	return (
		<div>
			<h2>
				Dashboard
			</h2>
			
			<div>
				{
					taskList.map((task: Task) =>
							<h5
								key={task.id}
								onClick={() => openTaskDialog(task)}
							>
								{task.taskName + " - " + task.groupName}
							</h5>
					)
				}
			</div>
			
			{
				showTaskDialog
				&& (
					<TaskPage
						setShowTaskDialog={setShowTaskDialog}
						setTaskList={updateTaskList}
						task={task}
						groupList={groupList}
					/>
					)
			}
		</div>
	)
}