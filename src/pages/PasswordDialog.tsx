import React, {CSSProperties, useEffect, useState} from 'react';
import {useAuth} from "../use-auth";
import "./TaskPage.css";
import axios from "axios";
import {Task} from "../entities/Task";
import {Group} from "../entities/Group";



const SAVE_PASSWORD_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/password' :
	'http://178.168.41.217:5037/password';


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
	setOpenPasswordDialog: any;
}

export default function PasswordDialog(props: TaskPageProps) {
	
	const { setOpenPasswordDialog } = props;
	let auth: any = useAuth();
	const [ password, setPassword ] = useState<string>("");
	const [ confirmPassword, setConfirmPassword ] = useState<string>("")
	
	
	async function savePassword(event: any) {
		
		event.preventDefault();
		
		if (password === confirmPassword) {
			
			setOpenPasswordDialog(false);
			
			await axios.post(SAVE_PASSWORD_URL,
				password,
				{
					headers: {
						"Accept": "application/json",
						Authorization: `Bearer ${auth.user.token}`
					},
				}).then((response) => {
				
				console.log(response);
				
			}).catch(error => {
				console.error('Error:', error);
			});
		} else {
			console.log("Passwords don't match");
			// TODO: display notification
		}
	}
	
	
	return (
		<div id="taskPage" style={styles.taskPage}>
			
			<form onSubmit={savePassword} style={styles.container} autoComplete="on">
				
				<div className={"toolBar"}>
					
					<div> </div>
					
					<div
						//style={styles.closeButton}
						className={"close"}
						title="Close"
						onClick={() => setOpenPasswordDialog(false)}
					>
						<i className="material-icons">clear</i>
					</div>
					
				</div>
			
				<h1 style={styles.title}>
					New password
				</h1>
				
				<input
					type="password"
					placeholder="Enter new password"
					name="taskName"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			
				<input
					type="password"
					placeholder="Confirm password"
					name="taskName"
					required
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				
				<button type="submit" className="confirmButton">
					Save
				</button>
			</form>
			
		</div>
	)
}
