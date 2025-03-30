"use client";
import { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { AnnouncementsTitle } from "@/Constant";
import DataTable from "react-data-table-component";
import { getAnnouncements } from "@/app/api/admin/announcements";
import CreateAnnouncementModal from "./CreateAnnouncement/CreateAnnouncementModal";
import { announcementTableColumns } from "@/Data/Admin/Announcements/Announcement";
import { IAnnouncement } from "@/Types/Announcement.type";

const AnnouncementsListTable = () => {
	const [filterText, setFilterText] = useState("");
	const [announcementsData, setAnnouncementsData] = useState<IAnnouncement[]>(
		[]
	);
	const [loading, setLoading] = useState(true);

	const fetchAnnouncements = async () => {
		try {
			const data = await getAnnouncements();
			setAnnouncementsData(data);
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
			<CommonCardHeader title={AnnouncementsTitle} />
			<CardBody>
				<div className="d-flex w-100 justify-content-between">
					<FilterComponent
						filterText={filterText}
						onFilter={(e) => setFilterText(e.target.value)}
					/>
					<CreateAnnouncementModal fetchData={fetchAnnouncements} />
				</div>
				<div className="table-responsive custom-scrollbar mt-3">
					{loading ? (
						<div>Loading...</div>
					) : (
						<DataTable
							data={filteredItems}
							columns={announcementTableColumns}
							striped
							fixedHeader
							fixedHeaderScrollHeight="400px"
							className="display"
						/>
					)}
				</div>
			</CardBody>
		</Card>
	);
};

export default AnnouncementsListTable;
