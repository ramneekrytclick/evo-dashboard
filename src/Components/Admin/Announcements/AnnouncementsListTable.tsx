"use client";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { AnnouncementsTitle } from "@/Constant";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody } from "reactstrap";
import { announcementTableColumns } from "@/Data/Admin/Announcements/Announcement";
import { IAnnouncement } from "@/Types/Announcement.type";
import { getAnnouncements } from "@/app/api/admin/announcements";
import { announcementFakeData } from "@/FakeData/admin/announcements";

const AnnouncementsListTable = () => {
	const [filterText, setFilterText] = useState("");
	const [announcementsData, setAnnouncementsData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const filteredItems: IAnnouncement[] = announcementsData?.filter(
		(item: IAnnouncement) => {
			return Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			);
		}
	);
	const fetchAnnouncements = async (): Promise<void> => {
		try {
			const data = await getAnnouncements();
			// console.log(data);
			setAnnouncementsData(announcementFakeData);
			// setAnnouncementsData(data?.announcements);
		} catch (error) {
			console.error("Failed to fetch announcements:", error);
			setAnnouncementsData([]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchAnnouncements();
	}, []);
	return (
		<Card>
			<CommonCardHeader
				headClass="pb-0 card-no-border"
				title={AnnouncementsTitle}
			/>
			<CardBody>
				<FilterComponent
					onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFilterText(e.target.value)
					}
					filterText={filterText}
				/>
				<div
					className="table-responsive custom-scrollbar user-datatable mt-3"
					aria-busy={loading}>
					{loading ? (
						<div>Loading..</div>
					) : (
						<DataTable
							data={filteredItems}
							columns={announcementTableColumns}
							striped
							fixedHeader
							fixedHeaderScrollHeight="40vh"
							className="display"
						/>
					)}
				</div>
			</CardBody>
		</Card>
	);
};

export default AnnouncementsListTable;
