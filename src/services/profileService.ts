// services/profileService.ts
import axios from 'axios';

export interface FranchiseData {
  firstName: string;
  lastName: string;
  dob: string;
  directorName: string;
  instituteName: string;
  address: string;
  mobile: string;
  email: string;
  aadharId: string;
  franchiseId: number;
}

export interface AdminProfileData {
  name: string;
  franchiseName: string;
  contactNumber: string;
  address: string;
  email: string;
  numberOfFranchises: number;
  numberOfStudents: number;
  role: 'admin';
}

export type ProfileData = FranchiseData | AdminProfileData;

const franchiseSampleData: FranchiseData = {
  firstName: "John",
  lastName: "Doe",
  dob: "08-01-1990",
  directorName: "John Doe",
  instituteName: "St. Mary Coding School",
  address: "Street 14 Balia",
  mobile: "9876789876",
  email: "john@gmail.com",
  aadharId: "878912345674",
  franchiseId: 12345
};

const adminSampleData: AdminProfileData = {
  name: "Admin User",
  franchiseName: "Admin Franchise",
  contactNumber: "9999999999",
  address: "123 Admin Street",
  email: "admin@example.com",
  numberOfFranchises: 10,
  numberOfStudents: 200,
  role: 'admin'
};

/**
 * Fetches profile data based on role.
 * 
 * @param role - Either "admin" or "franchise".
 * @param franchiseId - Required if role is "franchise".
 * @returns The profile data.
 */
export const getProfileData = async (
  role: 'admin' | 'franchise',
  franchiseId?: string
): Promise<ProfileData> => {
  if (role === 'admin') {
    try {
      const response = await axios.get<AdminProfileData[]>('/api/admin/profile');
      // Assuming the API returns an array and we want the first admin profile.
      if (response.data && response.data.length > 0) {
        return response.data[0];
      } else {
        return adminSampleData;
      }
    } catch (error) {
      console.error('Error fetching admin profile data:', error);
      return adminSampleData;
    }
  } else {
    // For franchise role, ensure a franchiseId is provided.
    if (!franchiseId) {
      console.warn("No franchiseId provided for franchise profile.");
      return franchiseSampleData;
    }
    try {
      const response = await axios.get<FranchiseData[]>(`/api/profile/franchise-profile/${franchiseId}`);
      // Assuming the API returns an array and we want the first item.
      if (response.data && response.data.length > 0) {
        return response.data[0];
      } else {
        return franchiseSampleData;
      }
    } catch (error) {
      console.error('Error fetching franchise profile data:', error);
      return franchiseSampleData;
    }
  }
};
