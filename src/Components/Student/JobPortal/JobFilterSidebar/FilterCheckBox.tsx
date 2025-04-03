import { Input, Label } from "reactstrap";

const FilterCheckBox = ({ selectedFilters, setSelectedFilters }: any) => {
	const handleChange = (filter: string) => {
		if (selectedFilters.includes(filter)) {
			setSelectedFilters(selectedFilters.filter((f: string) => f !== filter));
		} else {
			setSelectedFilters([...selectedFilters, filter]);
		}
	};

	return (
		<div className="checkbox-animated">
			{/* {checkBoxData.map((data, index) => (
				<Label className="d-block" htmlFor={`chk-ani-${index}`} key={index} check>
					<Input
						className="checkbox_animated"
						id={`chk-ani-${index}`}
						type="checkbox"
						checked={selectedFilters.includes(data.inputTittle)}
						onChange={() => handleChange(data.inputTittle)}
					/>
					{data.inputTittle} {data.inputNumber}
				</Label>
			))} */}
		</div>
	);
};

export default FilterCheckBox;
