import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import CountryFlag from "react-country-flag";
import { Card } from "react-bootstrap";
import AppRouter from "./app/providers/router/AppRouter";
import { Skeleton } from "./shared/ui/Skeleton/Skeleton";
import { AppNavbar } from "./widgets/NavBar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

axios.defaults.baseURL = "https://camp-courses.api.kreosoft.space/";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [userCountry, setUserCountry] = useState(null);

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await axios.get(
          "https://ipinfo.io/json?token=3dd315e69bd747"
        );
        const country = response.data.country;
        setUserCountry(country);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserCountry();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center">
        <Skeleton></Skeleton>
        <Skeleton width="615px" height="150px" className="title"></Skeleton>
      </div>
    );
  }

  if (userCountry !== "RU" && userCountry) {
    return (
      <section className={"country-error"}>
        <Card className="p-4 bg-secondary text-light">
          <h2>Приложение доступно только в России!</h2>
          <Card.Body className="d-flex justify-content-center">
            <CountryFlag
              countryCode="RU"
              style={{ width: "200px", height: "100px" }}
              svg
            />
          </Card.Body>
        </Card>
      </section>
    );
  }

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
