"use client";
import { getMentorChats, sendMessageMentor } from "@/app/api/chat";
import { useEffect, useRef, useState } from "react";
import { Send } from "react-feather";
import { toast } from "react-toastify";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	InputGroup,
	Spinner,
	Badge,
} from "reactstrap";
import { format } from "date-fns";
import { useAuth } from "@/app/AuthProvider";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

const GroupChat = ({ batchId }: { batchId: string }) => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<any[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [sending, setSending] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const { user } = useAuth();
	const userId = user?.id;

	const fetchChats = async () => {
		setLoading(true);
		try {
			const response = await getMentorChats(batchId);
			setMessages(response.chat || []);
		} catch (error) {
			toast.error("Error fetching chats");
		} finally {
			setLoading(false);
		}
	};

	const handleMessageChange = (event: any) => {
		setNewMessage(event.target.value);
	};

	const handleSendMessage = async () => {
		if (!newMessage.trim()) return;
		setSending(true);

		const messagePayload = {
			sender: { _id: userId, name: user?.name },
			message: newMessage,
			senderType: "mentor", // must be passed from auth context
			timestamp: new Date(),
		};

		try {
			await sendMessageMentor(batchId, newMessage);
			socket.emit("sendMessageMentor", {
				batchId,
				messageData: messagePayload,
			});
			// setMessages((prev) => [...prev, messagePayload]);
			setNewMessage("");
			scrollToBottom();
		} catch (error) {
			toast.error("Error sending message");
		} finally {
			setSending(false);
		}
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		fetchChats();

		socket.emit("joinBatch", batchId);

		socket.on("receiveMessage", (messageData) => {
			setMessages((prev) => [...prev, messageData]);
			scrollToBottom();
		});

		return () => {
			socket.off("receiveMessage");
		};
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	// ✅ Get the latest mentor message (if any)
	const latestMentorMessage = [...messages]
		.reverse()
		.find((msg) => msg.senderType === "mentor");

	return (
		<Card className="d-flex flex-column h-100 w-100">
			<CardHeader className="bg-white text-primary w-100">
				<h5 className="mb-0">Group Chat</h5>
			</CardHeader>

			{latestMentorMessage && (
				<div className="bg-warning-subtle p-3 border-bottom">
					<h6 className="text-dark mb-1">
						📌 Latest Mentor Message
						<Badge
							color="info"
							pill
							className="ms-2">
							Mentor
						</Badge>
					</h6>
					<p className="mb-1 fw-semibold">{latestMentorMessage.message}</p>
					<small className="text-muted">
						{format(new Date(latestMentorMessage.timestamp), "PPpp")} —{" "}
						{latestMentorMessage.sender?.name}
					</small>
				</div>
			)}

			<CardBody className="flex-grow-1 overflow-auto bg-light p-3 w-100">
				{loading ? (
					<div className="text-center mt-4">
						<Spinner color="primary" />
					</div>
				) : messages.length === 0 ? (
					<p className="text-center text-muted">No messages yet</p>
				) : (
					messages.map((msg, index) => {
						const isMe = msg.sender?._id === userId;
						return (
							<div
								key={index}
								className={`d-flex flex-column mb-2 ${
									isMe ? "align-items-end" : "align-items-start"
								}`}>
								<div
									className={`p-2 rounded shadow-sm ${
										isMe ? "bg-dark text-white" : "bg-white text-dark border"
									}`}
									style={{
										maxWidth: "75%",
										wordBreak: "break-word",
										position: "relative",
									}}>
									<div className="d-flex justify-content-between align-items-center mb-1">
										<span
											className={`fw-semibold ${
												isMe ? "text-warning" : "text-success"
											}`}>
											{msg.sender?.name}
										</span>
										{msg.senderType === "mentor" && (
											<Badge
												color="info"
												pill
												className="ms-2">
												Mentor
											</Badge>
										)}
									</div>
									<div className={`fw-bold ${isMe ? "text-end" : ""}`}>
										{msg.message}
									</div>
									<small
										className={`${
											isMe ? "text-white" : ""
										} mt-1 d-block text-end`}>
										{format(new Date(msg.timestamp), "hh:mm a")}
									</small>
								</div>
							</div>
						);
					})
				)}
				<div ref={messagesEndRef} />
			</CardBody>

			<InputGroup className="p-3 border-top">
				<Input
					type="text"
					placeholder="Type a message..."
					value={newMessage}
					onChange={handleMessageChange}
					onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
				/>
				<Button
					color="primary"
					onClick={handleSendMessage}
					disabled={sending || !newMessage.trim()}>
					<Send size={18} />
				</Button>
			</InputGroup>
		</Card>
	);
};

export default GroupChat;
