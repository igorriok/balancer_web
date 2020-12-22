import React, {CSSProperties, FormEvent, useState} from 'react';
import {useAuth} from "../use-auth";
import "./TaskPage.css";
import axios from "axios";
import {Group} from "../entities/Group";



const SAVE_GROUP_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/savegroup' :
	'http://178.168.41.217:5037/savegroup';
const DELETE_GROUP_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/deletegroup/' :
	'http://178.168.41.217:5037/deletegroup/';


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


interface GroupsPageProps {
	setShowGroupDialog: any;
	setGroupList: any;
	group: Group;
}

export default function GroupDialog(props: GroupsPageProps) {
	
	const { setShowGroupDialog, setGroupList, group } = props;
	let auth: any = useAuth();
	const [ groupName, setGroupName ] = useState<string>(group.groupName);
	
	//console.log(taskName);
	
	async function saveGroup(event: FormEvent) {
		
		event.preventDefault();
		
		console.log(groupName);
		
		setShowGroupDialog(false);
		
		await axios.post(SAVE_GROUP_URL,
			{groupName: groupName},
			{ headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${auth.user.token}`
				},
			}).then((response) => {
				console.log(response);
				setGroupList(response.data);
			}).catch(error => {
				console.error('Error:', error);
			});
	}
	
	async function deleteGroup() {
		
		setShowGroupDialog(false);
		
		await axios.delete(DELETE_GROUP_URL + group.id,
			{ headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${auth.user.token}`
				},
			}).then((response) => {
			console.log(response);
			setGroupList(response.data);
		}).catch(error => {
			console.error('Error:', error);
		});
	}
	
	
	//console.dir(auth.user.token);
	
	return (
		<div id="taskPage" style={styles.taskPage}>
			
			<form onSubmit={saveGroup} style={styles.container} autoComplete="on">
				
				<div className={"toolBar"}>
					
					<div
						//style={styles.closeButton}
						className={"close"}
						title="Delete"
						onClick={() => deleteGroup()}
					>
						<i className="material-icons">delete</i>
					</div>
					
					<div
						//style={styles.closeButton}
						className={"close"}
						title="Close"
						onClick={() => setShowGroupDialog(false)}
					>
						<i className="material-icons">clear</i>
					</div>
					
				</div>
			
				<h1 style={styles.title}>
					Group
				</h1>
				
				<label htmlFor="groupName">
					<b>Group name: </b>
					<input
						type="text"
						placeholder="Enter group name"
						name="groupName"
						required
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
					/>
				</label>
				
				<div id={"participants"}>
					{
						// TODO: list of participants
					}
				</div>
				
				<button type="submit" className="confirmButton">
					Save
				</button>
			</form>
			
		</div>
	)
}
