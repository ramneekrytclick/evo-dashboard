import { AxiosError } from "axios";

export interface IAnnouncement {
	_id?: string;
	title: string;
	message: string;
	roles: string[];
	createdAt: Date;
}
