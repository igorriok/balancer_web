import React from 'react';

export default function LoginPage() {
	
	

	return (
		<form method="post">
			<div className="container">
				<label htmlFor="uname"><b>Username</b></label>
				<input type="text" placeholder="Enter Username" name="uname" required/>
					
				<label htmlFor="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" required/>
				
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