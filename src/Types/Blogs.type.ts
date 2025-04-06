export type BlogStatus = "Pending" | "Approved" | "Rejected";

export interface BlogProps {
	_id: string;
	title: string;
	content: string;
	tags?: string[]; // Optional, can be empty
	image?: string; // Optional, not always present
	conclusion: string;
	status: BlogStatus;
	creator: string;
	createdAt: string;
	updatedAt: string;
	__v?: number;
}
