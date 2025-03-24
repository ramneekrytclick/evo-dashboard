import { useEffect, useState } from "react";

import { TeamListType, UserProps } from "@/Types/Team.type";
import DataTable, { TableColumn } from "react-data-table-component";
// import { teamListColumns } from "@/Data/Admin/Team/TeamList";
import FilterComponent from "@/CommonComponent/FilterComponent";
import {
	approveUser,
	getPendingApprovals,
	getUsers,
} from "@/app/api/admin/team";
import { teamFakeData } from "@/FakeData/admin/team";
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
import Link from "next/link";

const PendingListTable = () => {
	const [teamListTableData, setTeamListTableData] = useState<UserProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<TeamListType | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const toggleModal = () => setModalOpen(!modalOpen);
	const openApproveModal = (row: TeamListType) => {
		setSelectedRow(row);
		setModalOpen(true);
	};
	const handleApproveUser = async () => {
		if (!selectedRow) return;
		try {
			await approveUser(selectedRow._id, "approve");
			toggleModal();
			toast.success(
				`${selectedRow.name} approved successfully as a ${selectedRow.role}`
			);
			fetchData(); // Refresh list
		} catch (error) {
			console.log("Approval error:", error);
		}
	};
	const teamListColumns: TableColumn<TeamListType>[] = [
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
			cell: (row) => (
				<Link
					className="text-dark fw-bold"
					href={`/admin/users/${row._id}`}>
					{row.name}
				</Link>
			),
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
							? "danger"
							: row.role.toLowerCase() === "student"
							? "info"
							: row.role.toLowerCase() === "coursecreator"
							? "success"
							: "secondary"
					}`}>
					{row.role}
				</Badge>
			),
		},
		{
			name: "Action",
			cell: (row) => (
				<Button
					color="success"
					onClick={() => openApproveModal(row)}>
					Approve User
				</Button>
			),
			sortable: false,
		},
	];
	const fetchData = async () => {
		try {
			const response = await getPendingApprovals();
			setTeamListTableData(response);
		} catch (error) {
			console.log(error);
			// setTeamListTableData(teamFakeData);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	const [filterText, setFilterText] = useState("");

	const filteredItems: UserProps[] = teamListTableData?.filter(
		(item: UserProps) => {
			return Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			);
		}
	);

	return (
		<Card>
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
					<ModalHeader toggle={toggleModal}>Confirm Approval</ModalHeader>
					<ModalBody>
						Are you sure you want to approve{" "}
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
							color="success"
							onClick={handleApproveUser}>
							Yes, Approve
						</Button>
					</ModalFooter>
				</Modal>
			</CardBody>
		</Card>
	);
};

export default PendingListTable;
