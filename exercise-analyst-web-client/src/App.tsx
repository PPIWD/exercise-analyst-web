import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    // pobieramy access token z localstorage i następnie
    // odpytujemy backend o ćwiczenia dla usera z tym tokenem
    let accessToken = localStorage.getItem("ppwid-access-token");
    if (accessToken === null) {
      // jeśli nie ma tokena w localstorage no to nie wiem co xD
      // na razie tu wklejamy tymczasowy do testów, ale trzeba będzie go
      // brać z webview
      accessToken =
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGVtYWlsLmNvbSIsImp0aSI6Ijk4MzA2ZDU2LTAzODMtNDY2Ny04YzIwLWFmZGE5YjM5MWJmZSIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJ1c2VySWQiOiJlOGU0YjdlMS1lYjM5LTRiMmMtYjUxNi1iZTQ0NzcwZThlNzciLCJyb2xlIjoiVXNlciIsIm5iZiI6MTYyMDgzNDgyNCwiZXhwIjoxNjUyMzcwODI0LCJpYXQiOjE2MjA4MzQ4MjQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzM0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMzQifQ.Z_qV9-MSXtK0IEz2ywTR7mM-6Z9cCMM9rGWMrNfRHOLNveUS1XMIoss34QXhd4Ry6Rua_KpOeKWktV--_It7Ow";
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
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            {exercises.map((exercise) => (
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
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default App;
