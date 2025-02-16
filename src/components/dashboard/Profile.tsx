import React, { useEffect, useState, useCallback } from 'react';
import { getProfileData } from '../../services/profileService';
import styles from './styles/Dashboard.module.css'; // Layout styles (dashboardContainer, mainContent, etc.)
import './styles/profile.css'; // Profile-specific styles

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
    return <div className="loading">Loading...</div>;
  }

  return (
    // Add the "sidebar-closed" class when the sidebar is not open.
    <div className={`${styles.dashboardContainer} `}>
     
      
      {/* Main Content Area */}
      <div className={styles.mainContent}>
        
        <div className={styles.pageContent}>
          <h1 className="profile-title">{isAdmin ? 'Admin Profile' : 'Franchise Profile'}</h1>
          {isAdmin ? (
            <div className="admin-profile profile-section">
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Franchise Name:</strong> {profileData.franchiseName}</p>
              <p><strong>Contact Number:</strong> {profileData.contactNumber}</p>
              <p><strong>Address:</strong> {profileData.address}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Number of Franchises:</strong> {profileData.numberOfFranchises}</p>
              <p><strong>Number of Students:</strong> {profileData.numberOfStudents}</p>
            </div>
          ) : (
            <div className="franchise-profile profile-section">
              <table className="profile-table">
                <tbody>
                  <tr>
                    <td><strong>Centre Code</strong></td>
                    <td>{profileData.centreCode}</td>
                  </tr>
                  <tr>
                    <td><strong>Centre Name</strong></td>
                    <td>{profileData.centreName}</td>
                  </tr>
                  <tr>
                    <td><strong>Centre Address</strong></td>
                    <td>{profileData.centreAddress}</td>
                  </tr>
                  <tr>
                    <td><strong>Director's Name</strong></td>
                    <td>{profileData.directorName}</td>
                  </tr>
                  <tr>
                    <td><strong>Designation</strong></td>
                    <td>{profileData.designation}</td>
                  </tr>
                  <tr>
                    <td><strong>Mobile No.</strong></td>
                    <td>{profileData.mobileNo}</td>
                  </tr>
                  <tr>
                    <td><strong>E-Mail</strong></td>
                    <td>{profileData.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Password</strong></td>
                    <td>{profileData.password}</td>
                  </tr>
                  <tr>
                    <td><strong>Card</strong></td>
                    <td>{profileData.card}</td>
                  </tr>
                  <tr>
                    <td><strong>Authorization Certificate</strong></td>
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
