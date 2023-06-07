import React, { useState, useEffect, Fragment, createRef, useRef } from "react";
import api from "../api/api";
import styled from "styled-components";
import Select from "react-select";

export default function Employee() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState({});
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const [selectedPosition, setSelectedPosition] = useState({
    value: "",
    label: "",
  });
  const [selectedUser, setSelectedUser] = useState({
    value: "",
    label: "",
  });
  const [departmentData, setDepartmentData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [userData, setUserData] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    getData();
    allDepartment();
    allPosition();
    allUser();
  }, []);
  const getData = async () => {
    let data = await api.employee.getAll();
    setData(data);
  };
  useEffect(() => {}, [inputValue]);

  const sendData = async () => {
    if (inputValue.id) {
      await api.employee.put(inputValue);
    } else {
      await api.employee.post(inputValue);
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

  const handleChangePsotion = (event) => {
    setSelectedPosition({
      ...selectedPosition,
      value: event.value,
      label: event.label,
    });
    setInputValue({ ...inputValue, positionId: event.value });
  };

  const handleChangeUser = (event) => {
    setSelectedUser({
      ...selectedPosition,
      value: event.value,
      label: event.label,
    });
    setInputValue({ ...inputValue, userId: event.value });
  };

  let allDepartment = async () => {
    let data = await api.department.getAllDepartments();
    setDepartmentData(data);
  };

  const allPosition = async () => {
    let data = await api.position.getAll();
    setPositionData(data);
  };

  const allUser = async () => {
    let data = await api.auth.getallUser();
    setUserData(data);
  };

  const resetInput = () => {
    setInputValue({ name: "", departmentData: "", departmentId: "" });
    setSelectedOption({ value: "", label: "" });
    setSelectedPosition({ value: "", label: "" });
    setSelectedUser({ value: "", label: "" });
  };

  const departmentActive = departmentData?.map((x) => {
    return {
      value: x.id,
      label: x.shortName,
    };
  });

  const positionOptions = positionData?.map((x) => {
    return {
      value: x.id,
      label: x.name,
    };
  });

  const userOptions = userData?.map((x) => {
    return {
      value: x.id,
      label: x.userName,
    };
  });

  const deleteRow = async (idFoto) => {
    let datas = data?.filter((prev) => {
      return prev.id !== idFoto;
    });
    setData(datas);
    if (datas?.length > 0) {
      await api.employee.delete(idFoto);
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
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <label style={{ marginRight: "20px" }}>
            Ad :
            <input
              ref={ref}
              type="text"
              value={inputValue?.name}
              onChange={(e) =>
                setInputValue({ ...inputValue, name: e.target.value })
              }
            />
          </label>
          <label style={{ marginRight: "20px" }}>
            Soyad :
            <input
              ref={ref}
              type="text"
              value={inputValue?.surName}
              onChange={(e) =>
                setInputValue({ ...inputValue, surName: e.target.value })
              }
            />
          </label>
          <label style={{ marginRight: "20px" }}>
            Email :
            <input
              ref={ref}
              type="text"
              value={inputValue?.email}
              onChange={(e) =>
                setInputValue({ ...inputValue, email: e.target.value })
              }
            />
          </label>
          <label
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              height: "15px !important",
            }}
          >
            <span>Şöbə : </span>
            <Select
              isSearchable={false}
              value={selectedOption}
              onChange={handleChange}
              options={departmentActive}
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
        </div>
        <div style={{ display: "flex", marginBottom: "30px" }}>
          <label
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              height: "15px !important",
            }}
          >
            <span>Vəzifə : </span>
            <Select
              isSearchable={false}
              value={selectedPosition}
              onChange={handleChangePsotion}
              options={positionOptions}
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

          <label
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              height: "15px !important",
            }}
          >
            <span>İstifadəçi : </span>
            <Select
              isSearchable={false}
              value={selectedUser}
              onChange={handleChangeUser}
              options={userOptions}
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
            style={{
              cursor: "pointer",
              marginRight: "10px",
              maxHeight: "37px",
            }}
          >
            Gonder
          </button>
          <button
            style={{
              cursor: "pointer",
              marginRight: "10px",
              maxHeight: "37px",
            }}
            onClick={resetInput}
          >
            Sil
          </button>
        </div>
      </div>

      <Table>
        <table>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Email</th>
            <th>Vezife</th>
            <th>Şöbə</th>
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
                    label: e.department,
                  });
                  setSelectedPosition({
                    ...selectedPosition,
                    value: e.positionId,
                    label: e.position,
                  });
                  setSelectedUser({
                    ...selectedUser,
                    value: e.userId,
                    label: e.userName,
                  });
                }}
              >
                <td>{e.name}</td>
                <td>{e.surName}</td>
                <td>{e.email}</td>
                <td>{e.position}</td>
                <td>{e.department}</td>
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
