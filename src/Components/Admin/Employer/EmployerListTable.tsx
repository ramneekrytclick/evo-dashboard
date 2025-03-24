import {
	Button,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { EmployerProps } from "@/Types/Employer.type";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { getEmployers } from "@/app/api/admin/employers";
import { approveUser } from "@/app/api/admin/team";
import { toast } from "react-toastify";

const EmployerListTable = () => {
	const [filterText, setFilterText] = useState("");
	const [employers, setEmployers] = useState<EmployerProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<EmployerProps | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const toggleModal = () => setModalOpen(!modalOpen);
	const openApproveModal = (row: EmployerProps) => {
		setSelectedRow(row);
		setModalOpen(true);
	};
	const handleAction = async (action: string) => {
		if (!selectedRow) return;
		try {
			await approveUser(selectedRow._id, action);
			toggleModal();
			toast.success(
				`${selectedRow.name} ${action}d successfully as a ${selectedRow.role}`
			);
			fetchEmployers();
		} catch (error) {
			console.log("Approval error:", error);
		}
	};
	const employerTableColumns: TableColumn<EmployerProps>[] = [
		{
			name: "Name",
			selector: (row) => row["name"],
			sortable: true,
			center: false,
			cell: (row) => row.name,
		},
		{
			name: "Email",
			selector: (row) => row["email"],
			sortable: true,
			center: false,
			cell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
		},
		{
			name: "Company",
			selector: (row) => row["companyName"],
			sortable: true,
			center: false,
		},
		{
			name: "Action",
			sortable: false,
			center: false,
			cell: (row) => (
				<>
					<Button
						onClick={() => {
							openApproveModal(row);
						}}
						color={row.isApproved ? "danger" : "success"}>
						{row.isApproved ? "Disapprove" : "Approve"}
					</Button>
				</>
			),
		},
	];

	const filteredItems: EmployerProps[] = employers?.filter(
		(item: EmployerProps) => {
			return Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			);
		}
	);
	const fetchEmployers = async () => {
		try {
			const response = await getEmployers();
			console.log("====================================");
			console.log(response);
			console.log("====================================");
			setEmployers(response);
			// setEmployers(employerFakeData);
		} catch (error) {
			console.log(error);
		}
		// setEmployers(employerFakeData);
	};
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
				<div className="table-responsive custom-scrollbar user-datatable mt-3">
					<DataTable
						data={filteredItems}
						columns={employerTableColumns}
						striped={true}
						fixedHeaderScrollHeight="40vh"
						pagination
					/>
				</div>
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

export default EmployerListTable;
