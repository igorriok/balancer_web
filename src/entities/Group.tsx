import {Paticipant} from "./Paticipant";

export interface Group {
	id: number | undefined;
	groupName: string;
	participants: Paticipant[];
}