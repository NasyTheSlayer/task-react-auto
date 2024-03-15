import Card from "../Card/Card";
import styles from "./ListCard.module.scss";

const ListCard = ({ carts, onDelete }) => {
  return (
    <div className={styles.cards}>
      {carts.map((cart) => (
        <Card key={cart.id} {...cart} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ListCard;
