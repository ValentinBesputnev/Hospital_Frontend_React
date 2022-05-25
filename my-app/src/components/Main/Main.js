import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { MenuItem, Select, TextField } from "@material-ui/core";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import List from "../List/List";
import "./Main.scss";

const MainPage = () => {
  const [records, setRecords] = useState([]);
  const [data, setData] = useState({
    name: "",
    doctor: "",
    date: new Date(),
    complaints: "",
  });

  const doctors = [
    {
      value: "Володя Бакенбардович",
    },
    {
      value: "Виталий Джокер",
    },
    {
      value: "Константин Завупач",
    },
  ];

  const { name, doctor, date, complaints } = data;

  const handleChange = (inputName, value) => {
    setData({
      ...data,
      [inputName]: value,
    });
  };

  useEffect(() => {
    fetchFunc();
  }, []);

  const fetchFunc = async () => {
    await axios
      .get("http://localhost:5000/allRecords", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setRecords(res.data.data);
      });
  };

  const addRecord = async () => {
    console.log({ data });
    data.date = moment(data.date).format("DD.MM.YYYY");
    await axios
      .post("http://localhost:5000/createRecord", data, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        records.push(res.data.data);
        setRecords([...records]);
        setData({
          name: "",
          doctor: "",
          date: new Date(),
          complaints: "",
        });
      });
  };

  return (
    <div>
      <div className="add-record">
        <form className="add-form">
          <div>
            <label>Имя:</label>
            <TextField
              className="name"
              required
              value={name}
              name="name"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label>Врач:</label>
            <Select
              className="doctor"
              value={doctor}
              name="doctor"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              {doctors.map((item, index) => (
                <MenuItem
                  key={`item-${index}`}
                  value={item.value}
                  className="test"
                >
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <label>Дата:</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                className="date"
                inputFormat={"dd/MM/yyyy"}
                name="date"
                value={date}
                onChange={(e) => handleChange("date", e)}
                renderInput={(params) => (
                  <TextField className="date-file" {...params} />
                )}
              />
            </LocalizationProvider>
          </div>
          <div>
            <label>Жалобы:</label>
            <TextField
              className="complaints"
              value={complaints}
              name="complaints"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              addRecord();
            }}
          >
            Добавить
          </button>
        </form>
      </div>
      <List records={records} data={data} setData={setData} />
    </div>
  );
};

export default MainPage;
