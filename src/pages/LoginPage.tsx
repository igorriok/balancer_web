import React, {useState} from 'react';


const LOGIN_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:2010/crit/bridgedeck/getusername' :
	'http://localhost:2010/crit/bridgedeck/getusername';
	


export default function LoginPage() {
	
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
		<div id={'loginPage'}>
			<form onSubmit={sendCredentials} autoComplete="on">
				<div className="container">
					<label htmlFor="uname">
						<b>
							Username
						</b>
					</label>
					<input
						type="text"
						placeholder="Enter Username"
						name="uname"
						required
						value={username}
						onChange={handleUsername}
					/>
				
					<label htmlFor="psw">
						<b>
							Password
						</b>
					</label>
					<input
						type="password"
						placeholder="Enter Password"
						name="psw"
						required
						value={password}
						onChange={handlePassword}
					/>
					
					<button type="submit">
						Login
					</button>
					
					<label>
						<input type="checkbox" checked={checkBox} name="remember" onChange={handleCheckBox}/> Remember me
					</label>
					
				</div>
			</form>
		</div>
	);
}