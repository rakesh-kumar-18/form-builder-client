import styles from "./HeroSection.module.css";
import heroImage from "../../assets/hero-image.png";
// import backgroundBlur from '../../assets/background-blur.png';
// import backgroundBlurBlue from '../../assets/background-blur-blue.png';
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
                <h1>Build advanced chatbots</h1>
                <h1>visually</h1>
                <p>
                    Typebot gives you powerful blocks to create unique chat
                    experiences. Embed them
                </p>
                <p>
                    anywhere on your web/mobile apps and start collecting
                    results like magic.
                </p>
                <button
                    className={styles.ctaButton}
                    onClick={() => navigate("/signup")}
                >
                    Create a FormBot for free
                </button>
            </div>
            {/* <div className={styles.backgroundImages}>
                <img src={backgroundBlur} alt="Background Blur" className={styles.backgroundBlurLeft} />
                <img src={backgroundBlurBlue} alt="Background Blur Blue" className={styles.backgroundBlurRight} />
            </div> */}
            <img src={heroImage} alt="Hero" className={styles.heroImage} />
        </section>
    );
};

export default HeroSection;
