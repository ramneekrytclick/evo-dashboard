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
} from "reactstrap";

import Link from "next/link";
import { approveUser } from "@/app/api/admin/team";
import { getStudents } from "@/app/api/admin/students";

const MentorListTable = () => {
	const [filterText, setFilterText] = useState("");
	const [mentorTableData, setMentorTableData] = useState<MentorDataProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<MentorDataProps | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const toggleModal = () => setModalOpen(!modalOpen);
	const openApproveModal = (row: MentorDataProps) => {
		setSelectedRow(row);
		setModalOpen(true);
	};
	const handleAction = async (action: string) => {
		if (!selectedRow) return;
		try {
			await approveUser(selectedRow._id, action);
			toggleModal();
			fetchData();
		} catch (error) {
			console.log("Approval error:", error);
		}
	};
	const mentorTableColumns: TableColumn<MentorDataProps>[] = [
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
			center: false,
			cell: (row) => (
				<>
					<Link
						className="text-dark fw-bold"
						href={`/admin/users/${row._id}`}>
						{row.name}
					</Link>
				</>
			),
		},
		{
			name: "Email",
			selector: (row) => row.email,
			sortable: true,
			center: false,
		},
		{
			name: "Action",
			sortable: true,
			center: false,
			cell: (row) => (
				<>
					Certificate option
					{/* <Button
						onClick={() => {
							openApproveModal(row);
						}}
						color={row.isApproved ? "danger" : "success"}>
						{row.isApproved ? "Disapprove" : "Approve"}
					</Button> */}
				</>
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
			const response = await getStudents();
			const data = response;
			// console.log(data);
			setMentorTableData(data);
			// setMentorTableData(mentorFakeData);
		} catch (error) {
			console.log(error);
			// setMentorTableData(mentorFakeData);
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
				{/* <div className="table-responsive custom-scrollbar user-datatable mt-3"> */}
				<DataTable
					data={filteredItems}
					columns={mentorTableColumns}
					striped={true}
					// fixedHeader
					fixedHeaderScrollHeight="40vh"
					// className="display"
					pagination
				/>
				{/* </div> */}
			</CardBody>
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				centered>
				<ModalHeader toggle={toggleModal}>
					Confirm {selectedRow?.isApproved ? "Disapproval" : "Approval"}
				</ModalHeader>
				<ModalBody>
					Are you sure you want to{" "}
					{selectedRow?.isApproved ? "disapprove" : "approve"}{" "}
					<strong>{selectedRow?.name}</strong> as a{" "}
					<strong>{selectedRow?.role}</strong>?
				</ModalBody>
				<ModalFooter>
					<Button
						color="secondary"
						onClick={toggleModal}>
						Cancel
					</Button>
					<Button
						color={selectedRow?.isApproved ? "danger" : "success"}
						onClick={() => {
							handleAction(selectedRow?.isApproved ? "disapprove" : "approve");
						}}>
						Yes, {selectedRow?.isApproved ? "Disapprove" : "Approve"}
					</Button>
				</ModalFooter>
			</Modal>
		</Card>
	);
};

export default MentorListTable;
