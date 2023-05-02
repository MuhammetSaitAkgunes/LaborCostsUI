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

const PersonelSchema = Yup.object().shape({
  Name: Yup.string().required("Personel ismi boş bırakılamaz."),
  SalaryPerHour: Yup.number().required("Saatlik ücret boş bırakılamaz."),
});

const AddPersonelForm = () => {
  const [personels, setPersonels] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchPersonels = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44393/api/personel/getAllPersonel"
        );
        setPersonels(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPersonels();
  }, []);

  const initialValues = {
    Name: "",
    SalaryPerHour: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post("https://localhost:44393/api/personel/addPersonel", values)
      .then((response) => {
        console.log(response);
        alert("Personel başarıyla eklendi !");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Personel eklenemedi. Lütfen girdiğiniz bilgileri kontrol edin !"
        );
      })
      .finally(() => {
        setSubmitting(false);
        window.location.reload();
      });
  };

  const handleDelete = (id) => {
    axios
      .post("https://localhost:44393/api/personel/deletePersonel", { id })
      .then((response) => {
        console.log(response);
        alert("Personel başarıyla silindi !");
      })
      .catch((error) => {
        console.log(error);
        alert("Personel silinemedi !");
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
        <h1>Personel Ekleme Ekranı</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={PersonelSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col>
                  <FormGroup>
                    <Label for="Name">Personel İsmi</Label>
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
                  <FormGroup>
                    <Label for="SalaryPerHour">Saatlik Ücreti</Label>
                    <Field
                      type="number"
                      name="SalaryPerHour"
                      as={Input}
                      invalid={Boolean(ErrorMessage)}
                    />
                    <FormFeedback>
                      <ErrorMessage name="SalaryPerHour" />
                    </FormFeedback>
                  </FormGroup>
                </Col>

                <Col>
                  <Button
                    type="submit"
                    onKeyDown={handleKeyDown}
                    disabled={isSubmitting}
                  >
                    Personel Ekle
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h3>Personeller</h3>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>İsim</th>
              <th>Saatlik Ücret</th>
            </tr>
          </thead>
          <tbody>
            {personels.map((personel) => (
              <tr key={personel.id}>
                <th scope="row">{personel.id}</th>
                <td>{personel.name}</td>
                <td>{personel.salaryPerHour}</td>
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
                    onClick={() => handleDelete(personel.id)}
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

export default AddPersonelForm;
