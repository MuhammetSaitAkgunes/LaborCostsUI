import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const PersonelSchema = Yup.object().shape({
  Name: Yup.string().required(""),
  SalaryPerHour: Yup.number().required(""),
});

const AddPersonelForm = () => {
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
      });
  };

  return (
    <div>
      <h1>Personel Ekleme Ekranı</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={PersonelSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="Name">Personel İsmi</label>
            <Field type="text" name="Name" placeholder="* Bu alan boş bırakılamaz."/>
            <ErrorMessage name="Name" />

            <label htmlFor="SalaryPerHour">Saatlik Ücreti</label>
            <Field type="number" name="SalaryPerHour" placeholder="* Bu alan boş bırakılamaz."/>
            <ErrorMessage name="SalaryPerHour" />

            <button type="submit" disabled={isSubmitting}>
              Personel Ekle
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPersonelForm;