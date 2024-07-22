import { useContext, useRef, useState, useEffect } from "react";
import styles from "./NavbarWithDropdown.module.css";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const NavbarWithDropdown = () => {
    const { username, logout } = useContext(FormBuilderContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const workspaceRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleWorkspaceClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        if (dropdownOpen && workspaceRef.current && dropdownRef.current) {
            dropdownRef.current.style.width = `${workspaceRef.current.offsetWidth}px`;
        }
    }, [dropdownOpen]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className={styles.navbarContainer}>
            <nav className={styles.navbar}>
                <div
                    ref={workspaceRef}
                    className={styles.workspace}
                    style={{ backgroundColor: dropdownOpen && "#1D1D1D" }}
                    onClick={handleWorkspaceClick}
                >
                    {username}&apos;s workspace
                    {dropdownOpen ? (
                        <GoChevronUp style={{ marginLeft: "16px" }} />
                    ) : (
                        <GoChevronDown style={{ marginLeft: "16px" }} />
                    )}
                </div>
            </nav>
            {dropdownOpen && (
                <div ref={dropdownRef} className={styles.dropdown}>
                    <ul>
                        <li onClick={() => navigate("/settings")}>Settings</li>
                        <li onClick={handleLogout}>Log Out</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavbarWithDropdown;
