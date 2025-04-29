import { Card, CardBody, Col, Row } from "reactstrap";
import SVG from "@/CommonComponent/SVG";

const MyCardWithIcon: React.FC<any> = ({
	icon,
	amount,
	title,
	color,
	divClass,
}) => {
	return (
		<Card className='total-sales'>
			<CardBody>
				<Row className=''>
					<Col
						md={4}
						sm={12}
						className='d-flex justify-content-center'>
						<div
							className={`d-flex align-items-center justify-content-center ${divClass}`}>
							<span className='icon-wrapper'>
								<SVG
									iconId={icon}
									className='svg-icon'
									style={{
										width: "30px",
										height: "30px",
										fill: color,
										marginRight: "0px",
									}}
								/>
							</span>
						</div>
					</Col>
					<Col
						md={8}
						sm={12}>
						<div className='ms-md-3 text-center text-md-end mt-md-0 mt-3'>
							<h4 className={`text-${color} fs-2 fw-bold mb-1`}>{amount}</h4>
							<span className='text-muted'>{title}</span>
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};

export default MyCardWithIcon;
