import { Col, Divider, Image, Row, Typography } from "antd";
import React from "react";
import { Exercise } from "./Exercise";
import {
  getCaloriesForExercises,
  getDifferenceBetweenDates,
  getMusclesAffectedImgSrc,
  getUserFriendlyDate,
} from "./Utils";

interface ActivityDetailsProps {
  exercise: Exercise;
  weight: number,
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

      {/* Repetitions
      <Col xs={7}>
        <Typography.Text disabled>Repetitions:</Typography.Text>
      </Col>
      <Col xs={17}>
        <Typography.Text>{exercise.repetitions}</Typography.Text>
      </Col> */}

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
          src={getMusclesAffectedImgSrc(exercise.activity)}
        />
      </Col>

      {exercise.repetitions !== 0 && (
        <>
          <Col xs={10}>
            <Typography.Text disabled>Calories burned:</Typography.Text>
          </Col>
          <Col xs={14}>
            <Typography.Text>
              {getCaloriesForExercises(
                exercise.activity,
                props.weight,
                exercise.dateTimeStart,
                exercise.dateTimeEnd
              )}
            </Typography.Text>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ActivityDetails;
