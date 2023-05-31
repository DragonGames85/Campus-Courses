import axios from "axios";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRouter from "./app/providers/router/AppRouter";
import { AppNavbar } from "./widgets/NavBar/Navbar";
import { Container } from "react-bootstrap";

axios.defaults.baseURL = "https://camp-courses.api.kreosoft.space/";

function App() {

  return (
    <div className={"app"}>
      <Suspense fallback="">
        <AppNavbar />
        <ToastContainer />
        <section className="content-page">
          <AppRouter /> 
        </section>
      </Suspense>
    </div>
  );
}

export default App;
