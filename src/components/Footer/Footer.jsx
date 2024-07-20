import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>Improve conversion and user engagement with FormBots</p>
                <button className={styles.ctaButton}>Create a FormBot</button>
            </div>
            <div className={styles.footerLinks}>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#contact">Contact Us</a>
            </div>
        </footer>
    );
};

export default Footer;
