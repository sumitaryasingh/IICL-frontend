export interface FranchiseEnquiry {
    id: number;
    applyingFor: string;
    centerStatus: string;
    branchName: string;
    directorName: string;
    email: string;
    phoneNumber: string;
    whatsappNumber?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    facilities: string[];
    existingFranchise: string;
    additionalInfo?: string;
}
export declare const fetchFranchiseEnquiries: () => Promise<FranchiseEnquiry[]>;
