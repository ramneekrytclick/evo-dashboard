"use client";
import { getChats, sendMessage } from "@/app/api/chat";
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
import ChatMessageBubble from "@/CommonComponent/ChatBubble";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

const GroupChat = ({ batchId }: { batchId: string }) => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<any[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [sending, setSending] = useState(false);
	const [pinnedMessage, setPinnedMessage] = useState<any>(null);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const { user } = useAuth();
	const userId = user?.id;

	const fetchChats = async () => {
		setLoading(true);
		try {
			const response = await getChats(batchId);
			setMessages(response.chat || []);
			setPinnedMessage(response.pinnedMessage || null);
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
			senderType: "student",
			timestamp: new Date(),
		};

		try {
			await sendMessage(batchId, newMessage);
			socket.emit("sendMessage", {
				batchId,
				messageData: messagePayload,
			});
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

		socket.on("pinnedMessageUpdated", (data) => {
			setPinnedMessage(data);
		});

		return () => {
			socket.off("receiveMessage");
			socket.off("pinnedMessageUpdated");
		};
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (!userId || !user?.name) return;

		socket.emit("userOnline", {
			userId,
			name: user.name,
			role: user.role,
			batchId,
		});
	}, [userId, user?.name, batchId]);

	const [onlineUsers, setOnlineUsers] = useState<any>([]);

	useEffect(() => {
		socket.on("onlineUsers", (list) => {
			setOnlineUsers(list);
		});

		return () => {
			socket.off("onlineUsers");
		};
	}, []);

	return (
		<Card className="d-flex flex-column h-100 w-100">
			<CardHeader className="bg-white border-bottom w-100">
				<h5 className="mb-0 text-primary">Group Chat</h5>
			</CardHeader>

			{pinnedMessage && (
				<div className="bg-warning-subtle p-3 border-bottom w-100">
					<h6 className="text-dark mb-1">
						📌 Pinned Message
						<Badge
							color="info"
							pill
							className="ms-2">
							{pinnedMessage.senderType}
						</Badge>
					</h6>
					<p className="mb-1 fw-semibold">{pinnedMessage.message}</p>
					<small className="text-muted">
						{format(new Date(pinnedMessage.timestamp), "PPpp")} —{" "}
						{pinnedMessage.sender?.name}
					</small>
				</div>
			)}

			<CardBody className="flex-grow-1 overflow-auto bg-light px-4 py-3 w-100">
				{loading ? (
					<div className="text-center mt-4">
						<Spinner color="primary" />
					</div>
				) : messages.length === 0 ? (
					<p className="text-center text-muted">No messages yet</p>
				) : (
					messages.map((msg, index) => (
						<ChatMessageBubble
							key={index}
							msg={msg}
							isMe={msg.sender?._id === userId}
							isOnline={onlineUsers.some(
								(u: any) => u.userId === msg.sender?._id
							)}
						/>
					))
				)}
				<div ref={messagesEndRef} />
			</CardBody>

			<InputGroup className="p-3 border-top bg-white">
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
