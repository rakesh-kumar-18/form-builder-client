import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import styles from "./ChatPage.module.css";
import { decrypt } from "../../utils/encryptionUtils";
import Loader from "../../components/Loader/Loader";

const ChatPage = () => {
    const { id } = useParams();
    const { handleGetTypeBotById } = useContext(FormBuilderContext);
    const [typeBot, setTypeBot] = useState(null);

    useEffect(() => {
        const fetchTypeBot = async () => {
            const decryptedId = decrypt(decodeURIComponent(id));
            const fetchedTypeBot = await handleGetTypeBotById(decryptedId);
            // console.log(fetchedTypeBot);
            setTypeBot(fetchedTypeBot);
        };

        fetchTypeBot();
    }, [id, handleGetTypeBotById]);

    if (!typeBot) {
        return <Loader />;
    }

    return (
        <div className={styles.chatPage}>
            {/* Render chat UI based on typeBot flow */}
            {typeBot.flow.map((item) => (
                <div key={item._id} className={styles.chatItem}>
                    {/* Render each chat item based on its type */}
                    {item.baseType === "Text" && <div>{item.text}</div>}
                    {/* Handle other types similarly */}
                </div>
            ))}
        </div>
    );
};

export default ChatPage;
