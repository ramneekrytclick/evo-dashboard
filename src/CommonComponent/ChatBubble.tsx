// ======================= UPDATED: ChatMessageBubble.tsx =======================
import { Badge, Button } from "reactstrap";
import { format } from "date-fns";

const ChatMessageBubble = ({ msg, isMe, isOnline, onPin }: any) => {
	return (
		<div
			className={`d-flex flex-column mb-3 ${
				isMe ? "align-items-end" : "align-items-start"
			}`}>
			<div
				className={`px-4 py-3 shadow-sm ${
					isMe ? "bg-dark text-white" : "bg-white text-dark border"
				}`}
				style={{
					maxWidth: "80%",
					borderTopLeftRadius: "16px",
					borderTopRightRadius: "16px",
					borderBottomLeftRadius: isMe ? "16px" : "0px",
					borderBottomRightRadius: isMe ? "0px" : "16px",
					backgroundColor: isMe ? "#212529" : "#fff",
				}}>
				<div className='d-flex align-items-center flex-wrap gap-2 mb-2'>
					<span
						className={`fw-semibold ${isMe ? "text-warning" : "text-primary"}`}>
						{msg.sender?.name}
					</span>

					{!isMe && (
						<span
							className='rounded-circle d-inline-block'
							style={{
								width: "10px",
								height: "10px",
								backgroundColor: isOnline ? "#28a745" : "#6c757d",
							}}
						/>
					)}

					{msg.senderType === "mentor" && (
						<Badge
							color='info'
							pill>
							Mentor
						</Badge>
					)}
					{onPin && (
						<Button
							size='sm'
							color='link'
							onClick={() => onPin(msg._id)}
							className='text-warning text-decoration-none p-0'>
							📌 Pin
						</Button>
					)}
				</div>

				<div
					className={`fw-semibold ${isMe ? "text-end" : "text-start"} fs-5`}
					style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
					{msg.message}
				</div>

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
