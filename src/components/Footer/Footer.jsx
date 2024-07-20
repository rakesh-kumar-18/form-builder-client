import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <p>
                    Made with{" "}
                    <span role="img" aria-label="heart">
                        ❤️
                    </span>{" "}
                    by{" "}
                    <a href="https://cuvette.tech" className={styles.link}>
                        @cuvette
                    </a>
                </p>
            </div>
            <div className={styles.column}>
                <h4>Product</h4>
                <ul>
                    <li>
                        <a href="#">Status</a>
                    </li>
                    <li>
                        <a href="#">Documentation</a>
                    </li>
                    <li>
                        <a href="#">Roadmap</a>
                    </li>
                    <li>
                        <a href="#">Pricing</a>
                    </li>
                </ul>
            </div>
            <div className={styles.column}>
                <h4>Community</h4>
                <ul>
                    <li>
                        <a href="#">Discord</a>
                    </li>
                    <li>
                        <a href="#">GitHub repository</a>
                    </li>
                    <li>
                        <a href="#">Twitter</a>
                    </li>
                    <li>
                        <a href="#">LinkedIn</a>
                    </li>
                    <li>
                        <a href="#">OSS Friends</a>
                    </li>
                </ul>
            </div>
            <div className={styles.column}>
                <h4>Company</h4>
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
