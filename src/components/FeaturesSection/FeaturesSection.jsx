import styles from "./FeaturesSection.module.css";
import container from "../../assets/Container.png";
import featureOne from "../../assets/feature 1.png";
import featureTwo from "../../assets/feature 2.png";

const FeaturesSection = () => {
    return (
        <section className={styles.featuresSection}>
            <h2>Replace your old school forms</h2>
            <h2>with</h2>
            <h2>chatbots</h2>
            <div className={styles.feature}>
                <div className={styles.featureContent}>
                    <p>
                        Typebot is a better way to ask for information. It leads
                        to an increase in customer satisfaction and retention
                        and multiply by
                    </p>
                    <p>3</p>
                    <p>your conversion rate compared to classical forms.</p>
                </div>
                <div className={styles.featureImage}>
                    <img src={container} alt="Feature" />
                </div>
            </div>
            <div className={styles.features}>
                <div className={styles.featureOne}>
                    <img src={featureOne} alt="featuer one" />
                    <div className={styles.text}>
                        <div className={styles.heading}>
                            <h1>Easy building</h1>
                            <h1>experience</h1>
                        </div>
                        <div>
                            <p>All you have to do is drag and</p>
                            <p>drop blocks to create your app.</p>
                            <p>Even if you have custom needs,</p>
                            <p>you can always add custom</p>
                            <p>code.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.featureTwo}>
                    <div className={styles.text}>
                        <div className={styles.heading}>
                            <h1>Embed it in a click</h1>
                        </div>
                        <div>
                            <p>Embedding your typebot in</p>
                            <p>your applications is a walk in</p>
                            <p>the park. Typebot gives you</p>
                            <p>several step-by-step platform-</p>
                            <p>specific instructions. Your</p>
                            <p>typebot will always feel &quot;native&quot;.</p>
                        </div>
                    </div>
                    <img src={featureTwo} alt="featuer two" />
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
