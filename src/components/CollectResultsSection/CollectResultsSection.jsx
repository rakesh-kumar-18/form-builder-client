import styles from "./CollectResultsSection.module.css";
import chat from "../../assets/chat.png";

const CollectResultsSection = () => {
    return (
        <section className={styles.collectResultsSection}>
            <h2>Collect results in real-time</h2>
            <p>
                One of the main advantages of this application is that you
                collect the user’s responses on each question.
            </p>
            <p>You won&apos;t lose any valuable data.</p>
            <img src={chat} alt="Collect Results" />
        </section>
    );
};

export default CollectResultsSection;
