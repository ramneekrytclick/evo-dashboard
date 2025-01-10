import React from 'react'
import { Col, Input, Row } from 'reactstrap'

const TeamListBody = () => {
    const tableListBodyData= [
        {
          name: "Choose Role",
          options: ["Manager", "Mentor", "Student", "Admin", "Creator", "Employer"],
        },
        {
          name: "Choose Name",
          options: ["John Doe", "Jane Smith", "Alice Brown", "Bob Johnson", "Charlie Davis"],
        },
        {
          name: "Choose Email",
          options: [
            "johndoe@example.com",
            "janesmith@example.com",
            "alicebrown@example.com",
            "bobjohnson@example.com",
            "charliedavis@example.com",
          ],
        },
        {
          name: "Choose Status",
          options: ["Active", "Inactive", "On Leave"],
        },
      ];
      
    return (
        <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
            {tableListBodyData.map((item, index) => (
                <Col key={index}>
                    <Input type="select">
                        <option value=''>{item.name}</option>
                        {item.options.map((data, id) => (
                            <option key={id} value={id + 1}>{data}</option>
                        ))}
                    </Input>
                </Col>
            ))}
        </Row>
    )
}
export default TeamListBody;