export interface FilterComponentProps {
	onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
	filterText: string;
}
export interface TeamListHeaderProp {
	linkTitle: string;
}
export interface TeamListType {
	_id: string;
	name: string;
	email: string;
	role: string;
	username: string;
	status: string;
	isApproved: boolean;
	contactNumber: string;
	photo: string;
	address: string;
	education: string;
	experience: string[];
	bio: string;
	workingMode: string;
}
export interface UserProps {
	_id: string;
	name: string;
	email: string;
	role: string;
	username: string;
	status: string;
	isApproved: boolean;
	contactNumber: string;
	photo: string;
	address: string;
	education: string;
	experience: string[];
	bio: string;
	workingMode: string;
}
export interface AddUserFormProps {
	name: string;
	email: string;
	role: string;
	password: string;
}
export interface UserInitialValue {
	name: string;
	email: string;
	password: string;
	role: string;
}
