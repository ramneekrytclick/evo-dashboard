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
import Image from "next/image";
import { useRouter } from "next/navigation";

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
			cell: (row) => {
				const resolvedPhoto = row.photo ? row.photo.replace(/\\/g, "/") : "";

				const profilePhotoUrl = resolvedPhoto.startsWith("uploads")
					? `${backendURL}/${resolvedPhoto}`
					: `${backendURL}/uploads/${resolvedPhoto}`;
				const photoURL = row.photo
					? profilePhotoUrl
					: "/assets/avatar-placeholder.png";
				return (
					<>
						<Image
							src={photoURL}
							alt={row.name}
							width={50}
							height={50}
							style={{
								borderRadius: "50%",
								objectFit: "cover",
							}}
						/>
					</>
				);
			},
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
	const navigate = useRouter();

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
					onRowClicked={(row: any) => {
						navigate.push(`/admin/users/${row._id}`);
					}}
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
