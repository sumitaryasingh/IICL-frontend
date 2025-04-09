import React from "react";
import "react-toastify/dist/ReactToastify.css";
interface FranchiseFormData {
    _id: string;
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
    franchiseId: number;
    role: string;
}
interface AddFranchiseFormProps {
    editData?: FranchiseFormData | null;
}
declare const AddFranchiseForm: React.FC<AddFranchiseFormProps>;
export default AddFranchiseForm;
