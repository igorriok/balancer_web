import React, {useState} from 'react';


const sendCredentials = (event: any) => {
	console.log(event);
	event.preventDefault();
}


export default function LoginPage() {
	
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	
	const handleUsername = (event: any) => {
		setUsername(event.target.value)
	}
	
	const handlePassword = (event: any) => {
		setPassword(event.target.value);
	}

	return (
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
					<input type="checkbox" checked={true} name="remember"/> Remember me
				</label>
				
			</div>
		</form>
	);
}