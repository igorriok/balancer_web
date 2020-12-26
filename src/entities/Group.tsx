import {Participant} from "./Participant";

export interface Group {
	id: number | undefined;
	groupName: string;
	participants: Participant[];
}