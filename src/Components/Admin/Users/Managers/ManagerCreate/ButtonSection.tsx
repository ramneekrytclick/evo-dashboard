import { Add, Cancel } from '@/Constant'
import Link from 'next/link'
import React from 'react'
import { Button, Col, Row } from 'reactstrap'

const ButtonSection = () => {
  return (
    <Row>
      <Col>
        <div className="text-end">
          <Button color="success" className="me-3">{Add}</Button>
          <Link href={'/users/managers/manager_list'}>
            <Button color="danger">{Cancel}</Button>
          </Link>
        </div>
      </Col>
    </Row >
  )
}

export default ButtonSection