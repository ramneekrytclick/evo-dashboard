import UserRegisterForm from "@/Components/Auth/UserRegisterForm";
import { Col, Container, Row } from "reactstrap";

const UserRegister = () => {
	return (
		<Container
			fluid
			className="p-0">
			<Row className="m-0">
				<Col
					xs={12}
					className="p-0">
					<div className="login-card login-dark">
						<UserRegisterForm />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default UserRegister;
