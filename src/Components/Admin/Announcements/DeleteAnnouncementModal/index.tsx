"use client"
import { createAnnouncementTitle, CrocsLogin, deleteAnnoucementConfirmTitle, ImagePath } from "@/Constant";
import React, { useState } from "react";
import { Button } from "reactstrap";

import CommonModal from "@/CommonComponent/CommonModal";
import { IAnnouncement } from "@/Types/Announcement.type";
import { deleteAnnouncement } from "@/app/api/admin/announcements";
import Image from "next/image";

const DeleteAnnouncementModal = ({id}:{id:string}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const ModalData = {
		isOpen: modal,
		toggler: toggle,
		center:true,
		bodyClass: "dark-sign-up social-profile text-start",
	};
    const handleDelete = async ()=>{
        try{
            const response = await deleteAnnouncement(id);
            alert(response.message);
        }        
        catch(error){
            console.error(error);
            alert("Error Deleting");
        }
    }
	return (
		<>
			<Button
				color="danger"
				className="me-2 px-2"
				onClick={toggle}>
				{/* <i className="fa fa-plus me-2" /> */}
				{/* <i className="icon-pencil-alt" /> */}
				<i className="icon-trash" />
			</Button>
			{/* <i className="icon-pencil-alt" onClick={toggle}/> */}
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper text-center">
					<h3 className="mb-3">{deleteAnnoucementConfirmTitle}</h3>
					<Image width={100} height={100} src={`${ImagePath}/gif/danger.gif`} alt="error" />
					<div className="block text-center">
						<Button outline color="danger" onClick={toggle}>Close</Button>
						<Button color="danger" onClick={handleDelete}>Confirm</Button>
					</div>
				</div>
			</CommonModal>
		</>
	);
};
export default DeleteAnnouncementModal;