import React, { useState, useEffect, Fragment, createRef, useRef } from "react";
import api from "../api/api";
import styled from "styled-components";
import Select from "react-select";

export default function Position() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState({});
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const [departmentData, setDepartmentData] = useState();
  const ref = useRef(null);
  useEffect(() => {
    getData();
    allDepartment();
  }, []);
  const getData = async () => {
    let data = await api.position.getAll();
    setData(data);
  };
  useEffect(() => {}, [inputValue]);

  const sendData = async () => {
    if (inputValue.id) {
      await api.position.put(inputValue);
    } else {
      await api.position.post(inputValue);
    }
    getData();
  };

  const handleChange = (event) => {
    setSelectedOption({
      ...selectedOption,
      value: event.value,
      label: event.label,
    });
    setInputValue({ ...inputValue, departmentId: event.value });
  };

  let allDepartment = async () => {
    let data = await api.department.getAllDepartments();
    setDepartmentData(data);
  };

  const resetInput = () => {
    setInputValue({ name: "", departmentData: "", departmentId: "" });
    setSelectedOption({ value: "", label: "" });
  };

  const translatedActive = departmentData?.map((x) => {
    return {
      value: x.id,
      label: x.shortName,
    };
  });

  const deleteRow = async (idFoto) => {
    let datas = data?.filter((prev) => {
      return prev.id !== idFoto;
    });
    setData(datas);
    if (datas?.length > 0) {
      await api.position.delete(idFoto);
    }
  };

  useEffect(() => {
    console.log("change", inputValue);
  }, [inputValue]);

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
        <label style={{ marginRight: "20px" }}>
          Vezife :
          <input
            ref={ref}
            type="text"
            value={inputValue?.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, name: e.target.value })
            }
          />
        </label>
        <label
          style={{
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <span>Department : </span>
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
        <button
          onClick={sendData}
          style={{ cursor: "pointer", marginRight: "10px" }}
        >
          Gonder
        </button>
        <button onClick={resetInput}>Sil</button>
      </div>

      <Table>
        <table>
          <tr>
            <th>Vezife</th>
            <th>Yaradilma Tarixi</th>
            <th>Department</th>
            <th>Sil</th>
          </tr>

          {data?.map((e) => {
            return (
              <tr
                onDoubleClick={() => {
                  setInputValue(e);
                  setSelectedOption({
                    ...selectedOption,
                    value: e.departmentId,
                    label: e.departmentName,
                  });
                }}
              >
                <td>{e.name}</td>
                <td>{e.createdDate}</td>
                <td>{e.departmentName}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteRow(e.id);
                    }}
                    style={{
                      backgroundColor: "red",
                      minHeight: "15px",
                      cursor: "pointer",
                    }}
                  />
                </td>
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
