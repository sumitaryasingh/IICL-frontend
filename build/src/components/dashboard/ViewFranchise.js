import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/ViewFranchise.tsx
import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles/ViewFranchise.module.css";
import { fetchFranchiseData, deleteFranchiseData } from "../../services/viewFranchise";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ViewFranchise = () => {
    // Franchise data state
    const [franchises, setFranchises] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    // Fetch franchise data on mount
    useEffect(() => {
        const getData = async () => {
            const data = await fetchFranchiseData();
            setFranchises(data);
        };
        getData();
    }, []);
    // Compute filtered and sorted data
    const filteredData = useMemo(() => {
        let data = [...franchises];
        if (filterText) {
            const lowerFilter = filterText.toLowerCase();
            data = data.filter((item) => item.firstName.toLowerCase().includes(lowerFilter) ||
                item.lastName.toLowerCase().includes(lowerFilter) ||
                item.email.toLowerCase().includes(lowerFilter));
        }
        if (sortField) {
            data.sort((a, b) => {
                const aField = a[sortField];
                const bField = b[sortField];
                if ((aField ?? "") < (bField ?? ""))
                    return sortOrder === "asc" ? -1 : 1;
                if ((aField ?? "") > (bField ?? ""))
                    return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [franchises, filterText, sortField, sortOrder]);
    // Reset current page when filter or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filterText, sortField, sortOrder]);
    // Pagination calculations
    const totalPages = useMemo(() => Math.ceil(filteredData.length / pageSize), [filteredData, pageSize]);
    const indexOfLast = currentPage * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    const currentItems = useMemo(() => filteredData.slice(indexOfFirst, indexOfLast), [filteredData, indexOfFirst, indexOfLast]);
    // Handlers
    const handleSort = useCallback((field) => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        }
        else {
            setSortField(field);
            setSortOrder("asc");
        }
    }, [sortField]);
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);
    const handlePageSizeChange = useCallback((e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    }, []);
    const navigate = useNavigate();
    const handleEdit = useCallback((data) => {
        console.log("Edit clicked for:", data);
        navigate(`/dashboard/franchise/add/${data._id}`);
    }, [navigate]);
    const handleDelete = useCallback(async (data) => {
        console.log("Delete clicked for:", data);
        // Ask for confirmation
        const confirmDelete = window.confirm(`Are you sure you want to delete franchise for ${data.firstName} ${data.lastName}?`);
        if (confirmDelete) {
            try {
                await deleteFranchiseData(data._id);
                const refreshedData = await fetchFranchiseData();
                setFranchises(refreshedData);
                toast.success("Franchise deleted successfully!");
            }
            catch (error) {
                console.error("Error deleting franchise:", error);
                toast.error("Failed to delete. Please try again.");
            }
        }
    }, []);
    return (_jsx("div", { children: _jsx("div", { className: styles.mainContent, children: _jsxs("div", { className: styles.pageContent, children: [_jsx("h2", { children: "View Franchise" }), _jsx("div", { className: styles.filterContainer, children: _jsx("input", { type: "text", placeholder: "Filter by name or email...", value: filterText, onChange: (e) => setFilterText(e.target.value) }) }), _jsxs("div", { className: styles.entries, children: [_jsx("label", { htmlFor: "entriesSelect", children: "Show " }), _jsxs("select", { id: "entriesSelect", value: pageSize, onChange: handlePageSizeChange, children: [_jsx("option", { value: 5, children: "5" }), _jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 20, children: "20" })] }), _jsx("span", { children: " entries" })] }), _jsx("div", { className: styles.tableContainer, children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { onClick: () => handleSort("firstName"), children: "First Name" }), _jsx("th", { onClick: () => handleSort("lastName"), children: "Last Name" }), _jsx("th", { onClick: () => handleSort("dob"), children: "DOB" }), _jsx("th", { onClick: () => handleSort("directorName"), children: "Director Name" }), _jsx("th", { onClick: () => handleSort("instituteName"), children: "Institute Name" }), _jsx("th", { children: "Address" }), _jsx("th", { onClick: () => handleSort("mobile"), children: "Mobile" }), _jsx("th", { onClick: () => handleSort("email"), children: "Email" }), _jsx("th", { onClick: () => handleSort("aadharId"), children: "Aadhar ID" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: currentItems.length > 0 ? (currentItems.map((franchise, index) => (_jsxs("tr", { children: [_jsx("td", { children: franchise.firstName }), _jsx("td", { children: franchise.lastName }), _jsx("td", { children: franchise.dob }), _jsx("td", { children: franchise.directorName }), _jsx("td", { children: franchise.instituteName }), _jsx("td", { children: franchise.address }), _jsx("td", { children: franchise.mobile }), _jsx("td", { children: franchise.email }), _jsx("td", { children: franchise.aadharId }), _jsxs("td", { children: [_jsx("button", { className: styles.editBtn, onClick: () => handleEdit(franchise), children: "Edit" }), _jsx("button", { className: styles.deleteBtn, onClick: () => handleDelete(franchise), children: "Delete" })] })] }, index)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 10, children: "No records found" }) })) })] }) }), _jsxs("div", { className: styles.pagination, children: [_jsx("button", { disabled: currentPage === 1, onClick: () => handlePageChange(currentPage - 1), children: "Prev" }), _jsxs("span", { children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { disabled: currentPage === totalPages || totalPages === 0, onClick: () => handlePageChange(currentPage + 1), children: "Next" })] })] }) }) }));
};
export default ViewFranchise;
