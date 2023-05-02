import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  Table,
} from "reactstrap";

const DowntimeSchema = Yup.object().shape({
  Name: Yup.string().required("Duraksama nedenini giriniz."),
});

const AddDowntimeForm = () => {
  const [downtimes, setDowntimes] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchDowntimes = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44393/api/downtime/getAllDowntimes"
        );
        setDowntimes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDowntimes();
  }, []);

  const initialValues = {
    Name: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post("https://localhost:44393/api/downtime/addDowntime", values)
      .then((response) => {
        console.log(response);
        alert("Duraksama detayı başarıyla eklendi !");
      })
      .catch((error) => {
        console.log(error);
        alert("Duraksama detayı eklenemedi !");
      })
      .finally(() => {
        setSubmitting(false);
        window.location.reload();
      });
  };

  const handleDelete = (id) => {
    axios
      .post("https://localhost:44393/api/downtime/deleteDowntime", { id })
      .then((response) => {
        console.log(response);
        alert("Duraksama detayı başarıyla silindi !");
      })
      .catch((error) => {
        console.log(error);
        alert("Duraksama detayı silinemedi !");
      })
      .finally(() => {
        window.location.reload();
      });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleKeyDown(event, submitForm) {
    if (event.key === "Enter") {
      submitForm();
    }
  }
  return (
    <div>
      <div>
        <h1>Duraksama Detayı Ekleme Ekranı</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={DowntimeSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col>
                  <FormGroup>
                    <Label for="Name">Duraksama Detayı</Label>
                    <Field
                      innerRef={inputRef}
                      type="text"
                      name="Name"
                      as={Input}
                      invalid={Boolean(ErrorMessage)}
                    />
                    <FormFeedback>
                      <ErrorMessage name="Name" />
                    </FormFeedback>
                  </FormGroup>
                </Col>

                <Col>
                  <Button
                    type="submit"
                    onKeyDown={handleKeyDown}
                    disabled={isSubmitting}
                  >
                    Ekle
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h3>Duraksama Detayları</h3>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>İsim</th>
            </tr>
          </thead>
          <tbody>
            {downtimes.map((downtime) => (
              <tr key={downtime.id}>
                <th scope="row">{downtime.id}</th>
                <td>{downtime.name}</td>
                <td>
                  {/* <Button
                      className="col-md-6"
                      color="primary"
                    >
                      Güncelle
                    </Button> */}
                  <Button
                    className="col-md-6"
                    color="danger"
                    onClick={() => handleDelete(downtime.id)}
                  >
                    Sil
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddDowntimeForm;
