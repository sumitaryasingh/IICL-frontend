export interface FranchiseData {
    _id: string;
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
export declare const fetchFranchiseData: () => Promise<FranchiseData[]>;
export declare const editFranchiseData: (_id: string, data: FranchiseData) => Promise<FranchiseData>;
