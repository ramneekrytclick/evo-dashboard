import { useEffect, useState } from "react";
import { MentorInitialValue } from "@/Types/Mentor.type";
import DataTable, { TableColumn } from "react-data-table-component";
import FilterComponent from "@/CommonComponent/FilterComponent";
import FilterDropdown from "@/CommonComponent/FilterDropdown";
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
import { getMentors } from "@/app/api/admin/mentors";
import { updateUserStatus } from "@/app/api/admin/team";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getImageURL } from "@/CommonComponent/imageURL";

const MentorListTable = () => {
	const [loading, setLoading] = useState(false);
	const [filterText, setFilterText] = useState("");
	const [mentorTableData, setMentorTableData] = useState<MentorInitialValue[]>(
		[]
	);
	const [selectedRow, setSelectedRow] = useState<MentorInitialValue | null>(
		null
	);
	const [modalOpen, setModalOpen] = useState(false);
	const [actionType, setActionType] = useState<
		"Active" | "Inactive" | "Banned"
	>("Active");
	const [filterStatus, setFilterStatus] = useState<string>("");
	const [showFilters, setShowFilters] = useState(false);
	const navigate = useRouter();

	const toggleModal = () => setModalOpen(!modalOpen);

	const openStatusModal = (
		row: MentorInitialValue,
		action: "Active" | "Inactive" | "Banned"
	) => {
		setSelectedRow(row);
		setActionType(action);
		setModalOpen(true);
	};

	const handleAction = async () => {
		if (!selectedRow) return;
		try {
			await updateUserStatus(selectedRow._id || "", actionType);
			toggleModal();
			toast.success(`${selectedRow.name}'s status updated to ${actionType}`);
			fetchData();
		} catch (error) {
			toast.error("Failed to update status");
		}
	};

	const getUniqueOptions = (key: keyof MentorInitialValue): string[] => {
		return Array.from(
			new Set(
				mentorTableData
					.map((item) => item[key])
					.filter(
						(val): val is string => typeof val === "string" && val.trim() !== ""
					)
			)
		);
	};

	const mentorTableColumns: TableColumn<MentorInitialValue>[] = [
		{
			name: "Photo",
			selector: (row) => row.photo,
			cell: (row) => {
				return (
					<Image
						src={getImageURL(row.photo)}
						alt={row.name}
						width={50}
						height={50}
						style={{ borderRadius: "50%", objectFit: "cover" }}
					/>
				);
			},
			width: "80px",
		},
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
			cell: (row) => (
				<Link
					className='text-dark fw-bold'
					href={`/admin/users/${row._id}`}>
					{row.name}
				</Link>
			),
		},
		{
			name: "Email",
			center: true,
			selector: (row) => row.email,
			sortable: true,
			cell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
		},
		{
			name: "Expertise",
			selector: (row) => row.expertise || "-",
			center: true,
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
			sortable: false,
			center: true,
			cell: (row) => (
				<div className='d-flex gap-1 text-nowrap'>
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

	const filteredItems = mentorTableData
		.filter((item) =>
			Object.values(item).some((val) =>
				val?.toString().toLowerCase().includes(filterText.toLowerCase())
			)
		)
		.filter((item) => (filterStatus ? item.status === filterStatus : true));

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await getMentors();
			setMentorTableData(response);
		} catch (error) {
			toast.error("Error fetching Mentor Data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const customTableStyles = {
		rows: { style: { fontSize: "1rem" } },
		headCells: { style: { fontSize: "1.05rem", fontWeight: "600" } },
		cells: { style: { fontSize: "1rem" } },
	};

	return (
		<Card>
			<CardBody>
				<div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 mt-3'>
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
						<div className='d-flex flex-wrap gap-3 align-items-center'>
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
									setFilterStatus("");
									setFilterText("");
								}}>
								Clear Filters
							</Button>
						</div>
					</div>
					<Button
						color='outline-primary'
						size='sm'
						onClick={() => setShowFilters((prev) => !prev)}>
						{showFilters ? "Hide Filters" : "Show Filters"}
					</Button>
				</div>
				<DataTable
					data={filteredItems}
					columns={mentorTableColumns}
					progressPending={loading}
					striped
					fixedHeaderScrollHeight='40vh'
					pagination
					onRowClicked={(row: any) => navigate.push(`/admin/users/${row._id}`)}
					customStyles={customTableStyles}
				/>
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
							color='outline-primary'
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

export default MentorListTable;
