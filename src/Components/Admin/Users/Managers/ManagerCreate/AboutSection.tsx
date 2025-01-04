import CommonSelectDropdown from "@/Components/Forms/FormControls/BaseInputs/Common/CommonSelectDropdown";
import { AboutTitle, Address, Education, LatestPhotosTitle, ProfilePhotoTitle, workingModeTitle } from "@/Constant";
import { workingModeInputData } from "@/Data/Admin/Users/Manager/Manager";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

const AboutSection = () => {
	return (
		<>
			<FormGroup>
				<Label htmlFor="formFile">{ProfilePhotoTitle}</Label>
				<Input
					id="formFile"
					type="file"
				/>
			</FormGroup>
			<FormGroup>
				<Label htmlFor="about">{AboutTitle}</Label>
				<Input
					type="textarea"
					className="btn-square"
					id="about"
					rows="3"
				/>
			</FormGroup>
			<Row>
				<Col md={6}>
					<FormGroup>
						<Label htmlFor="education">{Education}</Label>
						<Input
							type="textarea"
							className="btn-square"
							id="education"
							rows="2"
						/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label htmlFor="address">{Address}</Label>
						<Input
							type="textarea"
							className="btn-square"
							id="address"
							rows="2"
						/>
					</FormGroup>
				</Col>
			</Row>
            <CommonSelectDropdown title={workingModeTitle} inputClass='btn-square digits custom-scrollbar' options={workingModeInputData} />
		</>
	);
};

export default AboutSection;
