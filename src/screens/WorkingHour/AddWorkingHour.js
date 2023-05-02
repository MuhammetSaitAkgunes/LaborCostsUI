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
  Table,
} from "reactstrap";

const WorkingHourSchema = Yup.object().shape({
  Day: Yup.number().max(31).required("Gün boş bırakılamaz."),
  Month: Yup.number().max(12).required("Ay boş bırakılamaz."),
  Year: Yup.number().max(2050).required("Yıl boş bırakılamaz."),
  ProjectId: Yup.number().required("Proje boş bırakılamaz."),
  PersonelId: Yup.number().required("Personel boş bırakılamaz."),
  JobId: Yup.number().required("Yapılan iş boş bırakılamaz."),
  ShiftId: Yup.number().required("Mesai türü boş bırakılamaz."),
  Hours: Yup.number().required("Çalışma süresi boş bırakılamaz."),
});

const AddWorkingHourForm = () => {
  const [projects, setProjects] = useState([]);
  const [personels, setPersonels] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [downtimes, setDowntimes] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44393/api/workinghour/getAllWorkingHours"
        );
        setWorkingHours(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkingHours();
  }, []);

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
    Day: "",
    Month: "",
    Year: "",
    ProjectId: "",
    PersonelId: "",
    JobId: "",
    ShiftId: "",
    Hours: "",
    DowntimeId: "",
  };

  function convertValuesToInt(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        convertValuesToInt(obj[key]);
      } else if (typeof obj[key] === "string" && !isNaN(obj[key])) {
        obj[key] = parseInt(obj[key], 10);
      }
    }
    return obj;
  }
  const handleSubmit = (values, { setSubmitting }) => {
    convertValuesToInt(values);

    console.log(values);
    axios
      .post("https://localhost:44393/api/workinghour/addWorkingHour", values)
      .then((response) => {
        console.log(response);
        alert("Çalışma detayı başarıyla eklendi !");
      })
      .catch((error) => {
        console.log(error);
        alert("Çalışma detayı eklenemedi !");
      })
      .finally(() => {
        setSubmitting(false);
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
        <h1>Çalışma Detayı Ekleme Ekranı</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={WorkingHourSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Row className="row-cols-lg-auto g-3 align-items-center">
                <FormGroup>
                  <Label for="Day">Gün</Label>
                  <Field
                    innerRef={inputRef}
                    type="number"
                    name="Day"
                    as={Input}
                    invalid={Boolean(ErrorMessage)}
                  />
                  <FormFeedback>
                    <ErrorMessage name="Day" />
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="Month">Ay</Label>
                  <Field
                    type="number"
                    name="Month"
                    as={Input}
                    invalid={Boolean(ErrorMessage)}
                  />
                  <FormFeedback>
                    <ErrorMessage name="Month" />
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="Year">Yıl</Label>
                  <Field
                    type="number"
                    name="Year"
                    as={Input}
                    invalid={Boolean(ErrorMessage)}
                  />
                  <FormFeedback>
                    <ErrorMessage name="Year" />
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="ProjectId">Proje Adı</Label>
                  <Field
                    name="ProjectId"
                    type="select"
                    as={Input}
                    invalid={Boolean(ErrorMessage)}
                  >
                    <option value="" disabled>
                      Proje Seçiniz.
                    </option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </Field>
                  <FormFeedback>
                    <ErrorMessage name="ProjectId" />
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="DowntimeId">Duraksama Tanımı</Label>
                  <Field
                    name="DowntimeId"
                    type="select"
                    as={Input}
                    invalid={Boolean(ErrorMessage)}
                  >
                    <option value="" disabled>
                      Duraksama Tanımı Seçiniz.
                    </option>
                    {downtimes.map((downtime) => (
                      <option key={downtime.id} value={downtime.id}>
                        {downtime.name}
                      </option>
                    ))}
                  </Field>
                  <FormFeedback>
                    <ErrorMessage name="DowntimeId" />
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="PersonelId">Personel Adı</Label>
                  <Field
                    name="PersonelId"
                    type="select"
                    as={Input}
                    invalid={Boolean(ErrorMessage)}
                  >
                    <option value="" disabled>
                      Personel Seçiniz.
                    </option>
                    {personels.map((personel) => (
                      <option key={personel.id} value={personel.id}>
                        {personel.name}
                      </option>
                    ))}
                  </Field>
                  <FormFeedback>
                    <ErrorMessage name="PersonelId" />
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="JobId">İş Tanımı</Label>
                  <Field
                    name="JobId"
                    type="select"
                    as={Input}
                    invalid={Boolean(ErrorMessage)}
                  >
                    <option value="" disabled>
                      İş Tanımı Seçiniz.
                    </option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.name}
                      </option>
                    ))}
                  </Field>
                  <FormFeedback>
                    <ErrorMessage name="JobId" />
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="ShiftId">Mesai Türü</Label>
                  <Field
                    name="ShiftId"
                    type="select"
                    as={Input}
                    invalid={Boolean(ErrorMessage)}
                  >
                    <option value="" disabled>
                      Mesai Türü Seçiniz.
                    </option>
                    {shifts.map((shift) => (
                      <option key={shift.id} value={shift.id}>
                        {shift.name}
                      </option>
                    ))}
                  </Field>
                  <FormFeedback>
                    <ErrorMessage name="ShiftId" />
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="Hours">Çalışılan Saat</Label>
                  <Field
                    type="number"
                    name="Hours"
                    as={Input}
                    invalid={Boolean(ErrorMessage)}
                  />
                  <FormFeedback>
                    <ErrorMessage name="Hours" />
                  </FormFeedback>
                </FormGroup>

                <Button
                  type="submit"
                  onKeyDown={handleKeyDown}
                  disabled={isSubmitting}
                >
                  Detay Ekle
                </Button>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h3>Çalışma Detayları</h3>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Tarih</th>
              <th>Proje Adı</th>
              <th>Duraksama Detayı</th>
              <th>Personel Adı</th>
              <th>İş Tanımı</th>
              <th>Mesai Türü</th>
              <th>Saat</th>
            </tr>
          </thead>
          <tbody>
            {workingHours.map((workingHour) => (
              <tr key={workingHour.id}>
                <th scope="row">{workingHour.id}</th>
                <td>
                  {workingHour.day}/{workingHour.month}/{workingHour.year}
                </td>
                <td>
                  {
                    projects.find(
                      (project) => project.id === workingHour.projectId
                    )?.name
                  }
                </td>
                <td>
                  {
                    downtimes.find(
                      (downtime) => downtime.id === workingHour.downtimeId
                    )?.name
                  }
                </td>
                <td>
                  {
                    personels.find(
                      (personel) => personel.id === workingHour.personelId
                    )?.name
                  }
                </td>
                <td>
                  {jobs.find((job) => job.id === workingHour.jobId)?.name}
                </td>
                <td>
                  {
                    shifts.find((shift) => shift.id === workingHour.shiftId)
                      ?.name
                  }
                </td>
                <td>{workingHour.hours}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddWorkingHourForm;
