"use client";

import {
	getMentorChats,
	sendMessageMentor,
	pinMessageMentor,
} from "@/app/api/chat";
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
	Modal,
	ListGroupItem,
	ListGroup,
	ModalBody,
	ModalHeader,
	Row,
	Col,
} from "reactstrap";
import { format, isToday, isYesterday } from "date-fns";
import { useAuth } from "@/app/AuthProvider";
import io from "socket.io-client";
import ChatMessageBubble from "@/CommonComponent/ChatBubble";
import { BatchProps } from "@/Types/Course.type";
import { getImageURL } from "@/CommonComponent/imageURL";
import Image from "next/image";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

const getDateLabel = (timestamp: string) => {
	const date = new Date(timestamp);
	if (isToday(date)) return "Today";
	if (isYesterday(date)) return "Yesterday";
	return format(date, "dd MMM yyyy");
};

const groupMessagesByDate = (messages: any[]) => {
	return messages.reduce((acc: any, msg) => {
		const label = getDateLabel(msg.timestamp);
		if (!acc[label]) acc[label] = [];
		acc[label].push(msg);
		return acc;
	}, {});
};

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
	const { user } = useAuth();
	const userId = user?.id;
	const [modalOpen, setModalOpen] = useState(false);
	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};
	const fetchChats = async () => {
		setLoading(true);
		try {
			const response = await getMentorChats(batchId);
			setMessages(response.chat || []);
			setPinnedMessage(response.pinnedMessage || null);
		} catch {
			toast.error("Error fetching chats");
		} finally {
			setLoading(false);
		}
	};

	const handleMessageChange = (e: any) => setNewMessage(e.target.value);

	const handleSendMessage = async () => {
		if (!newMessage.trim()) return;
		setSending(true);

		const messagePayload = {
			sender: { _id: userId, name: user?.name },
			message: newMessage,
			senderType: "mentor",
			timestamp: new Date(),
		};

		try {
			await sendMessageMentor(batchId, newMessage);
			socket.emit("sendMessageMentor", {
				batchId,
				messageData: messagePayload,
			});
			setNewMessage("");
			scrollToBottom();
		} catch {
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

		socket.on("receiveMessage", (msg) => {
			setMessages((prev) => [...prev, msg]);
			scrollToBottom();
		});
		return () => {
			socket.off("receiveMessage");
			socket.off("pinnedMessageUpdated");
		};
	}, []);

	useEffect(() => scrollToBottom(), [messages]);

	useEffect(() => {
		if (!userId || !user?.name) return;
		socket.emit("userOnline", {
			userId,
			name: user.name,
			role: user.role,
			batchId,
		});
	}, [userId, user?.name, batchId]);

	const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

	useEffect(() => {
		const handleOnlineUsers = (list: any[]) => setOnlineUsers(list);

		socket.on("onlineUsers", handleOnlineUsers);

		return () => {
			socket.off("onlineUsers", handleOnlineUsers);
		};
	}, []);

	const handlePin = async (messageId: string) => {
		try {
			const res = await pinMessageMentor(batchId, messageId);
			setPinnedMessage(res.pinnedMessage);
			toast.success("Message pinned");
		} catch {
			toast.error("Failed to pin message");
		}
	};

	const groupedMessages = groupMessagesByDate(messages);

	return (
		<Card className='d-flex flex-column h-100 w-100 shadow-sm border-0 rounded-4'>
			<CardHeader className='bg-white border-bottom w-100'>
				<h6 className='mb-0 text-center fw-semibold'>Group Chat</h6>
				<div className='d-flex w-100 justify-content-between align-items-center'>
					<h6 className='mb-0 text-muted fs-6'>
						<strong>Course:</strong>
						{batch.course?.title}
					</h6>
					<h6
						className='mb-0 text-muted fs-6'
						style={{
							cursor: "pointer",
						}}
						onClick={toggleModal}>
						{batch.students?.length || "0"} Students
					</h6>
				</div>
			</CardHeader>

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

			<CardBody className='flex-grow-1 overflow-auto bg-light-subtle px-4 py-3 w-100'>
				{loading ? (
					<div className='text-center mt-4'>
						<Spinner color='primary' />
					</div>
				) : Object.keys(groupedMessages).length === 0 ? (
					<p className='text-center text-muted'>No messages yet</p>
				) : (
					Object.entries(groupedMessages).map(([date, msgs]) => {
						const dayMsgs = msgs as any[];
						return (
							<div
								key={date}
								className='mb-4'>
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
								{dayMsgs.map((msg, index) => (
									<ChatMessageBubble
										key={index}
										msg={msg}
										isMe={msg.sender?._id === userId}
										isOnline={onlineUsers.some(
											(u: any) => u.userId === msg.sender?._id
										)}
										onPin={msg.senderType === "mentor" ? handlePin : undefined}
									/>
								))}
							</div>
						);
					})
				)}
				<div ref={messagesEndRef} />
			</CardBody>

			<div className='border-top p-3 w-100'>
				<InputGroup className='rounded-pill shadow-sm overflow-hidden'>
					<Input
						type='text'
						placeholder='Type a message...'
						value={newMessage}
						onChange={handleMessageChange}
						onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
						className='border-0 px-4'
						style={{ height: "44px" }}
					/>
					<Button
						color='primary'
						onClick={handleSendMessage}
						disabled={sending || !newMessage.trim()}
						className='px-4 d-flex align-items-center justify-content-center'
						style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
						<Send size={18} />
					</Button>
				</InputGroup>
			</div>
			<Modal
				isOpen={modalOpen}
				toggle={() => setModalOpen(false)}
				centered
				size='lg'>
				<ModalHeader toggle={() => setModalOpen(false)}>
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
									<Row className='w-100'>
										<Col md='2'>
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
										<Col md='10'>
											<h5 className='mb-1'>{student.name}</h5>
											<p className='mb-1'>
												<strong>Email:</strong> {student.email}
											</p>
											<p className='mb-1'>
												<strong>Contact:</strong> {student.contactNumber}
											</p>
											<p className='mb-1'>
												<strong>Date of Birth:</strong>{" "}
												{new Date(student.dob).toLocaleDateString()}
											</p>
											<p className='mb-1'>
												<strong>Education:</strong> {student.education}
											</p>
											<p className='mb-1'>
												<strong>Experience:</strong>{" "}
												{student.experience?.join(", ") || "N/A"}
											</p>
											<p className='mb-1'>
												<strong>Languages:</strong>{" "}
												{student.preferredLanguages?.join(", ") || "N/A"}
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
