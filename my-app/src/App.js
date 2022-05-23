
import Registration from "./components/Registration/Registration";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={ <Registration />} />
        <Route path="/main" element={ <MainPage /> } />
      </Routes>
      
    </div>
  );
}

export default App;