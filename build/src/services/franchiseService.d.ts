export interface FranchiseData {
    firstName: string;
    lastName: string;
    dob: string;
    directorName: string;
    instituteName: string;
    city: string;
    state: string;
    address: string;
    mobile: string;
    email: string;
    aadharId: string;
    password: string;
    franchiseId?: number;
    role?: string;
}
export declare const submitFranchiseData: (data: FranchiseData) => Promise<any>;
