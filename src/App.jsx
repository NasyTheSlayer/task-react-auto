import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import CartDetails from "./pages/CardDetails/CardDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCart from "./components/AddCart/AddCart";

function App() {
  const [carts, setCarts] = useState([]);

  const handleLoading = () => {
    axios
      .get("https://2b812fea10d70016.mokky.dev/cars")
      .then((response) => {
        setCarts(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    handleLoading();
  }, []);

  const onRemoveCarts = (id) => {
    if (window.confirm("Ви точно хочете це зробити?")) {
      try {
        axios
          .delete(`https://2b812fea10d70016.mokky.dev/cars/${id}`)
          .then(() => {
            handleLoading();
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route
          exact
          path="/task-react-auto/"
          element={<Home carts={carts} onDelete={onRemoveCarts} />}
        />
        <Route
          exact
          path="/task-react-auto/car/:id"
          element={<CartDetails />}
        />
        <Route exact path="/task-react-auto/car/:id/edit" />
        <Route exact path="/task-react-auto/create" element={<AddCart />} />
      </Routes>
    </div>
  );
}

export default App;
