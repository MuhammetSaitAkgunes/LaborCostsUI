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

const ProjectSchema = Yup.object().shape({
  Name: Yup.string().required("Proje ismi boş bırakılamaz."),
});

const AddProjectForm = () => {
  const [projects, setProjects] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44393/api/project/getAllProjects"
        );
        setProjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  const initialValues = {
    Name: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post("https://localhost:44393/api/project/addProject", values)
      .then((response) => {
        console.log(response);
        alert("Proje başarıyla eklendi !");
      })
      .catch((error) => {
        console.log(error);
        alert("Proje eklenemedi. Lütfen girdiğiniz bilgileri kontrol edin !");
      })
      .finally(() => {
        setSubmitting(false);
        window.location.reload();
      });
  };

  // const handleDelete = (id) => {
  //   axios
  //     .post("https://localhost:44393/api/project/deleteProject", { id })
  //     .then((response) => {
  //       console.log(response);
  //       alert("Proje başarıyla silindi !");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("Proje silinemedi !");
  //     })
  //     .finally(() => {
  //       window.location.reload();
  //     });
  // };

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
        <h1>Proje Ekleme Ekranı</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={ProjectSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col>
                  <FormGroup>
                    <Label for="Name">Proje Adı</Label>
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
                    Proje Ekle
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h3>Projeler</h3>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>İsim</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <th scope="row">{project.id}</th>
                <td>{project.name}</td>
                <td>
                  {/* <Button
                      className="col-md-6"
                      color="primary"
                    >
                      Güncelle
                    </Button> */}
                  {/* <Button
                    className="col-md-6"
                    color="danger"
                    onClick={() => handleDelete(projects.id)}
                  >
                    Sil
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddProjectForm;
