import React, { useEffect, useState } from 'react';
import { getProfileData } from '../../services/profileService';
import styles from './styles/Profile.module.css'; // Using our new CSS module

const AdminFranchiseProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    getProfileData().then((data: any) => {
      if (!data) {
        // Fallback sample data if profile data is not available
        data = {
          role: 'franchise',
          centreCode: '12345',
          centreName: 'Sample Centre',
          centreAddress: '123 Sample Street',
          directorName: 'John Doe',
          designation: 'Director',
          mobileNo: '1234567890',
          email: 'sample@example.com',
          password: 'password123',
          card: 'Sample Card',
          authorizationCertificate: 'Sample Certificate'
        };
      }
      setProfileData(data);
      setIsAdmin(data.role === 'admin');
    });
  }, []);

  if (!profileData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <div className={styles.pageContent}>
          <h1 className={styles.profileTitle}>
            {isAdmin ? 'Admin Profile' : 'Franchise Profile'}
          </h1>
          {isAdmin ? (
            <div className={styles.profileSection}>
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Franchise Name:</strong> {profileData.franchiseName}</p>
              <p><strong>Contact Number:</strong> {profileData.contactNumber}</p>
              <p><strong>Address:</strong> {profileData.address}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Number of Franchises:</strong> {profileData.numberOfFranchises}</p>
              <p><strong>Number of Students:</strong> {profileData.numberOfStudents}</p>
            </div>
          ) : (
            <div className={styles.profileSection}>
              <table className={styles.profileTable}>
                <tbody>
                  <tr>
                    <td>Centre Code</td>
                    <td>{profileData.centreCode}</td>
                  </tr>
                  <tr>
                    <td>Centre Name</td>
                    <td>{profileData.centreName}</td>
                  </tr>
                  <tr>
                    <td>Centre Address</td>
                    <td>{profileData.centreAddress}</td>
                  </tr>
                  <tr>
                    <td>Director's Name</td>
                    <td>{profileData.directorName}</td>
                  </tr>
                  <tr>
                    <td>Designation</td>
                    <td>{profileData.designation}</td>
                  </tr>
                  <tr>
                    <td>Mobile No.</td>
                    <td>{profileData.mobileNo}</td>
                  </tr>
                  <tr>
                    <td>E-Mail</td>
                    <td>{profileData.email}</td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>{profileData.password}</td>
                  </tr>
                  <tr>
                    <td>Card</td>
                    <td>{profileData.card}</td>
                  </tr>
                  <tr>
                    <td>Authorization Certificate</td>
                    <td>{profileData.authorizationCertificate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFranchiseProfile;
