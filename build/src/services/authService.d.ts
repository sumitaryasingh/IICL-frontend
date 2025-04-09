interface LoginData {
    email: string;
    password: string;
    franchiseId?: number;
    adminId?: number;
}
interface ResponseData {
    message: string;
    user: {
        role: "admin" | "franchise";
        email: string;
    };
    franchiseId?: number;
    adminId?: number;
    data?: {
        franchises?: any[];
        students?: any[];
    };
}
interface RoleCheckResponse {
    role: "admin" | "franchise";
}
export declare const checkUserRole: (email: string) => Promise<RoleCheckResponse>;
export declare const loginUser: (data: LoginData) => Promise<ResponseData>;
export declare const logoutService: () => Promise<{
    message: string;
}>;
export {};
