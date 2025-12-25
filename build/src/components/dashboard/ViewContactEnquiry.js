import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import styles from "./styles/ViewEnquiry.module.css";
import { toast } from "react-toastify";
import { fetchContactEnquiries, deleteContactEnquiry } from "../../services/contactForm";
const ViewContactEnquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(10); // Define number of entries per page
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
    const displayedEnquiries = useMemo(() => {
        const indexOfLastEntry = currentPage * entriesPerPage;
        const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
        return enquiries.slice(indexOfFirstEntry, indexOfLastEntry); // Get the correct page of enquiries
    }, [currentPage, enquiries]);
    // Calculate total pages
    const totalPages = Math.ceil(enquiries.length / entriesPerPage);
    // Handler for deleting an enquiry
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this enquiry?"))
            return;
        try {
            await deleteContactEnquiry(id);
            setEnquiries((prev) => prev.filter((e) => e._id !== id));
            toast.success("Enquiry deleted successfully.");
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to delete the enquiry.");
        }
    };
    // Handler to navigate to the next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };
    // Handler to navigate to the previous page
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };
    return (_jsxs("div", { className: styles.container, children: [_jsx("h2", { children: "Contact Enquiries" }), displayedEnquiries.length === 0 ? (_jsx("p", { className: styles.noData, children: "No contact enquiries found." })) : (_jsx("div", { className: styles.tableContainer, children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Phone" }), _jsx("th", { children: "Message" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: displayedEnquiries.map((enquiry) => (_jsxs("tr", { children: [_jsx("td", { children: enquiry.name }), _jsx("td", { children: enquiry.email }), _jsx("td", { children: enquiry.phone }), _jsx("td", { children: enquiry.message }), _jsx("td", { children: _jsx("button", { className: styles.actionBtn, onClick: () => handleDelete(enquiry._id), children: "Delete" }) })] }, enquiry._id))) })] }) })), _jsxs("div", { className: styles.pagination, children: [_jsx("span", { children: `Showing ${displayedEnquiries.length} of ${enquiries.length} entries` }), _jsxs("div", { children: [_jsx("button", { onClick: handlePrevPage, disabled: currentPage === 1, className: styles.pageBtn, children: "Prev" }), _jsx("span", { children: `Page ${currentPage} of ${totalPages}` }), _jsx("button", { onClick: handleNextPage, disabled: currentPage === totalPages, className: styles.pageBtn, children: "Next" })] })] })] }));
};
export default ViewContactEnquiry;
