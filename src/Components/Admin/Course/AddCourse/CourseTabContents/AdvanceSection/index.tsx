import { mentorListData } from "@/Data/Admin/Users/Mentor/Mentor";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { AssignManagers, AssignMentors } from "@/Constant";
import { managerListData } from "@/Data/Admin/Users/Manager/Manager";
import SVG from "@/CommonComponent/SVG";
import { ActiveCallbackProp } from "@/Types/Forms.type";

const AdvanceSection: React.FC<ActiveCallbackProp> = ({activeCallBack}) => {
	const handleSubmitButton = () => {
        // submit form
    };
	return (
		<div className="sidebar-body advance-options">
			<Row>
			<Col
				sm={6}
				xl={4}>
				<div className="card-wrapper border rounded-3 checkbox-checked">
                <h6 className="sub-title">{AssignMentors}</h6>
					{mentorListData.map((item) => (
						<FormGroup
							key={item.id}
							check>
							<Input
								type="checkbox"
							/>
							<Label check>{item.name}</Label>
						</FormGroup>
					))}
				</div>
			</Col>
			<Col
				sm={6}
				xl={4}>
				<div className="card-wrapper border rounded-3 checkbox-checked">
                <h6 className="sub-title">{AssignManagers}</h6>
					{managerListData.map((item) => (
						<FormGroup
							key={item.id}
							check>
							<Input
								type="checkbox"
							/>
							<Label check>{item.name}</Label>
						</FormGroup>
					))}
				</div>
			</Col>
			</Row>
			<div className="product-buttons">
                    <Button color='transparent' className='me-1' onClick={()=>activeCallBack(3)}>
                        <div className="d-flex align-items-center gap-sm-2 gap-1">
                            <SVG iconId='back-arrow' /> {'Previous'}
                        </div>
                    </Button>
                    <Button color='transparent' onClick={handleSubmitButton}>
                        <div className="d-flex align-items-center gap-sm-2 gap-1">
                        {'Submit'} <SVG iconId='front-arrow' /> 
                        </div>
                    </Button>
                </div>
				
		</div>
	);
};
export default AdvanceSection;
