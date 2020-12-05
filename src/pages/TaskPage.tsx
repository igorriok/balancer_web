import React from 'react';
import {useAuth} from "../use-auth";


export default function TaskPage() {
	
	let auth: any = useAuth();
	
	console.dir(auth.user.token);
	
	return (
		<h2>
			Dashboard
		</h2>
	)
}