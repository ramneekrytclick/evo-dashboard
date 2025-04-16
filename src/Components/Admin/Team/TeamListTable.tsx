import { useEffect, useState } from "react";
import { TeamListType, UserProps } from "@/Types/Team.type";
import DataTable, { TableColumn } from "react-data-table-component";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { getUsers, updateUserStatus } from "@/app/api/admin/team";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const TeamListTable = () => {
	const [loading, setLoading] = useState(true);
	const [teamListTableData, setTeamListTableData] = useState<UserProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<TeamListType | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [actionType, setActionType] = useState<
		"Active" | "Inactive" | "Banned"
	>("Active");

	const toggleModal = () => setModalOpen(!modalOpen);

	const openStatusModal = (
		row: TeamListType,
		action: "Active" | "Inactive" | "Banned"
	) => {
		setSelectedRow(row);
		setActionType(action);
		setModalOpen(true);
	};

	const handleAction = async () => {
		if (!selectedRow) return;
		try {
			await updateUserStatus(selectedRow._id, actionType);
			toast.success(`User status updated to ${actionType}`);
			toggleModal();
			fetchData();
		} catch (error) {
			console.error("Status update error:", error);
			toast.error("Failed to update user status");
		}
	};

	const teamListColumns: TableColumn<TeamListType>[] = [
		{
			name: "User",
			selector: (row) => row.name,
			sortable: true,
			cell: (row) => {
				const resolvedPhoto = row.photo ? row.photo.replace(/\\/g, "/") : "";

				const profilePhotoUrl = resolvedPhoto.startsWith("uploads")
					? `${backendURL}/${resolvedPhoto}`
					: `${backendURL}/uploads/${resolvedPhoto}`;
				const photoURL = row.photo
					? profilePhotoUrl
					: "/assets/images/user/1.jpg";
				return (
					<div className='d-flex align-items-center gap-2'>
						<Image
							src={photoURL}
							alt={row.name}
							width={40}
							height={40}
							style={{ borderRadius: "50%", objectFit: "cover" }}
						/>
						<Link
							href={`/admin/users/${row._id}`}
							className='fw-bold text-dark'>
							{row.name}
						</Link>
					</div>
				);
			},
		},
		{
			name: "Email",
			center: true,
			selector: (row) => row.email,
			sortable: true,
			cell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
		},
		{
			name: "Role",
			selector: (row) => row.role.toUpperCase(),
			sortable: true,
			center: true,
			cell: (row) => (
				<span style={{ fontSize: 13, fontWeight: 600 }}>{row.role}</span>
			),
		},
		{
			name: "Status",
			selector: (row) => row.status,
			center: true,
			cell: (row) => (
				<Badge
					color={
						row.status === "Active"
							? "success"
							: row.status === "Inactive"
							? "warning"
							: "danger"
					}
					pill>
					{row.status}
				</Badge>
			),
		},
		{
			name: "Action",
			width: "30%",
			center: true,
			cell: (row) => (
				<div className='d-flex gap-1'>
					<Button
						color={row.status === "Active" ? "warning" : "success"}
						size='sm'
						onClick={() =>
							openStatusModal(
								row,
								row.status === "Active" ? "Inactive" : "Active"
							)
						}>
						{row.status === "Active" ? "Deactivate" : "Activate"}
					</Button>
					<Button
						color='danger'
						size='sm'
						onClick={() => openStatusModal(row, "Banned")}>
						Ban
					</Button>
				</div>
			),
			sortable: false,
		},
	];

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await getUsers();
			setTeamListTableData(response || []);
		} catch (error) {
			console.log(error);
			toast.error("Error fetching Team Data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const [filterText, setFilterText] = useState("");
	const navigate = useRouter();
	const filteredItems: UserProps[] = teamListTableData.filter(
		(item: UserProps) =>
			Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			)
	);

	return (
		<Card className='list-product'>
			<CardBody>
				<FilterComponent
					onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFilterText(e.target.value)
					}
					filterText={filterText}
				/>
				<DataTable
					className='custom-scrollbar'
					data={filteredItems}
					columns={teamListColumns}
					progressPending={loading}
					pagination
					onRowClicked={(row: any) => {
						navigate.push(`/admin/users/${row._id}`);
					}}
				/>
				{/* Status Modal */}
				<Modal
					isOpen={modalOpen}
					toggle={toggleModal}
					centered>
					<ModalHeader toggle={toggleModal}>Confirm Status Change</ModalHeader>
					<ModalBody>
						Are you sure you want to set <strong>{selectedRow?.name}</strong> as{" "}
						<Badge
							color={
								actionType === "Active"
									? "success"
									: actionType === "Inactive"
									? "warning"
									: "danger"
							}
							pill>
							{actionType}
						</Badge>
						?
					</ModalBody>
					<ModalFooter>
						<Button
							color='secondary'
							onClick={toggleModal}>
							Cancel
						</Button>
						<Button
							color={
								actionType === "Active"
									? "success"
									: actionType === "Inactive"
									? "warning"
									: "danger"
							}
							onClick={handleAction}>
							Yes, Change Status
						</Button>
					</ModalFooter>
				</Modal>
			</CardBody>
		</Card>
	);
};

export default TeamListTable;
