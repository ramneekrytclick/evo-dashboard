import { Card, CardBody, Col } from "reactstrap";
import ReactCalendarTimeline from "react-calendar-timeline";
import moment from "moment";
import DashboardCommonHeader from "../../Common/DashboardCommonHeader";
import { Schedules } from "@/Constant";
import { onlineTimelineGroup, onlineTimelineItems } from "@/Data/General/Dashboard/DefaultDashboard";

const Schedule = () => {
  return (
    <Col xl={4}>
      <Card className="schedule">
        <DashboardCommonHeader cardClass="pb-0" title={Schedules} />
        <CardBody>
          <div className="timeline-calendar custom-scrollbar">
            <div className="custom-calendar" id="calendar-container">
              <div className="time-line" id="calendar">
                <ReactCalendarTimeline
                  groups={onlineTimelineGroup}
                  items={onlineTimelineItems}
                  defaultTimeStart={moment().add(-12, "hour")}
                  defaultTimeEnd={moment().add(12, "hour")}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Schedule;