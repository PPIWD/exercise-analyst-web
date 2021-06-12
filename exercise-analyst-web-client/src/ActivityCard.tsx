import { Card, Col, Row, Typography, Image } from "antd";
import { Exercise } from "./Exercise";
import {
  getImageUrlForActivity,
  getUserFriendlyDate,
  getDifferenceBetweenDates,
} from "./Utils";

interface ActivityCardProps {
  exercise: Exercise;
}

const ActivityCard = (props: ActivityCardProps) => {
  const { exercise } = props;
  return (
    <Card
      cover={
        <div className="activity-image">
          <Image
            src={getImageUrlForActivity(exercise.activity)}
            preview={false}
          />
          <span className="activity-text">{exercise.activity}</span>
        </div>
      }
    >
      <Row gutter={[8, 16]}>
        {/* <Col xs={24}>
          <Row justify="center" className="text-center">
            <Col xs={24}>
              <Divider plain>Activity</Divider>
            </Col>
            <Col xs={24}>
              <Typography.Text>{exercise.activity}</Typography.Text>
            </Col>
          </Row>
        </Col> */}

        {/* <Col xs={12}>
          <Row justify="center" className="text-center">
            <Col xs={24}>
              <Typography.Text disabled>Repetitions</Typography.Text>
            </Col>
            <Col xs={24}>
              <Typography.Text>{exercise.repetitions}</Typography.Text>
            </Col>
          </Row>
        </Col> */}

        <Col xs={24}>
          <Row className="text-left">
            <Col xs={3}>
              <Typography.Text disabled>Start:</Typography.Text>
            </Col>
            <Col xs={21}>
              <Typography.Text>
                {getUserFriendlyDate(exercise.dateTimeStart)}
              </Typography.Text>
            </Col>

            <Col xs={3}>
              <Typography.Text disabled>End:</Typography.Text>
            </Col>
            <Col xs={21}>
              <Typography.Text>
                {getUserFriendlyDate(exercise.dateTimeEnd)}
              </Typography.Text>
            </Col>

            <Col xs={3}>
              <Typography.Text disabled>Total:</Typography.Text>
            </Col>
            <Col xs={21}>
              <Typography.Text>
                {getDifferenceBetweenDates(
                  exercise.dateTimeStart,
                  exercise.dateTimeEnd
                )}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ActivityCard;
