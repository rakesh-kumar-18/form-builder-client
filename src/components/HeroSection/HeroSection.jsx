import styles from "./HeroSection.module.css";
import heroImage from "../../assets/hero-image.png";
import leftShape from "../../assets/home-triangle.png";
import rightShape from "../../assets/svg-right.png";
import backgroundBlur from '../../assets/background-blur.png';
import backgroundBlurBlue from '../../assets/background-blur-blue.png';
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.heroSection}>
            <img
                src={leftShape}
                alt="Left Shape"
                className={styles.leftShape}
            />
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
            <img
                src={rightShape}
                alt="Right Shape"
                className={styles.rightShape}
            />
            <div className={styles.images}>
                <img src={backgroundBlur} alt="Background Blur" className={styles.backgroundImages} />
                <img src={backgroundBlurBlue} alt="Background Blur Blue" className={styles.backgroundImages} />
                <img src={heroImage} alt="Hero" className={styles.heroImage} />
            </div>
        </section>
    );
};

export default HeroSection;
