import React, { useState, useEffect, Fragment, createRef, useRef } from "react";
import api from "../api/api";
import styled from "styled-components";

export default function Department() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState({});
  const ref = useRef(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await api.department.getAllDepartments();
    setData(data);
  };
  useEffect(() => {}, [inputValue]);
  const sendData = async () => {
    if (inputValue.id) {
      await api.department.put(inputValue);
    } else {
      await api.department.post(inputValue);
    }
    getData();
  };

  const resetInput = () => {
    setInputValue({ shortName: "", fullName: "", notes: "" });
  };
  return (
    <>
      <div style={{ marginBottom: "50px", marginTop: "40px" }}>
        <label style={{ marginRight: "20px" }}>
          Qisa ad :
          <input
            ref={ref}
            type="text"
            value={inputValue?.shortName}
            onChange={(e) =>
              setInputValue({ ...inputValue, shortName: e.target.value })
            }
          />
        </label>
        <label style={{ marginRight: "20px" }}>
          Tam ad :
          <input
            ref={ref}
            type="text"
            value={inputValue?.fullName}
            onChange={(e) =>
              setInputValue({ ...inputValue, fullName: e.target.value })
            }
          />
        </label>
        <label style={{ marginRight: "20px" }}>
          Qeyd :
          <input
            ref={ref}
            type="text"
            value={inputValue?.notes}
            onChange={(e) =>
              setInputValue({ ...inputValue, notes: e.target.value })
            }
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
            <th>Qisa Ad</th>
            <th>Tam Ad</th>
            <th>Qeyd</th>
          </tr>

          {data?.map((e) => {
            return (
              <tr onDoubleClick={(p) => setInputValue(e)}>
                <td>{e.shortName}</td>
                <td>{e.fullName}</td>
                <td>{e.notes}</td>
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
