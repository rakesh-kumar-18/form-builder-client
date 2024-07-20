import styles from "./IntegrationsSection.module.css";
import integration from "../../assets/integration-platform.png";

const IntegrationsSection = () => {
    return (
        <section className={styles.integrationsSection}>
            <div className={styles.integrations}>
                <img src={integration} alt="Integration" />
            </div>
            <div>
                <h2>Integrate with any platform</h2>
                <p>
                    Typebot offers several native integrations blocks as well as
                    instructions on
                </p>
                <p>how to embed typebot on particular platforms</p>
            </div>
        </section>
    );
};

export default IntegrationsSection;
