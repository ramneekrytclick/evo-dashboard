import {
	Button,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Badge,
} from "reactstrap";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { EmployerProps } from "@/Types/Employer.type";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { getEmployers } from "@/app/api/admin/employers";
import { updateUserStatus } from "@/app/api/admin/team";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

const EmployerListTable = () => {
	const [loading, setLoading] = useState(true);
	const [filterText, setFilterText] = useState("");
	const [employers, setEmployers] = useState<EmployerProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<EmployerProps | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [actionType, setActionType] = useState<
		"Active" | "Inactive" | "Banned"
	>("Active");

	const toggleModal = () => setModalOpen(!modalOpen);

	const openStatusModal = (
		row: EmployerProps,
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
			toast.success(`${selectedRow.name} status updated to ${actionType}`);
			fetchEmployers();
		} catch (error) {
			console.log("Status update error:", error);
			toast.error("Failed to update status");
		}
	};

	const customTableStyles = {
		rows: { style: { fontSize: "1rem" } },
		headCells: { style: { fontSize: "1.05rem", fontWeight: "600" } },
		cells: { style: { fontSize: "1rem" } },
	};

	const employerTableColumns: TableColumn<EmployerProps>[] = [
		{
			name: "User",
			selector: (row) => row.name || "",
			sortable: true,
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
						<Link
							className='text-dark fw-bold d-flex align-items-center gap-2'
							href={`/admin/users/${row._id}`}>
							<Image
								src={photoURL}
								alt={row.name}
								width={50}
								height={50}
								style={{ borderRadius: "50%", objectFit: "cover" }}
							/>

							{row.name}
						</Link>
					</>
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
			name: "Company",
			center: true,
			selector: (row) => row.companyName,
			sortable: true,
		},
		{
			name: "Status",
			center: true,
			sortable: true,
			selector: (row) => row.status,
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
			sortable: false,
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
		},
	];

	const filteredItems = employers?.filter((item: EmployerProps) =>
		Object.values(item).some(
			(value) =>
				value &&
				value.toString().toLowerCase().includes(filterText.toLowerCase())
		)
	);

	const fetchEmployers = async () => {
		try {
			setLoading(true);
			const response = await getEmployers();
			setEmployers(response);
		} catch (error) {
			console.log(error);
			toast.error("Error fetching Employer Data");
		} finally {
			setLoading(false);
		}
	};
	const navigate = useRouter();
	useEffect(() => {
		fetchEmployers();
	}, []);

	return (
		<Card>
			<CardBody>
				<FilterComponent
					onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFilterText(e.target.value)
					}
					filterText={filterText}
				/>
				<div className='table-responsive custom-scrollbar user-datatable mt-3'>
					<DataTable
						data={filteredItems}
						columns={employerTableColumns}
						striped
						fixedHeaderScrollHeight='40vh'
						progressPending={loading}
						pagination
						onRowClicked={(row: any) => {
							navigate.push(`/admin/users/${row._id}`);
						}}
						customStyles={customTableStyles}
					/>
				</div>
				<Modal
					isOpen={modalOpen}
					toggle={toggleModal}
					centered>
					<ModalHeader toggle={toggleModal}>Confirm Status Change</ModalHeader>
					<ModalBody>
						Are you sure you want to set <strong>{selectedRow?.name}</strong> as
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

export default EmployerListTable;
