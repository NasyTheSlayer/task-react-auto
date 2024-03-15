import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <Link to={"/task-react-auto"} className={styles.content}>
        <div className={styles.text}>
          <img
            width={40}
            height={40}
            src="../img/header-logo.jpg"
            alt="headerLogo"
          />
          <div>
            <h3>React Cars</h3>
            <p>Магазин Автомобілів</p>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
