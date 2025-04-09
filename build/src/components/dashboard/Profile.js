import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/ProfileComponent.tsx
import { useEffect, useState } from 'react';
import { getProfileData } from '../../services/profileService';
import styles from './styles/Profile.module.css';
const ProfileComponent = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Assume the user's role is saved in localStorage
        const role = localStorage.getItem("role");
        if (role === "admin") {
            // Fetch admin profile data
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
            // For franchise, get the franchiseId from localStorage and fetch its data
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
    if (loading || !profile) {
        return _jsx("div", { className: styles.loading, children: "Loading..." });
    }
    // Render admin profile if the role is admin, otherwise render franchise profile.
    if (localStorage.getItem("role") === "admin") {
        const adminProfile = profile;
        return (_jsx("div", { className: styles.dashboardContainer, children: _jsx("div", { className: styles.mainContent, children: _jsxs("div", { className: styles.pageContent, children: [_jsx("h1", { className: styles.profileTitle, children: "Admin Profile" }), _jsxs("div", { className: styles.profileSection, children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", adminProfile.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Franchise Name:" }), " ", adminProfile.franchiseName] }), _jsxs("p", { children: [_jsx("strong", { children: "Contact Number:" }), " ", adminProfile.contactNumber] }), _jsxs("p", { children: [_jsx("strong", { children: "Address:" }), " ", adminProfile.address] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", adminProfile.email] }), _jsxs("p", { children: [_jsx("strong", { children: "Number of Franchises:" }), " ", adminProfile.numberOfFranchises] }), _jsxs("p", { children: [_jsx("strong", { children: "Number of Students:" }), " ", adminProfile.numberOfStudents] })] })] }) }) }));
    }
    else {
        const franchiseProfile = profile;
        return (_jsx("div", { className: styles.dashboardContainer, children: _jsx("div", { className: styles.mainContent, children: _jsxs("div", { className: styles.pageContent, children: [_jsx("h1", { className: styles.profileTitle, children: "Centre Profile" }), _jsx("div", { className: styles.profileSection, children: _jsx("table", { className: styles.profileTable, children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: "Centre Code" }), _jsx("td", { children: franchiseProfile.franchiseId })] }), _jsxs("tr", { children: [_jsx("td", { children: "Centre Name" }), _jsx("td", { children: franchiseProfile.instituteName })] }), _jsxs("tr", { children: [_jsx("td", { children: "Centre Address" }), _jsx("td", { children: franchiseProfile.address })] }), _jsxs("tr", { children: [_jsx("td", { children: "Director's Name" }), _jsx("td", { children: franchiseProfile.directorName })] }), _jsxs("tr", { children: [_jsx("td", { children: "Designation" }), _jsx("td", { children: "Director" })] }), _jsxs("tr", { children: [_jsx("td", { children: "Mobile No." }), _jsx("td", { children: franchiseProfile.mobile })] }), _jsxs("tr", { children: [_jsx("td", { children: "E-Mail" }), _jsx("td", { children: franchiseProfile.email })] }), _jsxs("tr", { children: [_jsx("td", { children: "Password" }), _jsx("td", { children: _jsx("button", { children: "Change Passoword" }) })] }), _jsxs("tr", { children: [_jsx("td", { children: "Card" }), _jsx("td", { children: _jsx("button", { children: "View Card" }) })] }), _jsxs("tr", { children: [_jsx("td", { children: "Authorization Certificate" }), _jsx("td", { children: _jsx("button", { children: "View Certificate" }) })] })] }) }) })] }) }) }));
    }
};
export default ProfileComponent;
