"use client";

import { getPromoCodes } from "@/app/api/admin/promo-codes";
import { PromoCodeProps } from "@/Types/Course.type";
import { Fragment, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import CreatePromocodeModal from "./CreatePromocodeModal";

import DeletePromocodeModal from "./DeletePromocodeModal";
import UpdatePromocodeModal from "./UpdatePromocodeModal";


const PromocodesCards = () => {
  const [promocodes, setPromocodes] = useState<PromoCodeProps[]>([]);
  const [editPromoCodeData, setEditPromoCodeData] = useState<PromoCodeProps | null>(null);

  const fetchPromoCodes = async () => {
    try {
      const response = await getPromoCodes();
      setPromocodes(response.promoCodes);
    } catch (error) {
      console.error("Failed to fetch promo codes:", error);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  return (
    <Col>
      <Row sm={6} className="ms-1 mb-4">
        <CreatePromocodeModal fetchData={fetchPromoCodes} />
      </Row>
      <Row>
        {promocodes.map(
          (promoCode, index) => {
			const { _id, code, discountPercentage, expiryDate, usageLimit, usedCount }=promoCode;
			return(
            <Col sm={6} xl={4} className="my-2" key={index}>
              <div className="border border-1 height-equal h-100 ribbon-wrapper-bottom alert-light-light">
                <div className="ribbon ribbon-dark ribbon-clip-bottom">
                  {discountPercentage}% OFF
                </div>
                <p>
                  <Fragment>
                    Promo Code: <strong>{code}</strong>
                  </Fragment>
                  <br />
                  <Fragment>
                    Expiry Date:{" "}
                    <em className="txt-danger">
                      {new Date(expiryDate).toLocaleDateString()}
                    </em>
                  </Fragment>
                  <br />
                  <Fragment>
                    Usage Limit: {usageLimit} | Used: {usedCount}
                  </Fragment>
                </p>
                <div className="d-flex justify-content-end mt-3 gap-2">
                  <UpdatePromocodeModal values={promoCode} fetchData={fetchPromoCodes}/>
                  <DeletePromocodeModal id={_id!} fetchData={fetchPromoCodes}/>
                </div>
              </div>
            </Col>
          )}
        )}
      </Row>
    </Col>
  );
};

export default PromocodesCards;
