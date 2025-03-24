import { useEffect, useState } from "react";

import { TeamListType, UserProps } from "@/Types/Team.type";
import DataTable, { TableColumn } from "react-data-table-component";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { approveUser, getUsers } from "@/app/api/admin/team";
import {
	Badge,
	Button,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import { toast } from "react-toastify";

const TeamListTable = () => {
	const [teamListTableData, setTeamListTableData] = useState<UserProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<TeamListType | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const toggleModal = () => setModalOpen(!modalOpen);
	const openApproveModal = (row: TeamListType) => {
		setSelectedRow(row);
		setModalOpen(true);
	};
	const handleAction = async (action: string) => {
		if (!selectedRow) return;
		try {
			await approveUser(selectedRow._id, action);
			toggleModal();
			fetchData();
		} catch (error) {
			console.log("Approval error:", error);
		}
	};
	const teamListColumns: TableColumn<TeamListType>[] = [
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
			cell: (row) => <p style={{ fontWeight: 700 }}>{row.name}</p>,
		},
		{
			name: "Email",
			selector: (row) => row.email,
			sortable: true,
			cell: (row) => <p className="f-light">{row.email}</p>,
		},
		{
			name: "Role",
			selector: (row) => row.role.toUpperCase(),
			sortable: true,
			cell: (row) => (
				<Badge
					color=""
					pill
					style={{ fontSize: 13 }}
					className={`badge-${
						row.role.toLowerCase() === "admin"
							? "primary"
							: row.role.toLowerCase() === "manager"
							? "info"
							: row.role.toLowerCase() === "student"
							? "info"
							: row.role.toLowerCase() === "coursecreator"
							? "success"
							: "primary"
					}`}>
					{row.role}
				</Badge>
			),
		},
		{
			name: "Action",
			cell: (row) => (
				<Button
					onClick={() => {
						openApproveModal(row);
					}}
					color={row.isApproved ? "danger" : "success"}>
					{row.isApproved ? "Disapprove" : "Approve"}
				</Button>
			),
			sortable: false,
		},
	];
	const fetchData = async () => {
		try {
			const response = await getUsers();
			setTeamListTableData(response ? response : []);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	const [filterText, setFilterText] = useState("");

	const filteredItems: UserProps[] = teamListTableData.filter(
		(item: UserProps) => {
			return Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			);
		}
	);
	return (
		<Card className="list-product">
			<CardBody>
				<FilterComponent
					onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFilterText(e.target.value)
					}
					filterText={filterText}
				/>
				<DataTable
					className="custom-scrollbar"
					data={filteredItems}
					columns={teamListColumns}
					pagination
				/>
				<Modal
					isOpen={modalOpen}
					toggle={toggleModal}
					centered>
					<ModalHeader toggle={toggleModal}>
						Confirm {selectedRow?.isApproved ? "Disapproval" : "Approval"}
					</ModalHeader>
					<ModalBody>
						Are you sure you want to{" "}
						{selectedRow?.isApproved ? "disapprove" : "approve"}{" "}
						<strong>{selectedRow?.name}</strong> as a{" "}
						<strong>{selectedRow?.role}</strong>?
					</ModalBody>
					<ModalFooter>
						<Button
							color="secondary"
							onClick={toggleModal}>
							Cancel
						</Button>
						<Button
							color={selectedRow?.isApproved ? "danger" : "success"}
							onClick={() => {
								handleAction(
									selectedRow?.isApproved ? "disapprove" : "approve"
								);
							}}>
							Yes, {selectedRow?.isApproved ? "Disapprove" : "Approve"}
						</Button>
					</ModalFooter>
				</Modal>
			</CardBody>
		</Card>
	);
};

export default TeamListTable;
