import styles from "./Home.module.scss";
import { useState } from "react";
import ListCard from "../../components/ListCard/ListCard";
import AddCart from "../../components/AddCart/AddCart";
import { useNavigate } from "react-router-dom";

const Home = ({ carts, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const handleShowAddForm = () => {
    setShowAddForm(true);
    navigate("/create");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Список автомобілів</h2>
        <button onClick={handleShowAddForm}>Створити карту</button>
      </div>
      {carts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          {showAddForm ? (
            <AddCart />
          ) : (
            <ListCard carts={carts} onDelete={onDelete} />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
