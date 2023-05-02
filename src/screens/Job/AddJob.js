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

const JobSchema = Yup.object().shape({
  Name: Yup.string().required("İş tanımı boş bırakılamaz."),
});

const AddJobForm = () => {
  const [jobs, setJobs] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44393/api/job/getAllJobs"
        );
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const initialValues = {
    Name: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post("https://localhost:44393/api/job/addJob", values)
      .then((response) => {
        console.log(response);
        alert("İş tanımı başarıyla eklendi !");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "İş tanımı eklenemedi. Lütfen girdiğiniz bilgileri kontrol edin !"
        );
      })
      .finally(() => {
        setSubmitting(false);
        window.location.reload();
      });
  };

  const handleDelete = (id) => {
    axios
      .post("https://localhost:44393/api/job/deleteJob", { id })
      .then((response) => {
        console.log(response);
        alert("İş tanımı başarıyla silindi !");
      })
      .catch((error) => {
        console.log(error);
        alert("İş tanımı silinemedi !");
      })
      .finally(() => {
        window.location.reload();
      });
  };

  function handleKeyDown(event, submitForm) {
    if (event.key === "Enter") {
      submitForm();
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <div>
        <h1>İş Tanımı Ekleme Ekranı</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={JobSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col>
                  <FormGroup>
                    <Label for="Name">İş Tanımı</Label>
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
                    İş Tanımı Ekle
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h3>İş Tanımları</h3>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>İsim</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <th scope="row">{job.id}</th>
                <td>{job.name}</td>
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
                    onClick={() => handleDelete(job.id)}
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

export default AddJobForm;
