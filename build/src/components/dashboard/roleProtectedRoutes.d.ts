import React from "react";
interface RoleProtectedRouteProps {
    allowedRoles: string[];
}
declare const RoleProtectedRoute: React.FC<RoleProtectedRouteProps>;
export default RoleProtectedRoute;
