// import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import IntegrationsSection from "../../components/IntegrationsSection/IntegrationsSection";
import CollectResultsSection from "../../components/CollectResultsSection/CollectResultsSection";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";

function Home() {
    // const navigate = useNavigate();

    // const handleSignup = () => {
    //     navigate("/signup");
    // };

    // const handleLogin = () => {
    //     navigate("/login");
    // };

    return (
        <div className={styles.app}>
            <Header />
            <HeroSection />
            <FeaturesSection />
            <IntegrationsSection />
            <CollectResultsSection />
            <Footer />
        </div>
    );
}

export default Home;
