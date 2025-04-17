import { useEffect, useState } from "react";
import { TeamListType, UserProps } from "@/Types/Team.type";
import DataTable, { TableColumn } from "react-data-table-component";
import FilterComponent from "@/CommonComponent/FilterComponent";
import FilterDropdown from "@/CommonComponent/FilterDropdown";
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
	const [filterText, setFilterText] = useState("");
	const [filterRole, setFilterRole] = useState<string>("");
	const [filterStatus, setFilterStatus] = useState<string>("");
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const navigate = useRouter();

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
			toggleModal();
			toast.success(`User status updated to ${actionType}`);
			fetchData();
		} catch (error) {
			console.error("Status update error:", error);
			toast.error("Failed to update user status");
		}
	};

	const getUniqueOptions = (key: keyof UserProps): string[] => {
		return Array.from(
			new Set(
				teamListTableData
					.map((item) => item[key])
					.filter(
						(val): val is string => typeof val === "string" && val.trim() !== ""
					)
			)
		);
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
							className='fw-bold fs-6 text-dark'>
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
			selector: (row) => row.role,
			sortable: true,
			center: true,
			cell: (row) => <span className='fw-semibold'>{row.role}</span>,
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

	const filteredItems: UserProps[] = teamListTableData
		.filter((item: UserProps) =>
			Object.values(item).some((value) =>
				value?.toString().toLowerCase().includes(filterText.toLowerCase())
			)
		)
		.filter((item) => (filterRole ? item.role === filterRole : true))
		.filter((item) => (filterStatus ? item.status === filterStatus : true));

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await getUsers();
			setTeamListTableData(response || []);
		} catch (error) {
			toast.error("Error fetching Team Data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Card>
			<CardBody>
				<div className='d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4'>
					<FilterComponent
						onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
							setFilterText(e.target.value)
						}
						filterText={filterText}
					/>
					<div
						style={{
							padding: "0.5rem 0",
							transition: "all 0.3s ease",
							opacity: showFilters ? 1 : 0,
							visibility: showFilters ? "visible" : "hidden",
							transform: showFilters ? "scaleY(1)" : "scaleY(0)",
							transformOrigin: "top",
							height: "auto",
						}}>
						<div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3'>
							<div className='d-flex gap-3 flex-wrap justify-content-center align-items-center'>
								<FilterDropdown
									label='Role'
									options={getUniqueOptions("role")}
									value={filterRole}
									onChange={(e) => setFilterRole(e)}
								/>
								<FilterDropdown
									label='Status'
									options={getUniqueOptions("status")}
									value={filterStatus}
									onChange={(e) => setFilterStatus(e)}
								/>
								<Button
									color='outline-primary'
									className='h-100'
									onClick={() => {
										setFilterRole("");
										setFilterStatus("");
										setFilterText("");
									}}>
									Clear Filters
								</Button>
							</div>
						</div>
					</div>
					<Button
						color='outline-primary'
						size='sm'
						className='mb-3'
						onClick={() => setShowFilters((prev) => !prev)}>
						{showFilters ? "Hide Filters" : "Show Filters"}
					</Button>
				</div>
				<DataTable
					className='custom-scrollbar'
					data={filteredItems}
					columns={teamListColumns}
					progressPending={loading}
					pagination
					onRowClicked={(row: any) => navigate.push(`/admin/users/${row._id}`)}
				/>

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
