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

const ShiftSchema = Yup.object().shape({
  Name: Yup.string().required("Mesai türü boş bırakılamaz."),
});

const AddShiftForm = () => {
  const [shifts, setShifts] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44393/api/shift/getAllShifts"
        );
        setShifts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShifts();
  }, []);

  const initialValues = {
    Name: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post("https://localhost:44393/api/shift/addShift", values)
      .then((response) => {
        console.log(response);
        alert("Mesai türü başarıyla eklendi !");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Mesai türü eklenemedi. Lütfen girdiğiniz bilgileri kontrol edin !"
        );
      })
      .finally(() => {
        setSubmitting(false);
        window.location.reload();
      });
  };

  const handleDelete = (id) => {
    axios
      .post("https://localhost:44393/api/shift/deleteShift", { id })
      .then((response) => {
        console.log(response);
        alert("Mesai türü başarıyla silindi !");
      })
      .catch((error) => {
        console.log(error);
        alert("Mesai türü silinemedi !");
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
        <h1>Mesai Türü Ekleme Ekranı</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={ShiftSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col>
                  <FormGroup>
                    <Label for="Name">Mesai Türü</Label>
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
                    Mesai Türü Ekle
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h3>Mesai Türleri</h3>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>İsim</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <th scope="row">{shift.id}</th>
                <td>{shift.name}</td>
                <td>{shift.salaryPerHour}</td>
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
                    onClick={() => handleDelete(shift.id)}
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

export default AddShiftForm;
