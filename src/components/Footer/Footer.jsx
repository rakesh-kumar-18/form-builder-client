import styles from "./Footer.module.css";
import { GrShare } from "react-icons/gr";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <p>
                    Made with{" "}
                    <span role="img" aria-label="heart">
                        ❤️
                    </span>{" "}
                    by
                    <div>
                        <a href="https://cuvette.tech" className={styles.link}>
                            @cuvette
                        </a>
                    </div>
                </p>
            </div>
            <div className={styles.column}>
                <ul>
                    <li>
                        <a href="#">Status</a>
                        <GrShare />
                    </li>
                    <li>
                        <a href="#">Documentation</a>
                        <GrShare />
                    </li>
                    <li>
                        <a href="#">Roadmap</a>
                        <GrShare />
                    </li>
                    <li>
                        <a href="#">Pricing</a>
                    </li>
                </ul>
            </div>
            <div className={styles.column}>
                <ul>
                    <li>
                        <a href="#">Discord</a>
                        <GrShare />
                    </li>
                    <li>
                        <a href="#">GitHub repository</a>
                        <GrShare />
                    </li>
                    <li>
                        <a href="#">Twitter</a>
                        <GrShare />
                    </li>
                    <li>
                        <a href="#">LinkedIn</a>
                        <GrShare />
                    </li>
                    <li>
                        <a href="#">OSS Friends</a>
                    </li>
                </ul>
            </div>
            <div className={styles.column}>
                <ul>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                    <li>
                        <a href="#">Terms of Service</a>
                    </li>
                    <li>
                        <a href="#">Privacy Policy</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
