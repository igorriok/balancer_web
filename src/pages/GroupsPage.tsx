import React, {useEffect, useState} from 'react';
import {useAuth} from "../use-auth";
import axios from "axios";
import GroupDialog from "./GroupDialog";
import {Group} from "../entities/Group";


const GET_TASKS_URL = process.env.NODE_ENV !== "production" ?
	'http://localhost:5037/groups' :
	'http://178.168.41.217:5037/groups';


interface DashboardProps {
	setPageTools: any;
	setPageName: any;
}

export default function GroupsPage(props: DashboardProps) {
	
	let auth: any = useAuth();
	const { setPageTools, setPageName } = props;
	const [ groupList, setGroupList ] = useState<Group[]>([]);
	const [ showGroupDialog, setShowGroupDialog ] = useState<boolean>(false);
	const [ group, setGroup ] = useState<Group>({id: undefined, groupName: "", participants: []});
	
	
	useEffect(() => {
		
		setPageName(
			<h3 className={"pageName"}>
				Groups
			</h3>
		);
		
		return () => {
			setPageName(<div/>);
		}
		
	},[]);
	
	useEffect(() => {
		
		axios.get(GET_TASKS_URL,
			{
				headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${auth.user.token}`
				},
			}).then((response) => {
				console.log(response);
				
				setGroupList(response.data);
				//return response.data;
			}).catch(error => {
				console.error('Error:', error);
			});
	
	},[auth.user.token]);
	
	useEffect(() => {
		
		setPageTools([
			<button
				className="btn"
				key={"addButton"}
				onClick={() => openGroupDialog({ id: undefined, groupName: "", participants: [] })}
			>
				<i className="material-icons">add</i>
			</button>
		]);
		
	},[setPageTools, showGroupDialog]);
	
	
	const openGroupDialog = (group: Group) => {
		//console.dir(task);
		setGroup(group);
		setShowGroupDialog(true);
	}
	
	
	return (
		<div>
			
			<div>
				{
					groupList.map((group: Group) =>
							<h5
								key={group.id}
								onClick={() => openGroupDialog(group)}
							>
								{group.groupName}
							</h5>
					)
				}
			</div>
			
			{
				showGroupDialog
				&& (
					<GroupDialog
						setShowGroupDialog={setShowGroupDialog}
						setGroupList={setGroupList}
						group={group}
					/>
					)
			}
		</div>
	)
}