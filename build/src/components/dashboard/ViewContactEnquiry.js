import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/ViewContactEnquiry.tsx
import { useState, useEffect, useMemo } from "react";
import styles from "./styles/ViewEnquiry.module.css";
import { toast } from "react-toastify";
import { fetchContactEnquiries } from "../../services/contactForm";
const ViewContactEnquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    useEffect(() => {
        const getEnquiries = async () => {
            try {
                const data = await fetchContactEnquiries();
                setEnquiries(data);
            }
            catch (error) {
                toast.error("Error fetching contact enquiries.");
            }
        };
        getEnquiries();
    }, []);
    // Memoize the enquiries list to avoid unnecessary recalculations.
    const displayedEnquiries = useMemo(() => enquiries, [enquiries]);
    // Handler for editing an enquiry
    const handleEdit = (id) => {
        console.log("Edit enquiry with id:", id);
        // Implement your edit logic here (e.g., open an edit modal or navigate to an edit page)
    };
    // Handler for deleting an enquiry
    const handleDelete = (id) => {
        console.log("Delete enquiry with id:", id);
        // Implement your delete logic here (e.g., call an API to delete the enquiry)
    };
    return (_jsxs("div", { className: styles.container, children: [_jsx("h2", { children: "Contact Enquiries" }), displayedEnquiries.length === 0 ? (_jsx("p", { className: styles.noData, children: "No contact enquiries found." })) : (_jsx("div", { className: styles.tableContainer, children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Phone" }), _jsx("th", { children: "Message" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: displayedEnquiries.map((enquiry) => (_jsxs("tr", { children: [_jsx("td", { children: enquiry.id }), _jsx("td", { children: enquiry.name }), _jsx("td", { children: enquiry.email }), _jsx("td", { children: enquiry.phone }), _jsx("td", { children: enquiry.message }), _jsxs("td", { children: [_jsx("button", { className: styles.actionBtn, onClick: () => handleEdit(enquiry.id), children: "Edit" }), _jsx("button", { className: styles.actionBtn, onClick: () => handleDelete(enquiry.id), children: "Delete" })] })] }, enquiry.id))) })] }) }))] }));
};
export default ViewContactEnquiry;
