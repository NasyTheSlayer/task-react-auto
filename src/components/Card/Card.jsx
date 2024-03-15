import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

import styles from "./Card.module.scss";

const Card = ({ manufacturer, model, year, id, onDelete }) => {
  return (
    <div className={styles.card}>
      <div>
        <li>
          <TiDelete
            onClick={() => onDelete(id)}
            width={30}
            height={30}
            className={styles.icon}
          />
          <p>
            <strong>Марка:</strong> {manufacturer}
          </p>
          <p>
            <strong>Модель:</strong> {model}
          </p>
          <p>
            <strong>Рік:</strong> {year}
          </p>
          <Link className={styles.link} to={`/car/${id}`}>
            Детальний перегляд
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Card;
