import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import hos from "../../imgs/hos.png";
import "./Login.scss";

const Login = () => {
  const logLogin = /^.{8,}$/;
  const logPassword = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{4,}/g;

  const navigate = useNavigate();

  const [open, setOpen] = useState({ stateSnackbar: false, message: "" });
  const { stateSnackbar, message } = open;

  const handleClose = () => {
    setOpen(false);
  };

  const logUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (email.trim() || password.trim()) {
      if (logLogin.test(email)) {
        if (logPassword.test(password)) {
          try {
            await axios
              .post("http://localhost:5000/loginUser", {
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
              message: "Некорректный пароль",
            });
          }
        } else {
          setOpen({
            stateSnackbar: true,
            message:
              "Убедитесь, что пароль состоит из не менее 4 латинских символов и содериж хотя бы 1 число",
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
        <div>Войти в систему</div>
        <form onSubmit={logUser}>
          <label>Логин:</label>
          <input type="email" id="email" name="email" placeholder="Логин" />
          <label>Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
          />
          <button className="butLog">Войти</button>
        </form>
        <div>
          <Link to="/registration">Зарегистрироваться</Link>
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

export default Login;
