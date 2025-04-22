import { MapPin, Search } from "react-feather";
import { Input, Label } from "reactstrap";

const SearchAndMap = ({
	searchQuery,
	location,
	setSearchQuery,
	setLocation,
}: any) => {
	return (
		<>
			<div className='job-filter mb-2'>
				<div className='faq-form'>
					<Label for='search'>
						<span className='font-weight-bold'>Search</span>
					</Label>
					<Input
						name='search'
						type='text'
						placeholder='Search job title...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<Search className='search-icon' />
				</div>
			</div>
			<div className='job-filter'>
				<div className='faq-form'>
					<Label for='location'>
						<span className='font-weight-bold'>Location</span>
					</Label>
					<Input
						name='location'
						type='text'
						placeholder='Enter location...'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
					<MapPin className='search-icon' />
				</div>
			</div>
		</>
	);
};

export default SearchAndMap;
