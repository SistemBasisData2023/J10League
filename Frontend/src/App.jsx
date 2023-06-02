import style from "./style";
import { Schedule, Results, Footer, Navbar, Hero, Login, Table } from "./components";
import { Outlet } from "react-router-dom";

const App = () => {
  return(
    <div>
      <Outlet />
    </div>
  )
};

export default App;