import { Button, CardHeader } from "reactstrap";
import { ChevronDown, ChevronUp, Filter } from "react-feather";

const HeaderWithIcon: React.FC<any> = ({ setIsOpen, isOpen, heading }) => {
	return (
		<CardHeader>
			<h2 className='mb-0'>
				<Button
					block
					className='w-100 btn-link text-start d-flex justify-content-between text-decoration-none'
					onClick={() => setIsOpen(!isOpen)}
					color='transperant'>
					<div className='d-flex align-items-center gap-2'>
						<Filter size={19} />
						{heading}
					</div>
					{isOpen ? (
						<ChevronDown className='m-0' />
					) : (
						<ChevronUp className='m-0' />
					)}
				</Button>
			</h2>
		</CardHeader>
	);
};

export default HeaderWithIcon;
