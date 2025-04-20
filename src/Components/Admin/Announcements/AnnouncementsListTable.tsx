"use client";
import { useEffect, useState } from "react";
import {
	Badge,
	Button,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Spinner,
	UncontrolledTooltip,
} from "reactstrap";
import FilterComponent from "@/CommonComponent/FilterComponent";
import DataTable, { TableColumn } from "react-data-table-component";
import {
	deleteAnnouncement,
	getAnnouncements,
} from "@/app/api/admin/announcements";
import CreateAnnouncementModal from "./CreateAnnouncement/CreateAnnouncementModal";
import { IAnnouncement } from "@/Types/Announcement.type";
import { Trash2 } from "react-feather";
import { toast } from "react-toastify";

const AnnouncementsListTable = () => {
	const [filterText, setFilterText] = useState("");
	const [announcementsData, setAnnouncementsData] = useState<IAnnouncement[]>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [announcementToDelete, setAnnouncementToDelete] =
		useState<IAnnouncement | null>(null);

	const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
	const announcementTableColumns: TableColumn<IAnnouncement>[] = [
		{
			name: "Title",
			selector: (row) => row.title,
			sortable: true,
			cell: (row) => (
				<strong style={{ whiteSpace: "nowrap" }}>{row.title}</strong>
			),
		},
		{
			name: "Description",
			selector: (row) => row.description,
			sortable: true,
			center: true,
			cell: (row) => (
				<div
					id={`desc-tooltip-${row._id}`}
					className='fs-4'
					style={{
						maxWidth: "250px",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}>
					{row.description}
					<UncontrolledTooltip
						placement='top'
						target={`desc-tooltip-${row._id}`}>
						{row.description}
					</UncontrolledTooltip>
				</div>
			),
		},
		{
			name: "Target Roles",
			center: true,
			selector: (row) => row.roles?.join(", "),
			cell: (row) => (
				<div className='d-flex flex-wrap gap-1'>
					{row.roles.length === 6 ? (
						<>
							<Badge
								color='primary'
								className='text-uppercase'>
								ALL
							</Badge>
						</>
					) : (
						row.roles?.map((role, i) => (
							<Badge
								key={i}
								color='info'
								className='text-uppercase'>
								{role}
							</Badge>
						))
					)}
				</div>
			),
		},
		{
			name: "Created At",
			center: true,

			selector: (row) =>
				new Date(row.createdAt).toLocaleDateString("en-IN", {
					day: "2-digit",
					month: "short",
					year: "numeric",
				}),
			sortable: true,
		},
		{
			name: "Actions",
			center: true,
			cell: (row) => (
				<Button
					color='danger'
					size='sm'
					onClick={() => {
						setAnnouncementToDelete(row);
						toggleDeleteModal();
					}}>
					<Trash2 size={18} />
				</Button>
			),
		},
	];
	const handleDelete = async () => {
		if (!announcementToDelete?._id) return;
		try {
			await deleteAnnouncement(announcementToDelete._id);
			toggleDeleteModal();
			fetchAnnouncements();
			toast.success("Announcement deleted successfully");
		} catch (error) {
			console.error("Failed to delete announcement:", error);
			toast.error("Failed to delete announcement");
		}
	};
	const fetchAnnouncements = async () => {
		try {
			const data = await getAnnouncements();
			setAnnouncementsData(data.reverse());
		} catch (error) {
			console.error("Error fetching announcements:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAnnouncements();
	}, []);

	const filteredItems = announcementsData.filter((item) =>
		[item.title, item.description].some((val) =>
			val?.toLowerCase().includes(filterText.toLowerCase())
		)
	);

	return (
		<Card>
			<CardBody>
				<div className='d-flex w-100 justify-content-between'>
					<FilterComponent
						filterText={filterText}
						onFilter={(e) => setFilterText(e.target.value)}
					/>
					<CreateAnnouncementModal fetchData={fetchAnnouncements} />
				</div>
				<div className='table-responsive custom-scrollbar mt-3'>
					{loading ? (
						<div>
							<Spinner />
							Loading...
						</div>
					) : (
						<DataTable
							data={filteredItems}
							columns={announcementTableColumns}
							striped
							pagination
						/>
					)}
				</div>
				{deleteModalOpen && announcementToDelete && (
					<Modal
						isOpen={deleteModalOpen}
						toggle={toggleDeleteModal}
						centered>
						<ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
						<ModalBody>
							Are you sure you want to delete the announcement titled{" "}
							<strong>{announcementToDelete.title}</strong>?
						</ModalBody>
						<ModalFooter>
							<Button
								color='outline-danger'
								onClick={toggleDeleteModal}>
								Cancel
							</Button>
							<Button
								color='danger'
								onClick={handleDelete}>
								Delete
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</CardBody>
		</Card>
	);
};

export default AnnouncementsListTable;
