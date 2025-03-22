// components/ProfileComponent.tsx
import React, { useEffect, useState } from 'react';
import { getProfileData, FranchiseData, AdminProfileData, ProfileData } from '../../services/profileService';
import styles from './styles/Profile.module.css';

const ProfileComponent: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Assume the user's role is saved in localStorage
    const role = localStorage.getItem("role");
    
    if (role === "admin") {
      // Fetch admin profile data
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
      // For franchise, get the franchiseId from localStorage and fetch its data
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

  if (loading || !profile) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Render admin profile if the role is admin, otherwise render franchise profile.
  if (localStorage.getItem("role") === "admin") {
    const adminProfile = profile as AdminProfileData;
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
          <div className={styles.pageContent}>
            <h1 className={styles.profileTitle}>Admin Profile</h1>
            <div className={styles.profileSection}>
              <p><strong>Name:</strong> {adminProfile.name}</p>
              <p><strong>Franchise Name:</strong> {adminProfile.franchiseName}</p>
              <p><strong>Contact Number:</strong> {adminProfile.contactNumber}</p>
              <p><strong>Address:</strong> {adminProfile.address}</p>
              <p><strong>Email:</strong> {adminProfile.email}</p>
              <p><strong>Number of Franchises:</strong> {adminProfile.numberOfFranchises}</p>
              <p><strong>Number of Students:</strong> {adminProfile.numberOfStudents}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const franchiseProfile = profile as FranchiseData;
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
          <div className={styles.pageContent}>
            <h1 className={styles.profileTitle}>Centre Profile</h1>
            <div className={styles.profileSection}>
              <table className={styles.profileTable}>
                <tbody>
                  <tr>
                    <td>Centre Code</td>
                    <td>{franchiseProfile.franchiseId}</td>
                  </tr>
                  <tr>
                    <td>Centre Name</td>
                    <td>{franchiseProfile.instituteName}</td>
                  </tr>
                  <tr>
                    <td>Centre Address</td>
                    <td>{franchiseProfile.address}</td>
                  </tr>
                  <tr>
                    <td>Director's Name</td>
                    <td>{franchiseProfile.directorName}</td>
                  </tr>
                  <tr>
                    <td>Designation</td>
                    <td>Director</td>
                  </tr>
                  <tr>
                    <td>Mobile No.</td>
                    <td>{franchiseProfile.mobile}</td>
                  </tr>
                  <tr>
                    <td>E-Mail</td>
                    <td>{franchiseProfile.email}</td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>
                      <button>
                        Change Passoword
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Card</td>
                    <td>
                      <button>
                        View Card
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Authorization Certificate</td>
                    <td>
                      <button>
                        View Certificate
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileComponent;
