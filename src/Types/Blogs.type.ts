export interface BlogProps {
	_id?: string;
	title: string;
	content: string;
	creator?: { _id: string; name: string; email: string };
	status?: string;
	createdAt?: string;
}
