import { useEffect, useState } from "react";
import { TeamListType, UserProps } from "@/Types/Team.type";
import DataTable, { TableColumn } from "react-data-table-component";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { approveUser, getPendingApprovals } from "@/app/api/admin/team";
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
import Link from "next/link";
import { toast } from "react-toastify";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

const PendingListTable = () => {
	const [loading, setLoading] = useState(false);
	const [teamListTableData, setTeamListTableData] = useState<UserProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<TeamListType | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [filterText, setFilterText] = useState("");

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
			toast.success(`${selectedRow.name} approved successfully`);
			fetchData();
		} catch (error) {
			toast.error("Failed to approve user");
		}
	};

	const teamListColumns: TableColumn<TeamListType>[] = [
		{
			name: "Photo",
			selector: (row) => row.photo,
			cell: (row) => (
				<>
					<img
						src={`${backendURL}/${row.photo?.replace(/\\/g, "/")}`}
						alt={row.name}
						style={{
							width: 50,
							height: 50,
							borderRadius: "50%",
							objectFit: "cover",
						}}
					/>
				</>
			),
			width: "80px",
		},
		{
			name: "Name",
			selector: (row) => row.name,
			cell: (row) => (
				<Link
					href={`/admin/users/${row._id}`}
					className='fw-bold text-dark'>
					{row.name}
				</Link>
			),
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.email,
			cell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
			sortable: true,
		},
		{
			name: "Contact",
			selector: (row) => row.contactNumber,
			cell: (row) => row.contactNumber || "N/A",
		},
		{
			name: "Role",
			selector: (row) => row.role,
			cell: (row) => (
				<Badge
					color={
						row.role === "Admin"
							? "primary"
							: row.role === "Manager"
							? "danger"
							: row.role === "Publisher"
							? "info"
							: row.role === "Course Creator"
							? "warning"
							: "secondary"
					}>
					{row.role}
				</Badge>
			),
		},
		{
			name: "Status",
			selector: (row) => row.status,
			cell: (row) => (
				<Badge color={row.status === "Banned" ? "danger" : "success"}>
					{row.status}
				</Badge>
			),
		},
		{
			name: "Mode",
			selector: (row) => row.workingMode,
			cell: (row) => row.workingMode || "N/A",
		},
		{
			name: "Action",
			cell: (row) => (
				<Button
					color='success'
					size='sm'
					onClick={() => openApproveModal(row)}>
					Approve
				</Button>
			),
			button: true,
		},
	];

	const fetchData = async () => {
		try {
			setLoading(true);
			const res = await getPendingApprovals();
			const filtered = res.filter((user: UserProps) => user.role !== "Student");
			setTeamListTableData(filtered.reverse());
		} catch (err) {
			toast.error("Error loading team list");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const filteredItems = teamListTableData.filter((item) =>
		Object.values(item).some((val) =>
			val?.toString().toLowerCase().includes(filterText.toLowerCase())
		)
	);

	return (
		<Card>
			<CardBody>
				<FilterComponent
					filterText={filterText}
					onFilter={(e) => setFilterText(e.target.value)}
				/>

				<DataTable
					columns={teamListColumns}
					data={filteredItems}
					progressPending={loading}
					pagination
					striped
					responsive
				/>

				<Modal
					isOpen={modalOpen}
					toggle={toggleModal}
					centered>
					<ModalHeader toggle={toggleModal}>Confirm Approval</ModalHeader>
					<ModalBody>
						Approve <strong>{selectedRow?.name}</strong> as{" "}
						<strong>{selectedRow?.role}</strong>?
					</ModalBody>
					<ModalFooter>
						<Button
							color='secondary'
							onClick={toggleModal}>
							Cancel
						</Button>
						<Button
							color='success'
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
