import React, { useState, useEffect, Fragment, createRef, useRef } from "react";
import api from "../api/api";
import styled from "styled-components";
import Select from "react-select";

export default function VacationRequest() {
  const [data, setData] = useState([]);
  const [employeeData, setEmployeedata] = useState([]);
  const [inputValue, setInputValue] = useState({});
  const [vacationDay, setVacationDay] = useState([]);
  const [permissionDay, setPermisssionDay] = useState(Number);
  const ref = useRef(null);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const [value, onChange] = useState(new Date());
  const [requestData, setRequestData] = useState();

  let getVacationDay = async () => {
    let data = await api.vacationDay.getAll();

    setVacationDay(data);
  };

  let employeeAll = async () => {
    let data = await api.employee.getAll();
    setEmployeedata(data);
  };

  useEffect(() => {
    employeeAll();
    getData();
    getVacationDay();
  }, []);
  const getData = async () => {
    let data = await api.vacationRequest.getAll();
    setData(data);
  };

  const sendData = async () => {
    await api.vacationRequest.post(requestData);

    getData();
  };

  useEffect(() => {
    let employee = employeeData.filter((e) => e.id == selectedOption.value);
    let day = vacationDay?.filter(
      (e) => e.positionId == employee[0]?.positionId
    );
    setPermisssionDay(day[0]?.numberOfDay);
    setRequestData({ ...requestData, vacationPeriod: day[0]?.numberOfDay });
  }, [selectedOption]);

  const resetInput = () => {
    setInputValue({ shortName: "", fullName: "", notes: "" });
  };

  const translatedActive = employeeData.map((x) => {
    return {
      value: x.id,
      label: x.name,
    };
  });

  const handleChange = (event) => {
    setSelectedOption({
      ...selectedOption,
      value: event.value,
      label: event.label,
    });
    setRequestData({ ...requestData, employeeId: event.value });
  };
  return (
    <>
      <div
        style={{
          marginBottom: "50px",
          marginTop: "40px",
          display: "flex",
          maxHeight: "20px",
        }}
      >
        <label
          style={{
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <span>Iscinin adı : </span>
          <Select
            isSearchable={false}
            value={selectedOption}
            onChange={handleChange}
            options={translatedActive}
            styles={{
              container: (provided, state) => ({
                ...provided,
                position: "relative",
              }),
              control: (provided, state) => ({
                ...provided,
                border: "1px solid blue",
                width: 200,
              }),
            }}
          />
        </label>

        <label style={{ marginRight: "20px" }}>
          Məzuniyyət müddəti :
          <input ref={ref} type="number" value={permissionDay} readOnly />
        </label>
        <button
          onClick={sendData}
          style={{ cursor: "pointer", marginRight: "10px" }}
        >
          Gonder
        </button>
        <input
          type="date"
          onChange={(e) =>
            setRequestData({
              ...requestData,
              startDate: new Date(e.target.value),
            })
          }
        />
      </div>

      <Table>
        <table>
          <tr>
            <th>Iscinin Adı</th>
            <th>Status</th>
            <th>Mezuniyyet muddeti</th>
          </tr>

          {data?.map((e) => {
            return (
              <tr onDoubleClick={(p) => setInputValue(e)}>
                <td>{e.employeeName}</td>
                <td>{e.status ? "beli" : "xeyr"}</td>
                <td>{e.vacationPeriod} gun</td>
              </tr>
            );
          })}
        </table>
      </Table>
    </>
  );
}

const Table = styled.div`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;
