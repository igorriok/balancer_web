import React from 'react';
import {useAuth} from "../use-auth";


export default function Dashboard() {
	
	let auth: any = useAuth();
	
	console.dir(auth.token);
	
	return (
		<h2>
			Dashboard
		</h2>
	)
}