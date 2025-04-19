import { Badge, Button } from "reactstrap";
import { format } from "date-fns";

const ChatMessageBubble = ({ msg, isMe, isOnline, onPin }: any) => {
	return (
		<div
			className={`d-flex flex-column mb-4 ${
				isMe ? "align-items-end" : "align-items-start"
			}`}>
			<div
				className={`px-4 py-3 shadow-sm position-relative ${
					isMe ? "bg-dark text-white" : "bg-white border text-dark"
				}`}
				style={{
					maxWidth: "80%",
					borderRadius: "16px",
					borderTopLeftRadius: isMe ? "16px" : "0px",
					borderTopRightRadius: isMe ? "0px" : "16px",
					boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
				}}>
				{/* Header Info */}
				<div className='d-flex align-items-center flex-wrap gap-2 mb-2'>
					<span
						className={`fw-semibold fs-6 ${
							isMe ? "text-info" : "text-primary"
						}`}>
						{msg.sender?.name}
					</span>

					{!isMe && (
						<span
							className='rounded-circle d-inline-block'
							title={isOnline ? "Online" : "Offline"}
							style={{
								width: "10px",
								height: "10px",
								backgroundColor: isOnline ? "#10B981" : "#9CA3AF",
							}}
						/>
					)}

					{msg.senderType === "mentor" && (
						<Badge
							color='info'
							pill
							className='px-2 py-1'>
							Mentor
						</Badge>
					)}

					{onPin && (
						<Button
							size='sm'
							color='link'
							onClick={() => onPin(msg._id)}
							className='text-warning text-decoration-none p-0 ms-auto'>
							📌 Pin
						</Button>
					)}
				</div>

				{/* Message Body */}
				<div
					className={`fw-semibold ${isMe ? "text-end" : "text-start"} fs-5`}
					style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
					{msg.message}
				</div>

				{/* Timestamp */}
				<small
					className={`d-block mt-2 text-end ${
						isMe ? "text-white-50" : "text-muted"
					}`}>
					{format(new Date(msg.timestamp), "hh:mm a")}
				</small>
			</div>
		</div>
	);
};

export default ChatMessageBubble;
