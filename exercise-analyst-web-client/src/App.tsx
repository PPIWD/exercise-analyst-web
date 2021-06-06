import { Button, Col, notification, Result, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "./App.css";
import { Exercise } from "./Exercise";
import ActivityCard from "./ActivityCard";
import Modal from "antd/lib/modal/Modal";
import ActivityDetails from "./ActivityDetails";

const baseApiUrl = "http://localhost:5000/api";

const App = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [exerciseIdToShow, setExerciseIdToShow] = useState<number | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchExercises = () => {
    setIsError(false);
    setLoading(true);
    setExercises([]);
    // pobieramy access token z localstorage i następnie
    // odpytujemy backend o ćwiczenia dla usera z tym tokenem
    let accessToken = localStorage.getItem("ppwid-access-token");
    if (accessToken === null) {
      // jeśli nie ma tokena w localstorage no to nie wiem co xD
      // na razie tu wklejamy tymczasowy do testów, ale trzeba będzie go
      // brać z webview
      accessToken =
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGVtYWlsLmNvbSIsImp0aSI6IjIzNWU5ZDM3LWQ0ZWEtNGIwZC1hMjRkLWY4MzUxODM4NjZjNyIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJ1c2VySWQiOiI5MDA5NzA4Zi05ZTU4LTQ4MWMtYmE2Mi01MWYwOTZjNjg5ZjUiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTYyMDc1NjAwOCwiZXhwIjoxNjUyMjkyMDA4LCJpYXQiOjE2MjA3NTYwMDgsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzM0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMzQifQ.kc1xtnJl8v-4VDObVMwQSACPEOf4H3B9z2GJFQDBeZ5PcaZR20MZ4SbOLIc-5sPBdkHjZn4N1p7BH7R2FIfoYQ";
    }

    axios
      .get(`${baseApiUrl}/exercises`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: any) => {
        const exercises = response?.data?.payload?.exercises as Exercise[];
        setExercises(exercises);
      })
      .catch((error: AxiosError) => {
        setIsError(true);
        if (error.response?.status === 401) {
          notification.error({
            message: "Authentication error occurred",
          });
        }

        if (error.response?.status === 403) {
          notification.error({
            message: "Authorization error occurred",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  if (loading)
    return (
      <div
        className="container text-center"
        style={{ paddingTop: 16, paddingBottom: 16 }}
      >
        <Spin />
      </div>
    );

  if (isError)
    return (
      <div className="container">
        <Row>
          <Col xs={24}>
            <Result
              status="error"
              title="Error"
              subTitle="An error occured while processing the request"
            />
          </Col>
          <Col xs={24} className="text-center">
            <Button onClick={fetchExercises}>Try again</Button>
          </Col>
        </Row>
      </div>
    );

  return (
    <div className="container">
      <Modal
        visible={showModal}
        destroyOnClose
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
      >
        {exerciseIdToShow && (
          <ActivityDetails
            exercise={exercises.find((e) => e.id === exerciseIdToShow)!}
          />
        )}
      </Modal>
      <Row
        justify="center"
        style={{
          marginTop: 32,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <Col xs={24}>
          <Row justify="center" gutter={[16, 16]}>
            {exercises.length <= 0 && (
              <Row>
                <Col xs={24}>
                  <Result
                    status="info"
                    title="No exercises"
                    subTitle="There are currently no exercises to show."
                  />
                </Col>
              </Row>
            )}
            {exercises.length > 0 &&
              exercises.map((exercise) => (
                <Col
                  xs={24}
                  key={exercise.id}
                  onClick={() => {
                    setExerciseIdToShow(exercise.id);
                    setShowModal(true);
                  }}
                >
                  <ActivityCard exercise={exercise} />
                </Col>
              ))}
            <Col xs={24} className="text-center">
              <Button block type="primary" onClick={fetchExercises}>
                Reload
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default App;
