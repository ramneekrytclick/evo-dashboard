import SVG from '@/CommonComponent/SVG';
import { ImagePath } from '@/Constant';
import { mentorListData } from '@/Data/Admin/Users/Mentor/Mentor'; // Ensure the mentor data is correctly imported
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, Col } from 'reactstrap';

const MentorProfileCards = () => {
    return (
        <>
            {mentorListData.map((item) => (
                <Col sm={6} xxl={3} xl={4} className="col-ed-4 box-col-4" key={item.id}>
                    <Card className="social-profile">
                        <CardBody>
                            <div className="social-img-wrap">
                                <div className="social-img">
                                    <Image src={`${ImagePath}/${item.photo}`} alt="profile" width={68} height={68} />
                                </div>
                                <div className="edit-icon">
                                    <SVG iconId="profile-check" />
                                </div>
                            </div>
                            <div className="social-details">
                                <h5 className="mb-1">
                                    <Link href={'/app/social_app'}>{item.name}</Link>
                                </h5>
                                <span className="f-light">{item.email}</span>
                                <p className="mt-2">{item.about}</p>

                                <ul className="list-unstyled mt-3">
                                    <li>
                                        <strong>Date of Birth:</strong> {item.dob}
                                    </li>
                                    <li>
                                        <strong>Username:</strong> {item.username}
                                    </li>
                                    <li>
                                        <strong>Contact:</strong> {item.contactNumber}
                                    </li>
                                    <li>
                                        <strong>Address:</strong> {item.address}
                                    </li>
                                    <li>
                                        <strong>Working Mode:</strong> {item.workingMode}
                                    </li>
                                    <li>
                                        <strong>Education:</strong> {item.education}
                                    </li>
                                    <li>
                                        <strong>Expertise:</strong> {item.expertise}
                                    </li>
                                </ul>

                                <div className="mt-3">
                                    <strong>Assigned Batches:</strong>
                                    <ul className="assigned-list">
                                        {item.assignedBatches?.map((batch, index) => (
                                            <li key={index}>{batch}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-3">
                                    <strong>Courses:</strong>
                                    <ul className="assigned-list">
                                        {item.courses?.map((course, index) => (
                                            <li key={index}>{course}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default MentorProfileCards;