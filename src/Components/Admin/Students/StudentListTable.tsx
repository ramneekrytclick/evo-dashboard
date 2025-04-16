import FilterComponent from "@/CommonComponent/FilterComponent";
import { MentorDataProps } from "@/Types/Mentor.type";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
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
import { approveUser, updateUserStatus } from "@/app/api/admin/team";
import { getStudents } from "@/app/api/admin/students";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

const MentorListTable = () => {
	const [loading, setLoading] = useState(true);
	const [filterText, setFilterText] = useState("");
	const [mentorTableData, setMentorTableData] = useState<MentorDataProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<MentorDataProps | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [actionType, setActionType] = useState<
		"Active" | "Inactive" | "Banned"
	>("Active");

	const toggleModal = () => setModalOpen(!modalOpen);

	const openStatusModal = (
		row: MentorDataProps,
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
			toast.success(`${selectedRow.name}'s status updated to ${actionType}`);
			toggleModal();
			fetchData();
		} catch (error) {
			console.log("Status update error:", error);
			toast.error("Failed to update status");
		}
	};

	const mentorTableColumns: TableColumn<MentorDataProps>[] = [
		{
			name: "Photo",
			selector: (row) => row.photo || "",
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
			name: "Status",
			selector: (row) => row.status,
			sortable: true,
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

	const filteredItems: MentorDataProps[] = mentorTableData?.filter(
		(item: MentorDataProps) => {
			return Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			);
		}
	);

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await getStudents();
			setMentorTableData(response);
		} catch (error) {
			console.log(error);
			toast.error("Failed to fetch data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	const navigate = useRouter();

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
					data={filteredItems}
					columns={mentorTableColumns}
					striped={true}
					fixedHeaderScrollHeight='40vh'
					progressPending={loading}
					pagination
					onRowClicked={(row: any) => {
						navigate.push(`/admin/users/${row._id}`);
					}}
				/>
			</CardBody>

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
		</Card>
	);
};

export default MentorListTable;
