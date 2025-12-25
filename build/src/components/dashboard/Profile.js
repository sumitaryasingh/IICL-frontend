import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getProfileData } from '../../services/profileService';
import styles from './styles/Profile.module.css';
import { changePassword } from '../../services/authService';
const ProfileComponent = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isChanging, setIsChanging] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const handleChangePassword = async () => {
        if (!profile?.email) {
            alert("Email not found in profile.");
            return;
        }
        // if (!newPassword || !currentPassword) {
        //   alert("Please enter both current and new passwords.");
        //   return;
        // }
        try {
            setIsChanging(true);
            await changePassword(profile.email, newPassword, currentPassword);
            alert("Password changed successfully!");
            setNewPassword('');
            setCurrentPassword('');
            setShowPasswordFields(false);
        }
        catch (error) {
            console.error(error);
            alert("Failed to change password.");
        }
        finally {
            setIsChanging(false);
        }
    };
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            getProfileData('admin')
                .then((data) => {
                setProfile(data);
                setLoading(false);
            })
                .catch((err) => {
                console.error("Error fetching admin profile:", err);
                setLoading(false);
            });
        }
        else {
            const franchiseId = localStorage.getItem("franchiseId") || '';
            getProfileData('franchise', franchiseId)
                .then((data) => {
                setProfile(data);
                setLoading(false);
            })
                .catch((err) => {
                console.error("Error fetching franchise profile:", err);
                setLoading(false);
            });
        }
    }, []);
    if (loading || !profile)
        return _jsx("div", { className: styles.loading, children: "Loading..." });
    const renderPasswordSection = () => (_jsxs("div", { className: styles.inlinePasswordSection, children: [!showPasswordFields && (_jsx("button", { className: `${styles.button} ${styles.buttonDanger}`, onClick: () => setShowPasswordFields(true), children: "Change Password" })), showPasswordFields && (_jsxs("div", { className: styles.passwordInputs, children: [_jsx("div", { className: styles.passwordField }), _jsxs("div", { className: styles.passwordField, children: [_jsx("input", { type: showNew ? 'text' : 'password', placeholder: "New Password", value: newPassword, onChange: (e) => setNewPassword(e.target.value) }), _jsx("span", { onClick: () => setShowNew(!showNew), className: styles.eyeIcon, children: showNew ? _jsx(FaEyeSlash, {}) : _jsx(FaEye, {}) })] }), _jsx("button", { className: `${styles.buttonPrimary} ${styles.button}`, onClick: handleChangePassword, disabled: isChanging, children: isChanging ? 'Saving...' : 'Save' })] }))] }));
    const renderTableRows = () => {
        const commonRows = [
            _jsxs("tr", { children: [_jsx("td", { children: "Email:" }), _jsx("td", { children: profile.email })] }, "email"),
            _jsxs("tr", { children: [_jsx("td", { children: "Password" }), _jsx("td", { children: renderPasswordSection() })] }, "password"),
            _jsxs("tr", { children: [_jsx("td", { children: "Card" }), _jsx("td", { children: _jsx("button", { className: styles.buttonPrimary, children: "View Card" }) })] }, "card"),
            _jsxs("tr", { children: [_jsx("td", { children: "Authorization Certificate" }), _jsx("td", { children: _jsx("button", { className: styles.buttonPrimary, children: "View Certificate" }) })] }, "cert"),
        ];
        if (localStorage.getItem("role") === "admin") {
            const p = profile;
            return [
                _jsxs("tr", { children: [_jsx("td", { children: "Name:" }), _jsx("td", { children: p.name })] }, "name"),
                _jsxs("tr", { children: [_jsx("td", { children: "Franchise Name:" }), _jsx("td", { children: p.franchiseName })] }, "franchiseName"),
                _jsxs("tr", { children: [_jsx("td", { children: "Contact Number:" }), _jsx("td", { children: p.contactNumber })] }, "contactNumber"),
                _jsxs("tr", { children: [_jsx("td", { children: "Address:" }), _jsx("td", { children: p.address })] }, "address"),
                _jsxs("tr", { children: [_jsx("td", { children: "Number of Franchises:" }), _jsx("td", { children: p.numberOfFranchises })] }, "numFranchises"),
                _jsxs("tr", { children: [_jsx("td", { children: "Number of Students:" }), _jsx("td", { children: p.numberOfStudents })] }, "numStudents"),
                ...commonRows
            ];
        }
        else {
            const p = profile;
            return [
                _jsxs("tr", { children: [_jsx("td", { children: "Centre Code" }), _jsx("td", { children: p.centerId })] }, "franchiseId"),
                _jsxs("tr", { children: [_jsx("td", { children: "Centre Name" }), _jsx("td", { children: p.instituteName })] }, "instituteName"),
                _jsxs("tr", { children: [_jsx("td", { children: "Centre Address" }), _jsx("td", { children: p.address })] }, "address"),
                _jsxs("tr", { children: [_jsx("td", { children: "Director's Name" }), _jsx("td", { children: p.directorName })] }, "directorName"),
                _jsxs("tr", { children: [_jsx("td", { children: "Designation" }), _jsx("td", { children: "Director" })] }, "designation"),
                _jsxs("tr", { children: [_jsx("td", { children: "Mobile No." }), _jsx("td", { children: p.mobile })] }, "mobile"),
                ...commonRows
            ];
        }
    };
    return (_jsx("div", { className: styles.dashboardContainer, children: _jsx("div", { className: styles.mainContent, children: _jsxs("div", { className: styles.pageContent, children: [_jsx("h1", { className: styles.profileTitle, children: localStorage.getItem("role") === "admin" ? "Admin Profile" : "Centre Profile" }), _jsx("div", { className: styles.profileSection, children: _jsx("table", { className: styles.profileTable, children: _jsx("tbody", { children: renderTableRows() }) }) })] }) }) }));
};
export default ProfileComponent;
