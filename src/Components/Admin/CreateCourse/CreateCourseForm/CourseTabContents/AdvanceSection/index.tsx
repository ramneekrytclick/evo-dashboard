import {
	Button,
	Col,
	Input,
	Label,
	ListGroup,
	ListGroupItem,
	Row,
} from "reactstrap";
import { AssignManagers, AssignMentors } from "@/Constant";
import SVG from "@/CommonComponent/SVG";
import { CourseFormProps } from "@/Types/Course.type";
import { FormEvent, useEffect, useState } from "react";
import { getMentors } from "@/app/api/admin/mentors";

import ScrollBar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import { getManagers } from "@/app/api/admin/managers";
import { mentorFakeData } from "@/FakeData/admin/mentor";
import { teamFakeData } from "@/FakeData/admin/team";

interface AdvanceSectionProps {
	activeCallBack: (tab: number) => void;
	data: CourseFormProps;
	setData: (data: CourseFormProps) => void;
}
const AdvanceSection: React.FC<AdvanceSectionProps> = ({
	activeCallBack,
	data,
	setData,
}) => {
	const [mentorsList, setMentorsList] = useState(mentorFakeData);
	const [managersList, setManagersList] = useState(teamFakeData);
	const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
	const [selectedManager, setSelectedManager] = useState<string | null>(null);
	const fetchMentors = async () => {
		try {
			const response = await getMentors();
			setMentorsList(response.mentors);
			setMentorsList(mentorFakeData);
		} catch (error) {
			console.log(error);
			setMentorsList(mentorFakeData);
		}
	};
	const fetchManagers = async () => {
		try {
			const response = await getManagers();
			setManagersList(response.managers);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchData = async () => {
		await fetchManagers();
		await fetchMentors();
	};
	useEffect(() => {
		fetchData();
	}, []);

	const handleMentorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const mentorId = e.target.value;
		setSelectedMentor(mentorId);
		setData({
			...data,
			mentorAssigned: mentorId, // Assuming you have a mentor field in data
		});
	};

	// Handle change for selected Manager
	const handleManagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const managerId = e.target.value;
		setSelectedManager(managerId);
		setData({
			...data,
			managerAssigned: managerId, // Assuming you have a manager field in data
		});
	};

	const handleNextButton = () => {
		if (selectedManager && selectedMentor) {
			activeCallBack(4);
		} else {
			toast.error("Please assign both Mentors and Managers.");
		}
	};
	return (
		<div className="sidebar-body advance-options">
			<Row className="g-2">
				<Col
					xs={6}
					className="mb-5">
					<div className="card-wrapper border rounded-3 checkbox-checked">
						<Label className="sub-title">{AssignMentors}</Label>
						<ScrollBar
							className="scroll-demo scroll-b-none"
							style={{ width: "100%", height: "22.5em" }}>
							<ListGroup>
								{mentorsList?.map(({ name, _id }, index) => (
									<ListGroupItem
										className="list-group-item-action list-hover-primary"
										key={index}>
										<Input
											type="radio"
											name="mentor"
											value={_id}
											checked={selectedMentor === _id}
											onChange={handleMentorChange}
											className="me-2"
										/>
										<Label check>{name}</Label>
									</ListGroupItem>
								))}
							</ListGroup>
						</ScrollBar>
					</div>
				</Col>
				<Col
					xs={6}
					className="mb-5">
					<div className="card-wrapper border rounded-3 checkbox-checked">
						<Label className="sub-title">{AssignManagers}</Label>
						<ScrollBar
							className="scroll-demo scroll-b-none"
							style={{ width: "100%", height: "22.5em" }}>
							<ListGroup>
								{managersList.map(({ name, _id }, index) => (
									<ListGroupItem
										className="list-group-item-action list-hover-primary"
										key={index}>
										<Input
											type="radio"
											name="manager"
											value={_id}
											checked={selectedManager === _id}
											onChange={handleManagerChange}
											className="me-2"
										/>
										<Label check>{name}</Label>
									</ListGroupItem>
								))}
							</ListGroup>
						</ScrollBar>
					</div>
				</Col>
			</Row>
			<div className="product-buttons">
				<Button
					color="transparent"
					className="me-1"
					onClick={() => activeCallBack(2)}>
					<div className="d-flex align-items-center gap-sm-2 gap-1">
						<SVG iconId="back-arrow" /> {"Previous"}
					</div>
				</Button>
				<Button
					color="transparent"
					onClick={handleNextButton}>
					<div className="d-flex align-items-center gap-sm-2 gap-1">
						{"Next"} <SVG iconId="front-arrow" />
					</div>
				</Button>
			</div>
		</div>
	);
};
export default AdvanceSection;
