import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import hos from "../../imgs/hos.png";
import "./Registration.scss";

const Registration = () => {
  const regLogin = /^.{8,}$/;
  const regPassword = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{4,}/g;

  const navigate = useNavigate();

  const [open, setOpen] = useState({ stateSnackbar: false, message: "" });
  const { stateSnackbar, message } = open;

  const handleClose = () => {
    setOpen(false);
  };

  const regUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatPassword");
    if (email.trim() || password.trim() || repeatPassword.trim()) {
      if (regLogin.test(email)) {
        if (regPassword.test(password)) {
          if (password === repeatPassword) {
            try {
              await axios
              .post("http://localhost:5000/createNewUser", {
                email,
                password,
              })
              .then((res) => {
                localStorage.setItem("token", res.data.token);
              });
              if (localStorage.getItem("token")) {
                navigate("/main");
              }
            } catch (e) {
              setOpen({
                stateSnackbar: true,
                message: "Пользователь с таким логином уже зарегистрирован",
              });
            }
          } else {
            setOpen({
              stateSnackbar: true,
              message: "Пожалуйста, подтвердите пароль",
            });
          }
        } else {
          setOpen({
            stateSnackbar: true,
            message: "Убедитесь, что пароль состоит из не менее 4 латинских символов и содериж хотя бы 1 число",
          });
        }
      } else {
        setOpen({
          stateSnackbar: true,
          message: "Логин должен быть не меньше 8 символов",
        });
      }
    } else {
      setOpen({
        stateSnackbar: true,
        message: "Пожалуйста, заполните все поля",
      });
    }
  };

  return (
    <div className="main">
      <div>
        <img src={hos} alt="hospitalLogo" />
      </div>
      <div className="login">
        <div>Регистрация</div>
        <form onSubmit={regUser}>
          <label>Логин:</label>
          <input type="email" id="email" name="email" placeholder="Логин" />
          <label>Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
          />
          <label>Повторите пароль:</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeholder="Пароль"
          />
          <button className="butLog">Зарегистрироваться</button>
        </form>
        <div>
          <Link to="/">Авторизироваться</Link>
        </div>
      </div>
      <Snackbar
        open={stateSnackbar}
        autoHideDuration={3000}
        onClose={() => handleClose()}
        message={message}
      />
    </div>
  );
};

export default Registration;
