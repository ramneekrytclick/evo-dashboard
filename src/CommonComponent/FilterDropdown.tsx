// components/FilterDropdown.tsx
"use client";

import React from "react";

interface FilterDropdownProps {
	label: string;
	value: string;
	options: string[];
	onChange: (val: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
	label,
	value,
	options,
	onChange,
}) => {
	return (
		<div style={{ minWidth: 160 }}>
			<label className='form-label mb-1'>{label}</label>
			<select
				className='form-select'
				value={value}
				onChange={(e) => onChange(e.target.value)}>
				<option value=''>All</option>
				{options.map((opt, i) => (
					<option
						value={opt}
						key={i}>
						{opt}
					</option>
				))}
			</select>
		</div>
	);
};

export default FilterDropdown;
