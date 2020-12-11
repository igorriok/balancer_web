import React, {CSSProperties} from 'react';
import {useAuth} from "../use-auth";


const styles: StylesDictionary = {
	taskPage: {
		position: "fixed",
		zIndex: 1, /* Sit on top */
		left: 0,
		top: 0,
		width: "100%", /* Full width */
		height: "100%", /* Full height */
		overflow: "auto", /* Enable scroll if needed */
		backgroundColor: "#474e5d",
		paddingTop: 50
	},
	closeButton: {
		position: 'absolute',
		right: '35px',
		top: '15px',
		fontSize: '40px',
		fontWeight: 'bold',
		color: '#f1f1f1',
	}
}


interface TaskPageProps {
	setShowTaskDialog: any;
}


export default function TaskPage(props: TaskPageProps) {
	
	const { setShowTaskDialog } = props;
	let auth: any = useAuth();
	
	
	//console.dir(auth.user.token);
	
	return (
		<div id="taskPage" style={styles.taskPage}>
			
			<span
				style={styles.closeButton}
				title="Close Modal"
				onClick={() => setShowTaskDialog(false)}
			>
				&times;
			</span>
			
			<div className="container">
				
				<h1>New task</h1>
				
				<label htmlFor="email"><b>Email</b></label>
				<input type="text" placeholder="Enter Email" name="email" required/>
				
				<label htmlFor="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" required/>
				
				<label htmlFor="psw-repeat"><b>Repeat Password</b></label>
				<input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
				
				
				<div className="clearfix">
					
					<button
						type="button"
						className="cancelbtn"
					>
						Cancel
					</button>
					
					<button type="submit" className="signupbtn">Save</button>
				</div>
			</div>
		</div>
	)
}


interface StylesDictionary {
	[Key: string]: CSSProperties;
}