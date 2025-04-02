import { Send } from "react-feather";
import { Button, Card, CardHeader, Input, InputGroup } from "reactstrap";

const GroupChat = () => {
	return (
		<Card className="flex-grow-1 border bg-light text-dark h-100">
			<CardHeader>
				<h5>Group Chat</h5>
			</CardHeader>
			<div style={{ height: "100%", overflowY: "auto" }}>
				{/* Replace below with actual chat component */}
				<p>Chat messages will appear here...</p>
			</div>
			<InputGroup className="bg-white w-100 rounded">
				<Input
					type="text"
					placeholder="Send Message..."
					id="button-addon2"
				/>
				<Button
					color="primary"
					id="button-addon2">
					<Send />
				</Button>
			</InputGroup>
		</Card>
	);
};

export default GroupChat;
