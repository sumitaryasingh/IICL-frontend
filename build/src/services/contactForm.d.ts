interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}
interface ContactFormResponse {
    success: boolean;
    message: string;
}
export declare const submitContactForm: (formData: ContactFormData) => Promise<ContactFormResponse>;
export interface ContactEnquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
}
export declare const fetchContactEnquiries: () => Promise<ContactEnquiry[]>;
export {};
