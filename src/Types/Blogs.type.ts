export type BlogStatus = "Pending" | "Approved" | "Rejected";

export interface BlogCreator {
	_id: string;
	name: string;
	email: string;
}

export interface BlogProps {
	_id: string;
	title: string;
	content: string;
	tags: string[];
	image?: string;
	conclusion: string;
	status: BlogStatus;
	creator: BlogCreator;
	createdAt: string;
	slug?: string;
	updatedAt: string;
	__v?: number;
}
