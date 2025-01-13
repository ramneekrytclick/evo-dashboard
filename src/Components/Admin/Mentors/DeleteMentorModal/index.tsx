"use client"
import { deleteAnnoucementConfirmTitle, deleteMentorConfirmTitle, ImagePath } from "@/Constant";
import React, { useState } from "react";
import { Button } from "reactstrap";

import CommonModal from "@/CommonComponent/CommonModal";
import { deleteAnnouncement } from "@/app/api/admin/announcements";
import Image from "next/image";
import { deleteMentor } from "@/app/api/admin/mentors";
import { useRouter } from "next/navigation";

const DeleteMentorModal = ({id,fetchData}:{id:string,fetchData:()=>Promise<void>}) => {
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
            const response = await deleteMentor(id);
            alert(response);
            toggle();
            fetchData();
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
				<i className="icon-trash" />
			</Button>
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper text-center">
					<h3 className="mb-3">{deleteMentorConfirmTitle}</h3>
					<Image width={100} height={100} src={`${ImagePath}/gif/danger.gif`} alt="error" />
					<div className="block text-center">
						<Button outline className="me-2" color="danger" onClick={toggle}>Close</Button>
						<Button color="danger" className="ms-2" onClick={handleDelete}>Confirm</Button>
					</div>
				</div>
			</CommonModal>
		</>
	);
};
export default DeleteMentorModal;