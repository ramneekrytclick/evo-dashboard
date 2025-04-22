"use client";

import { Input, Label, FormGroup } from "reactstrap";

const AdditionalFilters = ({
	jobType,
	setJobType,
	experience,
	setExperience,
	salaryRange,
	setSalaryRange,
	deadline,
	setDeadline,
}: any) => {
	return (
		<>
			<FormGroup className='mt-3'>
				<Label for='jobType'>Job Type</Label>
				<Input
					type='select'
					id='jobType'
					value={jobType}
					onChange={(e) => setJobType(e.target.value)}>
					<option value=''>All</option>
					<option value='Internship'>Internship</option>
					<option value='Full-Time'>Full-Time</option>
					<option value='Part-Time'>Part-Time</option>
				</Input>
			</FormGroup>

			<FormGroup>
				<Label for='experience'>Experience Required</Label>
				<Input
					type='text'
					id='experience'
					placeholder='e.g. 1 year, 2+ years'
					value={experience}
					onChange={(e) => setExperience(e.target.value)}
				/>
			</FormGroup>

			<FormGroup>
				<Label for='salaryRange'>Minimum Salary (LPA)</Label>
				<Input
					type='number'
					id='salaryRange'
					placeholder='e.g. 3'
					value={salaryRange}
					onChange={(e) => setSalaryRange(e.target.value)}
				/>
			</FormGroup>

			<FormGroup>
				<Label for='deadline'>Application Deadline Before</Label>
				<Input
					type='date'
					id='deadline'
					value={deadline}
					onChange={(e) => setDeadline(e.target.value)}
				/>
			</FormGroup>
		</>
	);
};

export default AdditionalFilters;
