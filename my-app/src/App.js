
import Registration from "./components/Registration/Registration";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={ <Registration />} />
        <Route path="/main" element={ <Main /> } />
      </Routes>
      
    </div>
  );
}

export default App;