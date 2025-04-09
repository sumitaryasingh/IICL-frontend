import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/ViewFranchiseEnquiry.tsx
import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles/ViewEnquiry.module.css";
import { toast } from "react-toastify";
import { fetchFranchiseEnquiries } from "../../services/franchiseEnquiry";
const ViewFranchiseEnquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    useEffect(() => {
        const getEnquiries = async () => {
            try {
                const data = await fetchFranchiseEnquiries();
                setEnquiries(data);
            }
            catch (error) {
                toast.error("Error fetching contact enquiries.");
            }
        };
        getEnquiries();
    }, []);
    // Filter enquiries by matching search text in selected fields.
    const filteredData = useMemo(() => {
        if (!filterText)
            return enquiries;
        const lowerFilter = filterText.toLowerCase();
        return enquiries.filter((enquiry) => enquiry.branchName.toLowerCase().includes(lowerFilter) ||
            enquiry.directorName.toLowerCase().includes(lowerFilter) ||
            enquiry.email.toLowerCase().includes(lowerFilter) ||
            enquiry.phoneNumber.toLowerCase().includes(lowerFilter));
    }, [enquiries, filterText]);
    // Sort the filtered data based on the sortField and sortOrder.
    const sortedData = useMemo(() => {
        if (!sortField)
            return filteredData;
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
            }
            else {
                return sortOrder === "asc"
                    ? String(aValue).localeCompare(String(bValue))
                    : String(bValue).localeCompare(String(aValue));
            }
        });
    }, [filteredData, sortField, sortOrder]);
    // Calculate pagination values.
    const totalPages = useMemo(() => Math.ceil(sortedData.length / pageSize), [sortedData, pageSize]);
    const paginatedData = useMemo(() => {
        const indexOfLast = currentPage * pageSize;
        const indexOfFirst = indexOfLast - pageSize;
        return sortedData.slice(indexOfFirst, indexOfLast);
    }, [sortedData, currentPage, pageSize]);
    // Handlers
    const handleFilterChange = useCallback((e) => {
        setFilterText(e.target.value);
        setCurrentPage(1);
    }, []);
    const handleSort = useCallback((field) => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        }
        else {
            setSortField(field);
            setSortOrder("asc");
        }
    }, [sortField]);
    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, []);
    const handlePageSizeChange = useCallback((e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    }, []);
    const handleEdit = useCallback((id) => {
        console.log("Edit enquiry with id:", id);
        // Implement your edit logic here.
    }, []);
    const handleDelete = useCallback((id) => {
        console.log("Delete enquiry with id:", id);
        // Implement your delete logic here.
    }, []);
    return (_jsxs("div", { className: styles.container, children: [_jsx("h2", { children: "Franchise Enquiries" }), _jsxs("div", { className: styles.controls, children: [_jsx("div", { className: styles.filter, children: _jsx("input", { type: "text", placeholder: "Search enquiries...", value: filterText, onChange: handleFilterChange }) }), _jsxs("div", { className: styles.entries, children: [_jsx("label", { htmlFor: "entriesSelect", children: "Show " }), _jsxs("select", { id: "entriesSelect", value: pageSize, onChange: handlePageSizeChange, children: [_jsx("option", { value: 5, children: "5" }), _jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 20, children: "20" })] }), _jsx("span", { children: " entries" })] })] }), sortedData.length === 0 ? (_jsx("p", { className: styles.noData, children: "No enquiries found." })) : (_jsxs("div", { className: styles.tableContainer, children: [_jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsxs("th", { onClick: () => handleSort("id"), children: ["ID ", sortField === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("applyingFor"), children: ["Applying For ", sortField === "applyingFor" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("centerStatus"), children: ["Center Status ", sortField === "centerStatus" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("branchName"), children: ["Branch Name ", sortField === "branchName" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("directorName"), children: ["Director Name ", sortField === "directorName" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("email"), children: ["Email ", sortField === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("phoneNumber"), children: ["Phone ", sortField === "phoneNumber" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("address"), children: ["Address ", sortField === "address" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("city"), children: ["City ", sortField === "city" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("state"), children: ["State ", sortField === "state" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("pincode"), children: ["Pincode ", sortField === "pincode" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsx("th", { children: "Facilities" }), _jsxs("th", { onClick: () => handleSort("existingFranchise"), children: ["Existing Franchise ", sortField === "existingFranchise" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsxs("th", { onClick: () => handleSort("additionalInfo"), children: ["Additional Info ", sortField === "additionalInfo" ? (sortOrder === "asc" ? "▲" : "▼") : ""] }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: paginatedData.map((enquiry) => (_jsxs("tr", { children: [_jsx("td", { children: enquiry.id }), _jsx("td", { children: enquiry.applyingFor }), _jsx("td", { children: enquiry.centerStatus }), _jsx("td", { children: enquiry.branchName }), _jsx("td", { children: enquiry.directorName }), _jsx("td", { children: enquiry.email }), _jsx("td", { children: enquiry.phoneNumber }), _jsx("td", { children: enquiry.address }), _jsx("td", { children: enquiry.city }), _jsx("td", { children: enquiry.state }), _jsx("td", { children: enquiry.pincode }), _jsx("td", { children: enquiry.facilities.join(", ") }), _jsx("td", { children: enquiry.existingFranchise }), _jsx("td", { children: enquiry.additionalInfo || "-" }), _jsxs("td", { children: [_jsx("button", { className: styles.actionBtn, onClick: () => handleEdit(enquiry.id), children: "Edit" }), _jsx("button", { className: styles.actionBtn, onClick: () => handleDelete(enquiry.id), children: "Delete" })] })] }, enquiry.id))) })] }), _jsxs("div", { className: styles.pagination, children: [_jsx("button", { disabled: currentPage === 1, onClick: () => handlePageChange(currentPage - 1), children: "Prev" }), _jsxs("span", { children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { disabled: currentPage === totalPages || totalPages === 0, onClick: () => handlePageChange(currentPage + 1), children: "Next" })] })] }))] }));
};
export default ViewFranchiseEnquiry;
