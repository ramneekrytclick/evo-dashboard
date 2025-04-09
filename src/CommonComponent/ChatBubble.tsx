import { Badge } from "reactstrap";
import { format } from "date-fns";

const ChatMessageBubble = ({ msg, isMe, isOnline }: any) => {
	return (
		<div
			className={`d-flex flex-column mb-3 ${
				isMe ? "align-items-end" : "align-items-start"
			}`}>
			<div
				className={`px-3 py-2 rounded shadow-sm ${
					isMe ? "bg-dark text-white" : "bg-white text-dark border"
				}`}
				style={{
					maxWidth: "75%",
					borderRadius: "12px",
				}}>
				<div className="d-flex align-items-center gap-2 mb-1">
					<span
						className={`fw-semibold fs-6 ${
							isMe ? "text-warning" : "text-primary"
						}`}>
						{msg.sender?.name}
					</span>
					{!isMe && (
						<span
							className={`fs-6 d-flex align-items-center gap-1 ${
								isOnline ? "text-success" : "text-muted"
							}`}>
							●{" "}
							<h5
								className={`fs-6 ${
									isOnline ? "text-success" : "text-muted"
								} fw-light`}>
								{" "}
								{/* {isOnline ? "Online" : "Offline"} */}
							</h5>
						</span>
					)}
					{msg.senderType === "mentor" && (
						<Badge
							color="info"
							pill>
							Mentor
						</Badge>
					)}
				</div>
				<div className={`fw-semibold fs-5 ${isMe ? "text-end" : "text-start"}`}>
					{msg.message}
				</div>
				<small
					className={`d-block mt-1 text-end ${
						isMe ? "text-white-50" : "text-muted"
					}`}>
					{format(new Date(msg.timestamp), "hh:mm a")}
				</small>
			</div>
		</div>
	);
};
export default ChatMessageBubble;
