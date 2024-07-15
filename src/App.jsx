import { Outlet } from "react-router-dom";
import Login from "./components/Login";


const App = () => {
  return (
    <div>
      {/* <Login></Login> */}
      <Outlet></Outlet>
    </div>
  );
};

export default App;