import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import IntegrationsSection from "../../components/IntegrationsSection/IntegrationsSection";
import CollectResultsSection from "../../components/CollectResultsSection/CollectResultsSection";
import Company from "../../components/Company/Company";
import styles from "./Home.module.css";
import MoreFeatureSection from "../../components/MoreFeatureSection/MoreFeatureSection";
import Footer from "../../components/Footer/Footer";

function Home() {
    return (
        <div className={styles.app}>
            <Header />
            <HeroSection />
            <FeaturesSection />
            <IntegrationsSection />
            <CollectResultsSection />
            <MoreFeatureSection />
            <Company />
            <Footer />
        </div>
    );
}

export default Home;
