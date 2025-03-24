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
	status: string;
	isApproved: boolean;
}
export interface UserProps {
	_id: string;
	name: string;
	email: string;
	role: string;
	status: string;
	isApproved: boolean;
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
