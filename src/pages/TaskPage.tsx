import React, {CSSProperties} from 'react';
import {useAuth} from "../use-auth";
import "./TaskPage.css"

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
		paddingTop: '50px'
		
	},
	container: {
		padding: '% 25% 5% 25%',
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: 'rgba(254, 254, 254, 0.9)',
		margin: '5% auto 15% auto', /* 5% from the top, 15% from the bottom and centered */
		border: '1px solid #888',
		width: '30%',
		maxWidth: '600px',
		minWidth: '400px',
		borderRadius: '4px',
	}
}


interface TaskPageProps {
	setShowTaskDialog: any;
}


export default function TaskPage(props: TaskPageProps) {
	
	const { setShowTaskDialog } = props;
	let auth: any = useAuth();
	
	
	async function saveTask(event: any) {
		
		event.preventDefault();
		
		
		await fetch("", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			//body: JSON.stringify({email: email, password: password}),
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
			
			
			<form onSubmit={saveTask} style={styles.container}>
			
				<h1>New task</h1>
				
				<label htmlFor="taskName">
					<b>Task name: </b>
					<input type="text" placeholder="Enter task name" name="taskName" required/>
				</label>
				
				<label htmlFor="groupName">
					<b>Group: </b>
					<select placeholder="Select group name" name="groupName">
						<option value="volvo">Volvo</option>
						<option value="saab">Saab</option>
						<option value="opel">Opel</option>
						<option value="audi">Audi</option>
					</select>
				</label>
				
				<button type="submit" className="confirmButton">
					Done
				</button>
			</form>
			
		</div>
	)
}
