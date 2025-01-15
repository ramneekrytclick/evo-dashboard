import { Continue, Previous } from "@/Constant";
import { LessonFormProps } from "@/Types/Lesson.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Form, Input, Label, Row, Button } from "reactstrap";

interface VideosFormProps {
	activeCallBack: (tab: number) => void;
	data: LessonFormProps;
	setData: (data: LessonFormProps) => void;
}

const VideosForm = ({ activeCallBack, data, setData }: VideosFormProps) => {
	const [videos, setVideos] = useState<{ title: string; videoURL: string }[]>(
		[]
	);

	const [formData, setFormData] = useState({ title: "", videoURL: "" });

	const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const addVideoEntry = () => {
		if (formData.title.trim() && formData.videoURL.trim()) {
			setVideos([...videos, { ...formData }]);
			setFormData({ title: "", videoURL: "" }); // Clear input fields after adding
		}
	};

	const removeVideoEntry = (index: number) => {
		const updatedVideos = videos.filter((_, i) => i !== index);
		setVideos(updatedVideos);
	};

	useEffect(() => {
		setData({ ...data, videos }); // Sync videos with parent data
	}, [videos]);

    const handleNextButton =()=>{
        if (videos.length>0) {
            activeCallBack(3);
        }
        else {
            toast("Add at least 1 video")
        }
    }
	return (
		<Form
			onSubmit={(e) => e.preventDefault()}
			className="needs-validation"
			noValidate>
			<Row className="g-3">
				<Col sm={6}>
					<Label>
						{"Video Title"}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="text"
						placeholder="Video Title"
						value={formData.title}
						name="title"
						onChange={updateFormData}
					/>
				</Col>
				<Col sm={6}>
					<Label>
						{"Video URL"}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="text"
						placeholder="Video URL"
						value={formData.videoURL}
						name="videoURL"
						onChange={updateFormData}
					/>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<Button
						color="primary"
						onClick={addVideoEntry}>
						Add Video
					</Button>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<ul>
						{videos.map((video, index) => (
							<li
								key={index}
								className="my-2 p-2 bg-light text-dark rounded-3">
                                    <Row>
                                        <Col sm={11}>
                                            <strong>{video.title}</strong> ( {video.videoURL} )
                                        </Col>
                                        <Col sm={1}>
                                            <Button
                                                color="danger"
                                                size="sm"
                                                className="ms-2 text-end"
                                                onClick={() => removeVideoEntry(index)}>
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
							</li>
						))}
					</ul>
				</Col>
			</Row>
			<Col xs={12} className="text-end">
                    <Button color="primary" className='me-2' onClick={() => activeCallBack(1)}>{Previous}</Button>
                    <Button color="primary" onClick={handleNextButton}>{Continue}</Button>
                </Col>
		</Form>
	);
};

export default VideosForm;
