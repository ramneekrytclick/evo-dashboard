"use client"
import { getSubcategories } from "@/app/api/admin/subcategories";
import { Subcategory } from "@/Types/Category.type";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

const SubcategoriesCards = ({id}:{id:string}) => {
    const [subcategories, setSubcategories] = useState([]);
    const fetchSubcategories =async ()=>{
        try {
            const response = await getSubcategories(id);
            setSubcategories(response.subcategories);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        fetchSubcategories();
    },[])
    return (
        <Row className="g-sm-4 g-3">
			{subcategories.map((item: Subcategory) => (
				<Col
					xl={4}
					md={6}
					key={item._id}>
					<div className="prooduct-details-box d-flex gap-3">
						<div className="d-flex gap-3">
							{item.name}
						</div>
					</div>
				</Col>
			))}
		</Row>
    );
}

export default SubcategoriesCards;