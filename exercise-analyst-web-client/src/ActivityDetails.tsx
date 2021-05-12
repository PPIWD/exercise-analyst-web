import { Col, Divider, Image, Row, Typography } from "antd";
import React from "react";
import { Exercise } from "./Exercise";
import { getDifferenceBetweenDates, getUserFriendlyDate } from "./Utils";

interface ActivityDetailsProps {
  exercise: Exercise;
}

const ActivityDetails = (props: ActivityDetailsProps) => {
  const { exercise } = props;
  return (
    <Row>
      <Divider>Activity</Divider>
      {/* Activity */}
      <Col xs={5}>
        <Typography.Text disabled>Activity:</Typography.Text>
      </Col>
      <Col xs={19}>
        <Typography.Text>{exercise.activity}</Typography.Text>
      </Col>

      {/* Repetitions */}
      <Col xs={7}>
        <Typography.Text disabled>Repetitions:</Typography.Text>
      </Col>
      <Col xs={17}>
        <Typography.Text>{exercise.repetitions}</Typography.Text>
      </Col>

      <Divider>Timing</Divider>
      {/* Start */}
      <Col xs={4}>
        <Typography.Text disabled>Start:</Typography.Text>
      </Col>
      <Col xs={20}>
        <Typography.Text>
          {getUserFriendlyDate(exercise.dateTimeStart)}
        </Typography.Text>
      </Col>

      {/* End */}
      <Col xs={4}>
        <Typography.Text disabled>End:</Typography.Text>
      </Col>
      <Col xs={20}>
        <Typography.Text>
          {getUserFriendlyDate(exercise.dateTimeEnd)}
        </Typography.Text>
      </Col>

      {/* Total */}
      <Col xs={4}>
        <Typography.Text disabled>Total:</Typography.Text>
      </Col>
      <Col xs={20}>
        <Typography.Text>
          {getDifferenceBetweenDates(
            exercise.dateTimeStart,
            exercise.dateTimeEnd
          )}
        </Typography.Text>
      </Col>

      <Divider>Exercise</Divider>

      <Col xs={24} className="text-center">
        <Typography.Text strong>Muscles affected</Typography.Text>
      </Col>
      <Col xs={24}>
        <Image
          preview={false}
          src="https://st2.depositphotos.com/1909187/10981/i/950/depositphotos_109811754-stock-photo-chest-muscles-pectoralis-major-and.jpg"
        />
      </Col>

      <Col xs={10}>
        <Typography.Text disabled>Calories burned:</Typography.Text>
      </Col>
      <Col xs={14}>
        <Typography.Text>100</Typography.Text>
      </Col>
    </Row>
  );
};

export default ActivityDetails;
