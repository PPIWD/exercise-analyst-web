import { Button, Col, notification, Result, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
import "./App.css";
import { Exercise } from "./Exercise";
import ActivityCard from "./ActivityCard";
import Modal from "antd/lib/modal/Modal";
import ActivityDetails from "./ActivityDetails";

const baseApiUrl = "http://pawelkob-002-site3.itempurl.com/api";

const App = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [exerciseIdToShow, setExerciseIdToShow] = useState<number | null>(null);
  const [weight, setWeight] = useState<number>(70);
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
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJleGFtcGxlQGRvbWFpbi5jb20iLCJqdGkiOiJjYzM0NzI3ZS1mNTI3LTRlOWQtYmEzZi1hNzNkNzRjODU3MjMiLCJlbWFpbCI6ImV4YW1wbGVAZG9tYWluLmNvbSIsIldlaWdodEluS2ciOiI2MCIsInVzZXJJZCI6ImYzZGZiZTZmLTY0ZWMtNDkxOS05NjE3LTFlZWFjZjgzNGE4ZiIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjIzNTg4MDMzLCJleHAiOjE2NTUxMjQwMzMsImlhdCI6MTYyMzU4ODAzMywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMzQiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMzNCJ9.UAJzGDzU0VM0Lm7sAViZeJEtbax3UXNOFv0-VURFoVpXnmd1W-LIK08USSFk_vJiYGhkvTTFsj3yNCJcVyrrIA";
    }


    let decoded = jwt_decode(accessToken) as any;
    setWeight(+decoded['WeightInKg'].replace(',', '.'))

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
            weight={weight}
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
