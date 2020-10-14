import React, {useState} from 'react';


const LOGIN_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:2010/crit/bridgedeck/getusername' :
	'http://localhost:2010/crit/bridgedeck/getusername';
	


export default function SignupPage() {
	
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [checkBox, setCheckBox] = useState<boolean>(true);
	
	const handleCheckBox = (event: any) => {
		console.log(event.target.checked);
		setCheckBox(event.target.checked);
	}
	
	
	async function sendCredentials() {
		await fetch(LOGIN_URL, {
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
			
				<form className="modal-content">
					
					<div className="container">
						
						<h1>Sign Up</h1>
						
						<p>Please fill in this form to create an account.</p>
						
						<br/>
						
						<label htmlFor="email"><b>Email</b></label>
						<input
							type="text"
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
						
						<label htmlFor="psw-repeat">
							<b>Repeat Password</b>
						</label>
						<input
							type="password"
							placeholder="Repeat Password"
							name="psw-repeat"
							required
						/>
						
						<label>
							<input
								type="checkbox"
								checked={true}
								name="remember"
							>
								Remember me
							</input>
						</label>
						
						<p>By creating an account you agree to our
							<a href="#">
								Terms & Privacy
							</a>
							.
						</p>
						
						<div className="clearfix">
							<button
								type="button"
								className="cancelbtn"
							>
								Cancel
							</button>
							
							<button
								type="submit"
								className="signupbtn"
							>
								Sign Up
							</button>
						</div>
					</div>
				</form>
		</div>
	);
}