import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Input, Button } from "reactstrap";
import { useDownloadExcel } from "react-export-table-to-excel";

const ReportScreen = () => {
  const [projectReports, setProjectReports] = useState([]);
  const [personelReports, setPersonelReports] = useState([]);
  const [jobReports, setJobReports] = useState([]);
  const [shiftReports, setShiftReports] = useState([]);
  const [downtimeReports, setDowntimeReports] = useState([]);
  const [workingHourReports, setWorkingHourReports] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "İŞÇİLİK VERİ GİRİŞ TABLOSU",
    sheet: "İŞÇİLİK DETAYLARI",
  });

  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44393/api/workinghour/getAllWorkingHours"
        );
        setWorkingHourReports(response.data);
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
        setProjectReports(response.data);
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
        setDowntimeReports(response.data);
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
        setJobReports(response.data);
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
        setShiftReports(response.data);
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
        setPersonelReports(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPersonels();
  }, []);

  useEffect(() => {
    // Seçilen veriye göre farklı bir işlem yapılabilir
    console.log(selectedOption);
  }, [selectedOption]);

  // const data = [
  //   {title: "Tarih"}
  // ]

  return (
    <div>
      <div style={{ display: "flex" }}>
        <br />
        <Input
          bsSize="md"
          type="select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Rapor Türü Seçiniz</option>
          <option value="ProjeRaporu">Proje Raporu</option>
          <option value="PersonelRaporu">Personel Raporu</option>
          <option value="İşTanımıRaporu">İş Tanımı Raporu</option>
          <option value="MesaiTürüRaporu">Mesai Türü Raporu</option>
          <option value="DuraksamaRaporu">Duraksama Raporu</option>
          <option value="ÇalışmaDetayıRaporu">Çalışma Detayı Raporu</option>
        </Input>
        <br />
        <Input
          bsSize="md"
          type="select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Rapor Türü Seçiniz</option>
          <option value="ProjeRaporu">Proje Raporu</option>
          <option value="PersonelRaporu">Personel Raporu</option>
          <option value="İşTanımıRaporu">İş Tanımı Raporu</option>
          <option value="MesaiTürüRaporu">Mesai Türü Raporu</option>
          <option value="DuraksamaRaporu">Duraksama Raporu</option>
          <option value="ÇalışmaDetayıRaporu">Çalışma Detayı Raporu</option>
        </Input>
      </div>
      <div>
        <h3>Raporlar</h3>
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tarih</th>
              <th>Personel Adı</th>
              <th>Proje Adı</th>
              <th>İş Tanımı</th>
              <th>Duraksama Detayı</th>
              <th>Mesai Türü</th>
              <th>Saat</th>
              <th>Ücret</th>
            </tr>
          </thead>
          <tbody>
            {workingHourReports.map((workingHourReport) => {
              const personelReport = personelReports.find(
                (personelReport) =>
                  personelReport.id === workingHourReport.personelId
              );

              let totalSalary =
                personelReport?.salaryPerHour * workingHourReport?.hours;

              if (workingHourReport.shiftId === 3) {
                totalSalary =
                  personelReport?.salaryPerHour *
                  workingHourReport?.hours *
                  1.5;
              } else if (workingHourReport.shiftId === 4) {
                totalSalary =
                  personelReport?.salaryPerHour * workingHourReport?.hours * 2;
              }

              return (
                <tr key={workingHourReport.id}>
                  <th scope="row">{workingHourReport.id}</th>

                  <td>
                    {workingHourReport.day}.{workingHourReport.month}.
                    {workingHourReport.year}
                  </td>
                  <td>
                    {
                      personelReports.find(
                        (personelReport) =>
                          personelReport.id === workingHourReport.personelId
                      )?.name
                    }
                  </td>
                  <td>
                    {
                      projectReports.find(
                        (projectReport) =>
                          projectReport.id === workingHourReport.projectId
                      )?.name
                    }
                  </td>
                  <td>
                    {
                      jobReports.find(
                        (jobReport) => jobReport.id === workingHourReport.jobId
                      )?.name
                    }
                  </td>
                  <td>
                    {
                      downtimeReports.find(
                        (downtimeReport) =>
                          downtimeReport.id === workingHourReport.downtimeId
                      )?.name
                    }
                  </td>
                  <td>
                    {
                      shiftReports.find(
                        (shiftReport) =>
                          shiftReport.id === workingHourReport.shiftId
                      )?.name
                    }
                  </td>
                  <td>{workingHourReport.hours}</td>
                  <td>{totalSalary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <Button onClick={onDownload}>Excele aktar</Button>
      </div>
    </div>
  );
};

export default ReportScreen;
