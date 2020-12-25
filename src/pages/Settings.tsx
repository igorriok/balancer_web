import React, {CSSProperties, useEffect, useState} from 'react';
import {useAuth} from "../use-auth";
import axios from "axios";


const POST_NICKNAME_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/nickname' :
	'http://178.168.41.217:5037/nickname';
const GET_NICKNAME_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/nickname' :
	'http://178.168.41.217:5037/nickname';

interface StylesDictionary {
	[Key: string]: CSSProperties;
}
const styles: StylesDictionary = {
	taskPage: {
		width: "100%", /* Full width */
		height: "100%", /* Full height */
		overflow: "auto", /* Enable scroll if needed */
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
	title: {
		margin: '0 0 2vh 0',
	}
}




export default function Settings() {
	
	let auth: any = useAuth();
	const [ nickName, setNickName ] = useState<string>("");
	
	
	useEffect(() => {
		
		axios.get(GET_NICKNAME_URL,
			{
				headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${auth.user.token}`
				},
			}).then((response) => {
			//console.log(response);
			setNickName(response.data);
		}).catch(error => {
			console.error('Error:', error);
		});
		
	},[auth.user.token]);
	
	
	async function saveNickName(event: any) {
		
		event.preventDefault();
		
		console.log(nickName)
		
		await axios.post(POST_NICKNAME_URL,
			nickName,
			{ headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${auth.user.token}`
				},
				params: {
					nickname: nickName
				}
			}).then((response) => {
			
			console.log(response);
			
			setNickName(response.data);
			
		}).catch(error => {
			console.error('Error:', error);
		});
	}
	
	
	return (
		<div id="taskPage" style={styles.taskPage}>
			
			<form onSubmit={saveNickName} style={styles.container} autoComplete="on">
				
				<h1 style={styles.title}>
					Settings
				</h1>
				
				<label htmlFor="nickName">
					<b>Nickname: </b>
					<input
						type="text"
						placeholder="Enter nick name"
						name="nickName"
						required
						value={nickName}
						onChange={(e) => setNickName(e.target.value)}
					/>
				</label>
				
				<button type="submit" className="confirmButton">
					Save
				</button>
			</form>
		
		</div>
	)
}