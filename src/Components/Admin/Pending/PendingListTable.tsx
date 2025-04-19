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
import FilterDropdown from "@/CommonComponent/FilterDropdown";
import { getImageURL } from "@/CommonComponent/imageURL";

const PendingListTable = () => {
	const [loading, setLoading] = useState(false);
	const [teamListTableData, setTeamListTableData] = useState<UserProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<TeamListType | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [filterText, setFilterText] = useState("");
	const [filterRole, setFilterRole] = useState<string>("");
	const [filterStatus, setFilterStatus] = useState<string>("");
	const [filterMode, setFilterMode] = useState<string>("");
	const [showFilters, setShowFilters] = useState(false);
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

	const customTableStyles = {
		rows: { style: { fontSize: "1rem" } },
		headCells: { style: { fontSize: "1.05rem", fontWeight: "600" } },
		cells: { style: { fontSize: "1rem" } },
	};

	const teamListColumns: TableColumn<TeamListType>[] = [
		{
			name: "User",
			selector: (row) => row.photo,
			center: true,
			cell: (row) => {
				return (
					<div className='d-flex align-items-center gap-2'>
						<Image
							src={getImageURL(row.photo)}
							alt={row.name}
							width={50}
							height={50}
							style={{ borderRadius: "50%", objectFit: "cover" }}
						/>
						<Link
							href={`/admin/users/${row._id}`}
							className='fw-bold fs-5 text-dark'>
							{row.name}
						</Link>
					</div>
				);
			},
		},
		{
			name: "Email",
			selector: (row) => row.email,
			cell: (row) => (
				<a
					className='text-nowrap'
					href={`mailto:${row.email}`}>
					{row.email.substring(0, 11).concat("...")}
				</a>
			),
			sortable: true,
			center: true,
		},
		{
			name: "Contact",
			selector: (row) => row.contactNumber,
			cell: (row) => row.contactNumber || "N/A",
			center: true,
		},
		{
			name: "Role",
			selector: (row) => row.role,
			center: true,
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
			center: true,
		},
		{
			name: "Mode",
			selector: (row) => row.workingMode,
			center: true,
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
			center: true,
			width: "150px",
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

	const filteredItems = teamListTableData
		.filter((item) =>
			Object.values(item).some((val) =>
				val?.toString().toLowerCase().includes(filterText.toLowerCase())
			)
		)
		.filter((item) => (filterRole ? item.role === filterRole : true))
		.filter((item) => (filterStatus ? item.status === filterStatus : true))
		.filter((item) => (filterMode ? item.workingMode === filterMode : true));

	return (
		<Card>
			<CardBody>
				<div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 mt-3'>
					<FilterComponent
						filterText={filterText}
						onFilter={(e) => setFilterText(e.target.value)}
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
								<FilterDropdown
									label='Mode'
									options={getUniqueOptions("workingMode")}
									value={filterMode}
									onChange={(e) => setFilterMode(e)}
								/>
								<Button
									color='outline-primary'
									className='h-100'
									onClick={() => {
										setFilterRole("");
										setFilterStatus("");
										setFilterMode("");
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
					columns={teamListColumns}
					data={filteredItems}
					progressPending={loading}
					pagination
					striped
					responsive
					onRowClicked={(row: any) => navigate.push(`/admin/users/${row._id}`)}
					customStyles={customTableStyles}
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
							color='outline-success'
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
