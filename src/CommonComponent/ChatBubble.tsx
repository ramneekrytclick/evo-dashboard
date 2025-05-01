import { Badge, Button } from "reactstrap";
import Image from "next/image";
import { format } from "date-fns";
import { ImagePath } from "@/Constant";

const ChatMessageBubble = ({ msg, isMe, isOnline, onPin }: any) => {
	const bubbleClass = isMe ? "right" : "left";
	const participatorImage = msg?.sender?.image;

	return (
		<div className={`msg ${bubbleClass}-msg mb-4`}>
			{!isMe && participatorImage ? (
				<Image
					src={`${ImagePath}/${participatorImage}`}
					className='rounded-circle img-30 h-auto msg-img'
					width={33}
					height={33}
					alt='user'
				/>
			) : (
				<div className='msg-img' />
			)}

			<div className='msg-bubble'>
				<div className='msg-info d-flex align-items-center gap-2'>
					<div className='msg-info-name fw-semibold'>{msg.sender?.name}</div>

					<small className='msg-info-time d-flex align-items-center gap-1'>
						{msg.senderType === "mentor" && (
							<Badge
								color='light'
								pill
								className='px-2 py-1 text-uppercase text-primary'>
								Mentor
							</Badge>
						)}
						{format(new Date(msg.timestamp), "hh:mm a")}

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

						{onPin && (
							<Button
								size='sm'
								color='link'
								onClick={() => onPin(msg._id)}
								className='text-danger text-decoration-none p-0 ms-auto'>
								📌 Pin
							</Button>
						)}
					</small>
				</div>

				<div className='msg-text fw-medium fs-6 mt-1'>{msg.message}</div>
			</div>
		</div>
	);
};

export default ChatMessageBubble;
