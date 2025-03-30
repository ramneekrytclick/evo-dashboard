export interface IAnnouncement {
	_id: string;
	title: string;
	description: string;
	roles: string[];
	image?: string | null;
	createdAt: string;
}
