import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getProfileData, FranchiseData, AdminProfileData, ProfileData } from '../../services/profileService';
import styles from './styles/Profile.module.css';
import { changePassword } from '../../services/authService';

const ProfileComponent: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    } catch (error) {
      console.error(error);
      alert("Failed to change password.");
    } finally {
      setIsChanging(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "admin") {
      getProfileData('admin')
        .then((data: ProfileData) => {
          setProfile(data as AdminProfileData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching admin profile:", err);
          setLoading(false);
        });
    } else {
      const franchiseId = localStorage.getItem("franchiseId") || '';
      getProfileData('franchise', franchiseId)
        .then((data: ProfileData) => {
          setProfile(data as FranchiseData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching franchise profile:", err);
          setLoading(false);
        });
    }
  }, []);

  if (loading || !profile) return <div className={styles.loading}>Loading...</div>;

  const renderPasswordSection = () => (
    <div className={styles.inlinePasswordSection}>
      {!showPasswordFields && (
        <button
          className={`${styles.button} ${styles.buttonDanger}`}
          onClick={() => setShowPasswordFields(true)}
        >
          Change Password
        </button>
      )}
      {showPasswordFields && (
        <div className={styles.passwordInputs}>
          <div className={styles.passwordField}>
          </div>
          <div className={styles.passwordField}>
            <input
              type={showNew ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span onClick={() => setShowNew(!showNew)} className={styles.eyeIcon}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            className={`${styles.buttonPrimary} ${styles.button}`}
            onClick={handleChangePassword}
            disabled={isChanging}
          >
            {isChanging ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}
    </div>
  );

  const renderTableRows = () => {
    const commonRows = [
      <tr key="email"><td>Email:</td><td>{profile.email}</td></tr>,
      <tr key="password"><td>Password</td><td>{renderPasswordSection()}</td></tr>,
      <tr key="card"><td>Card</td><td><button className={styles.buttonPrimary}>View Card</button></td></tr>,
      <tr key="cert"><td>Authorization Certificate</td><td><button className={styles.buttonPrimary}>View Certificate</button></td></tr>,
    ];

    if (localStorage.getItem("role") === "admin") {
      const p = profile as AdminProfileData;
      return [
        <tr key="name"><td>Name:</td><td>{p.name}</td></tr>,
        <tr key="franchiseName"><td>Franchise Name:</td><td>{p.franchiseName}</td></tr>,
        <tr key="contactNumber"><td>Contact Number:</td><td>{p.contactNumber}</td></tr>,
        <tr key="address"><td>Address:</td><td>{p.address}</td></tr>,
        <tr key="numFranchises"><td>Number of Franchises:</td><td>{p.numberOfFranchises}</td></tr>,
        <tr key="numStudents"><td>Number of Students:</td><td>{p.numberOfStudents}</td></tr>,
        ...commonRows
      ];
    } else {
      const p = profile as FranchiseData;
      return [
        <tr key="franchiseId"><td>Centre Code</td><td>{p.centerId}</td></tr>,
        <tr key="instituteName"><td>Centre Name</td><td>{p.instituteName}</td></tr>,
        <tr key="address"><td>Centre Address</td><td>{p.address}</td></tr>,
        <tr key="directorName"><td>Director's Name</td><td>{p.directorName}</td></tr>,
        <tr key="designation"><td>Designation</td><td>Director</td></tr>,
        <tr key="mobile"><td>Mobile No.</td><td>{p.mobile}</td></tr>,
        ...commonRows
      ];
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <div className={styles.pageContent}>
          <h1 className={styles.profileTitle}>
            {localStorage.getItem("role") === "admin" ? "Admin Profile" : "Centre Profile"}
          </h1>
          <div className={styles.profileSection}>
            <table className={styles.profileTable}>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
