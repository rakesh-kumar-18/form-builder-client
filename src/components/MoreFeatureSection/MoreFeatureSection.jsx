import styles from "./MoreFeatureSection.module.css";
import hiddenFieldsIcon from "../../assets/hidden-fields.png";
import teamCollaborationIcon from "../../assets/team-collab.png";
import linkSubTypebotsIcon from "../../assets/link-bots.png";
import customCodeIcon from "../../assets/custom-code.png";
import customDomainIcon from "../../assets/cutstom-domain.png";
import folderManagementIcon from "../../assets/folder.png";
import teams from "../../assets/teams-creator.png";

const features = [
    {
        icon: hiddenFieldsIcon,
        title: "Hidden fields",
        description:
            "Include data in your form URL to segment your user and use its data directly in your form.",
    },
    {
        icon: teamCollaborationIcon,
        title: "Team collaboration",
        description: "Invite your teammates to work on your typebots with you.",
    },
    {
        icon: linkSubTypebotsIcon,
        title: "Link to sub typebots",
        description: "Reuse your typebots in different parent bots.",
    },
    {
        icon: customCodeIcon,
        title: "Custom code",
        description:
            "Customize everything with your own Javascript & CSS code.",
    },
    {
        icon: customDomainIcon,
        title: "Custom domain",
        description: "Connect your typebot to the custom URL of your choice.",
    },
    {
        icon: folderManagementIcon,
        title: "Folder management",
        description:
            "Organize your typebots in specific folders to keep it clean and work with multiple clients.",
    },
];

function MoreFeatureSection() {
    return (
        <div className={styles.feature}>
            <div className={styles.featureContent}>
                <h2>And many more features</h2>
                <p>
                    Typebot makes form building easy and comes with powerful
                    features
                </p>
            </div>
            <div className={styles.gridContainer}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.gridItem}>
                        <div className={styles.icon}>
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                className={styles.iconImage}
                            />
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
            <div className={styles.teams}>
                <h3>Loved by teams and creators from all around the world</h3>
                <img src={teams} alt="teams" />
            </div>
        </div>
    );
}

export default MoreFeatureSection;
