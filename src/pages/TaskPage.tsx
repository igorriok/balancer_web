import React, {CSSProperties, useState} from 'react';
import {useAuth} from "../use-auth";
import "./TaskPage.css"


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
		justifyContent: "flex-start",
		alignItems: "center",
		//paddingTop: '5%'
		
	},
	container: {
		//padding: '0% 25% 5% 25%',
		padding: '1%',
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: 'rgba(254, 254, 254, 0.9)',
		margin: '5% 0 0 0',
		border: '1px solid #888',
		width: '20%',
		maxWidth: '600px',
		minWidth: '400px',
		borderRadius: '8px',
	}
}


interface TaskPageProps {
	setShowTaskDialog: any;
}

export default function TaskPage(props: TaskPageProps) {
	
	const { setShowTaskDialog } = props;
	let auth: any = useAuth();
	const [ taskName, setTaskName ] = useState<string>('');
	const [ groupName, setGroupName ] = useState<string>('');
	
	
	async function saveTask(event: any) {
		
		event.preventDefault();
		
		console.log(taskName);
		console.log(groupName);
		
		await fetch("", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({taskName: taskName, groupName: groupName}),
		}).then((response) => {
			console.log(response);
			return response.text();
		}).then((data) => {
			console.log(data);
			
		}).catch(error => {
			console.error('Error:', error);
		});
	}
	
	
	//console.dir(auth.user.token);
	
	return (
		<div id="taskPage" style={styles.taskPage}>
			
			<button
				//style={styles.closeButton}
				className={"close"}
				title="Close"
				onClick={() => setShowTaskDialog(false)}
			>
				&times;
			</button>
			
			
			<form onSubmit={saveTask} style={styles.container} autoComplete="on">
			
				<h1>New task</h1>
				
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
