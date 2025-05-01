"use client";
import { getChats, sendMessage } from "@/app/api/chat";
import { useEffect, useRef, useState } from "react";
import { Send } from "react-feather";
import { toast } from "react-toastify";
import {
	Button,
	Card,
	CardHeader,
	Input,
	InputGroup,
	Spinner,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	ListGroup,
	ListGroupItem,
	Row,
	Col,
} from "reactstrap";
import { format, isToday, isYesterday } from "date-fns";
import { useAuth } from "@/app/AuthProvider";
import io from "socket.io-client";
import ChatMessageBubble from "@/CommonComponent/ChatBubble";
import { BatchProps } from "@/Types/Course.type";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

const GroupChat = ({
	batchId,
	batch,
}: {
	batchId: string;
	batch: BatchProps;
}) => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<any[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [sending, setSending] = useState(false);
	const [pinnedMessage, setPinnedMessage] = useState<any>(null);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};
	const { user } = useAuth();
	const userId = user?.id;
	const getDateLabel = (dateString: string) => {
		const date = new Date(dateString);
		if (isToday(date)) return "Today";
		if (isYesterday(date)) return "Yesterday";
		return format(date, "dd MMM yyyy");
	};

	const groupMessagesByDate = (messages: any[]) => {
		return messages.reduce((acc: any, msg) => {
			const dateLabel = getDateLabel(msg.timestamp);
			if (!acc[dateLabel]) acc[dateLabel] = [];
			acc[dateLabel].push(msg);
			return acc;
		}, {});
	};
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
			sender: {
				_id: userId,
				name: user?.name,
				photo: batch.students?.find((student) => student.userId === userId)
					?.photo,
			},
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
	const groupedMessages = groupMessagesByDate(messages);

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
		<Card className='d-flex flex-column w-100 shadow-sm border-0 rounded-4 right-sidebar-chat'>
			{/* Header */}
			<CardHeader className='border-bottom w-100 right-sidebar-title'>
				<h6 className='mb-0 w-25 text-start fw-semibold'>{batch.name}</h6>
				<div className='d-flex flex-column w-100 justify-content-between align-items-end'>
					<h6 className='mb-0 text-muted fs-6'>
						<strong>Course: </strong> {batch.course?.title}
					</h6>
					<h6
						className='mb-0 text-muted fs-6'
						style={{ cursor: "pointer" }}
						onClick={toggleModal}>
						{batch.students?.length || "0"} Students
					</h6>
				</div>
			</CardHeader>

			{/* Pinned Message */}
			{pinnedMessage && (
				<div className='bg-warning-subtle p-3 border-bottom w-100'>
					<h6 className='text-dark mb-1'>
						📌 Pinned Message
						<Badge
							color='info'
							pill
							className='ms-2 text-capitalize'>
							{pinnedMessage.senderType}
						</Badge>
					</h6>
					<p className='mb-1 fw-semibold'>{pinnedMessage.message}</p>
					<small className='text-muted'>
						{format(new Date(pinnedMessage.timestamp), "PPpp")} —{" "}
						{pinnedMessage.sender?.name}
					</small>
				</div>
			)}

			{/* Messages */}
			<div className='bg-light-subtle w-100 right-sidebar-Chats'>
				{loading ? (
					<div className='text-center mt-4'>
						<Spinner color='primary' />
					</div>
				) : messages.length === 0 ? (
					<p className='text-center text-muted'>No messages yet</p>
				) : (
					<div className='msger msger-chat'>
						{Object.entries(groupedMessages).map(([date, msgs]) => {
							const messagesArray = msgs as any[]; // or: as MessageType[] if you have a defined type

							return (
								<div
									key={date}
									className='mb-3 '>
									<div className='text-center small text-muted fw-semibold mb-3'>
										<span
											style={{
												background: "#f1f5f9",
												padding: "4px 12px",
												borderRadius: "999px",
												fontSize: "12px",
											}}>
											{date}
										</span>
									</div>
									{messagesArray.map((msg, index) => (
										<ChatMessageBubble
											key={index}
											msg={msg}
											isMe={msg.sender?._id === userId}
											isOnline={onlineUsers.some(
												(u: any) => u.userId === msg.sender?._id
											)}
										/>
									))}
								</div>
							);
						})}
						<div ref={messagesEndRef} />
					</div>
				)}
			</div>

			{/* Message Input */}
			<div className='border-top w-100 msger-inputarea'>
				<InputGroup className='rounded-pill shadow-sm overflow-hidden'>
					<Input
						type='text'
						placeholder='Type a message...'
						value={newMessage}
						onChange={handleMessageChange}
						onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
						className='border-0 px-4 msger-input'
						style={{ height: "44px" }}
					/>
					<Button
						color='primary'
						onClick={handleSendMessage}
						disabled={sending || !newMessage.trim()}
						className='px-4 d-flex align-items-center justify-content-center msger-send-btn'
						style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
						<i className='fa fa-location-arrow' />
					</Button>
				</InputGroup>
			</div>
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				centered
				size='lg'>
				<ModalHeader
					toggle={toggleModal}
					className='fw-bold'>
					Batch Students
				</ModalHeader>
				<ModalBody style={{ maxHeight: "70vh", overflowY: "auto" }}>
					{batch.students?.length === 0 ? (
						<p>No students found in this batch.</p>
					) : (
						<ListGroup>
							{batch.students?.map((student, idx) => (
								<ListGroupItem
									key={student._id}
									className='mb-3'>
									<Row className='w-100 '>
										<Col
											md='12'
											xl='2'>
											<Image
												width={100}
												height={100}
												src={getImageURL(student.photo)}
												alt={student.name}
												style={{
													borderRadius: "10px",
													objectFit: "cover",
													height: "100px",
													width: "100px",
												}}
											/>
										</Col>
										<Col
											md='10'
											className='d-flex flex-column justify-content-center'>
											<h5 className='mb-1'>{student.name}</h5>
											<p className='mb-1'>
												<strong>Email:</strong> {student.email}
											</p>
										</Col>
									</Row>
								</ListGroupItem>
							))}
						</ListGroup>
					)}
				</ModalBody>
			</Modal>
		</Card>
	);
};

export default GroupChat;
