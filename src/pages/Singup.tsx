import React, {useState} from 'react';


const SIGNUP_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:3057/balancer/signup' :
	'http://localhost:3057/balancer/signup';
	


export default function SignupPage() {
	
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	
	
	async function sendCredentials() {
		await fetch(SIGNUP_URL, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username: username, password: password}),
		}).then((response) => {
			return response.json();
		}).then((data) => {
			console.dir(data);
		});
	}
	
	const handleUsername = (event: any) => {
		setUsername(event.target.value)
	}
	
	const handlePassword = (event: any) => {
		setPassword(event.target.value);
	}
	

	return (
		<div id={'signupPage'}>
			
				<form onSubmit={sendCredentials} autoComplete="on">
						
					<h1>Sign Up</h1>
					
					<p>Please fill in this form to create an account.</p>
					
					<br/>
					
					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input
						type="email"
						placeholder="Enter Email"
						name="email"
						required
					/>
					
					<label htmlFor="psw">
						<b>Password</b>
					</label>
					<input
						type="password"
						placeholder="Enter Password"
						name="psw"
						required
					/>
					
					{/*<p>
						By creating an account you agree to our
						<a href="#">
							Terms & Privacy
						</a>
						.
					</p>*/}
					
					<button
						type="submit"
						className="signupbtn"
					>
						Sign Up
					</button>
				</form>
		</div>
	);
}