import React, {useState} from 'react';
import {Link, useHistory, useLocation } from 'react-router-dom';
import {useAuth} from "../use-auth";





export default function LoginPage() {
	
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [checkBox, setCheckBox] = useState<boolean>(true);
	const auth = useAuth();
	const history = useHistory();
	let location = useLocation();
	
	
	const handleCheckBox = (event: any) => {
		console.log(event.target.checked);
		setCheckBox(event.target.checked);
	}
	
	
	async function sendCredentials(event: any) {
		
		event.preventDefault();
		
		// @ts-ignore
		let { from } = location.state || { from: { pathname: "/" } };
		
		await auth.signin(username, password, () => {
			// @ts-ignore
			history.replace(from);
		});
	}
	
	const handleUsername = (event: any) => {
		setUsername(event.target.value)
	}
	
	const handlePassword = (event: any) => {
		setPassword(event.target.value);
	}

	return (
		<div className={'loginPage'}>
			
			<form onSubmit={sendCredentials} className='formContainer' autoComplete="on">
				
				{/*<div className="credentials">*/}
					
					<label htmlFor="uname">
						<b>
							Email
						</b>
					</label>
					<input
						type="email"
						placeholder="Enter Email"
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
					
					<button type="submit" className={'confirmButton'}>
						Login
					</button>
					
					<label>
						<input
							type="checkbox"
							checked={checkBox}
							name="remember"
							onChange={handleCheckBox}
						/>
						Remember me
					</label>
					
				{/*</div>*/}
			</form>
			
			<Link to="/signup">
				<button id={"signupButton"}>
					Signup
				</button>
			</Link>
			
		</div>
	);
}