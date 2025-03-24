import FilterComponent from "@/CommonComponent/FilterComponent";
import { MentorDataProps } from "@/Types/Mentor.type";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
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

const MentorListTable = () => {
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
		},
		{
			name: "Status",
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
			cell: (row) => (
				<div className="d-flex gap-1">
					<Button
						color={row.status === "Active" ? "warning" : "success"}
						size="sm"
						onClick={() =>
							openStatusModal(
								row,
								row.status === "Active" ? "Inactive" : "Active"
							)
						}>
						{row.status === "Active" ? "Deactivate" : "Activate"}
					</Button>
					<Button
						color="danger"
						size="sm"
						onClick={() => openStatusModal(row, "Banned")}>
						Ban
					</Button>
				</div>
			),
		},
	];

	const filteredItems: MentorDataProps[] = mentorTableData?.filter(
		(item: MentorDataProps) =>
			Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			)
	);

	const fetchData = async () => {
		try {
			const response = await getMentors();
			setMentorTableData(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
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
				<DataTable
					data={filteredItems}
					columns={mentorTableColumns}
					striped
					fixedHeaderScrollHeight="40vh"
					pagination
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
							color="secondary"
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
