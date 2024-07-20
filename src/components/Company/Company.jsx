import styles from "./Company.module.css";
import leftShape from "../../assets/home-triangle.png";
import rightShape from "../../assets/svg-right.png";
import { useNavigate } from "react-router-dom";

const Company = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.footer}>
            <div className={styles.heroContainer}>
                <img
                    src={leftShape}
                    alt="Left Shape"
                    className={styles.leftShape}
                />
                <div className={styles.textContainer}>
                    <h1>
                        Improve conversion and user engagement with FormBots
                    </h1>
                    <button
                        className={styles.ctaButton}
                        onClick={() => navigate("/signup")}
                    >
                        Create a FormBot
                    </button>
                    <p className={styles.subText}>
                        No trial. Generous <span>free</span> plan.
                    </p>
                </div>
                <img
                    src={rightShape}
                    alt="Right Shape"
                    className={styles.rightShape}
                />
            </div>
        </div>
    );
};

export default Company;
