import styles from "./Header.module.css";
import logo from "../../assets/logo.png"; // Update with the actual path to your logo
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <span>FormBot</span>
            </div>
            <nav>
                <ul className={styles.navLinks}>
                    <li>
                        <Link to="/login">
                            <button className={styles.signin}>Sign in</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup">
                            <button className={styles.signup}>
                                Create a FormBot
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
