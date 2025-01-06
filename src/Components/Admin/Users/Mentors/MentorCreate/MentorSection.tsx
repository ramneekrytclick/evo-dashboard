import { TimeAvailability } from "@/Constant";
import { ErrorMessage, Field } from "formik";
import { FormGroup, Label } from "reactstrap";

const MentorSection = () => {
	return (
		<FormGroup>
			<Label>{TimeAvailability}</Label>
			<Field
				name="timeAvailable"
				type="text"
				className="form-control"
				placeholder="Availability"
			/>
			<ErrorMessage
				name="timeAvailable"
				component="span"
				className="text-danger"
			/>
		</FormGroup>
	);
};

export default MentorSection;
