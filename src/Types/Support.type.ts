export interface SupportTicketProps {
	_id?: string;
	user: {
		_id: string;
		name: string;
		email: string;
	};
	subject: string;
	message: string;
	status: "Open" | "Resolved" | "Closed";
	adminResponse?: string;
	createdAt: Date;
}
