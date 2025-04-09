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
/**
 * Fetches profile data based on role.
 *
 * @param role - Either "admin" or "franchise".
 * @param franchiseId - Required if role is "franchise".
 * @returns The profile data.
 */
export declare const getProfileData: (role: "admin" | "franchise", franchiseId?: string) => Promise<ProfileData>;
