import React from 'react';
import "./Toast.css";
import ReactDOM from "react-dom";


export default function notify(message: string = "Toast", interval: number = 1): void {
	
	const rootElement = document.getElementById('root');
	const container = document.createElement('div');
	container.classList.add("toast-container");
	
	document.body.appendChild(container);
	
	if (rootElement) {
		ReactDOM.render(
			<Toast
				container={container}
				message={message}
			/>,
			container
		);
	}
	
	// Auto remove the toast container
	const removeToast = () => {
		document.body.removeChild(container);
	}
	setTimeout(removeToast, interval * 1000);
}


interface ToastProps {
	container: any;
	message: string;
}


const Toast = (props: ToastProps) => {
	
	const { message } = props;
	
	//console.log('toast');
	
	return (
		<div className="notification-container">
			<div>
				<p className="notification-title">
					{ message }
				</p>
			</div>
		</div>
	);
}