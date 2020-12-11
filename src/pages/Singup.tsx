import React, {useState} from 'react';
import {useAuth} from "../use-auth";
import {useHistory, useLocation} from "react-router-dom";


const SIGNUP_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/signup' :
	'http://178.168.41.217:5037/signup';
	


export default function SignupPage() {
	
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const auth = useAuth();
	let location = useLocation();
	const history = useHistory();
	
	
	async function sendCredentials(event: any) {
		
		event.preventDefault();
		
		console.dir(email);
		console.dir(password);
		
		await fetch(SIGNUP_URL, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email: email, password: password}),
		}).then((response) => {
			console.log(response);
			return response.text();
		}).then((data) => {
			console.log(data);
			
			// @ts-ignore
			let { from } = location.state || { from: { pathname: "/" } };
			
			auth.signin(email, password, () => {
				// @ts-ignore
				history.replace(from);
			});
		}).catch(error => {
			console.error('Error:', error);
		});
	}
	
	const handleEmail = (event: any) => {
		setEmail(event.target.value)
	}
	
	const handlePassword = (event: any) => {
		setPassword(event.target.value);
	}
	

	return (
		<div id={'signupPage'}>
			
				<form onSubmit={sendCredentials} autoComplete="on" className='formContainer'>
						
					<h1>Sign Up</h1>
					
					<p>Please fill in this form to create an account.</p>
					
					<br/>
					
					<label htmlFor="email">
						<b>Email</b>
						<input
							type="email"
							placeholder="Enter Email"
							name="email"
							required
							onChange={(e) => handleEmail(e)}
						/>
					</label>
					
					<label htmlFor="psw">
						<b>Password</b>
						<input
							type="password"
							placeholder="Enter Password"
							name="psw"
							required
							onChange={(e) => handlePassword(e)}
						/>
					</label>
					
					{/*<p>
						By creating an account you agree to our
						<a href="#">
							Terms & Privacy
						</a>
						.
					</p>*/}
					
					<button type="submit" className="confirmButton">
						Sign Up
					</button>
				</form>
		</div>
	);
}