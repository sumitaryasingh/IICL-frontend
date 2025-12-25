import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import styles from "./styles/ViewBatch.module.css";
import Navbar from "./Navbar";
import { fetchBatchOptions, deleteBatchData } from "../../services/batchService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ViewBatch = () => {
    // State for batch data
    const [batches, setBatches] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    // States for filtering, sorting, and pagination
    const [filterText, setFilterText] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();
    // Fetch data from backend on mount
    useEffect(() => {
        const getBatches = async () => {
            const franchiseIdData = localStorage.getItem("franchiseId") || "";
            const data = await fetchBatchOptions(franchiseIdData);
            setBatches(data);
            setFilteredData(data);
        };
        getBatches();
    }, []);
    // (Optional) Filtering and sorting can be updated if needed.
    // For now, we assume filteredData is already set.
    // You may uncomment and adjust this effect if you need to re-filter on filterText change.
    // useEffect(() => {
    //   let data = [...batches];
    //   if (filterText) {
    //     const lowerFilter = filterText.toLowerCase();
    //     data = data.filter((item) =>
    //       item.course.toLowerCase().includes(lowerFilter) ||
    //       item.time.toLowerCase().includes(lowerFilter)
    //     );
    //   }
    //   if (sortField) {
    //     data.sort((a, b) => {
    //       const aField = a[sortField];
    //       const bField = b[sortField];
    //       if (aField < bField) return sortOrder === "asc" ? -1 : 1;
    //       if (aField > bField) return sortOrder === "asc" ? 1 : -1;
    //       return 0;
    //     });
    //   }
    //   setFilteredData(data);
    //   setCurrentPage(1);
    // }, [filterText, batches, sortField, sortOrder]);
    // Calculate pagination indices
    const indexOfLast = currentPage * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredData.length / pageSize);
    // Toggle sort field and order
    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }
        else {
            setSortField(field);
            setSortOrder("asc");
        }
    };
    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // Edit handler: navigate to edit route
    const handleEdit = useCallback((batch) => {
        navigate(`/dashboard/batches/edit/${batch._id}`);
    }, [navigate]);
    const handleDelete = useCallback(async (batch) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the batch for course "${batch.course}"?`);
        if (confirmDelete) {
            try {
                await deleteBatchData(batch._id);
                setBatches((prev) => prev.filter((item) => item._id !== batch._id));
                setFilteredData((prev) => prev.filter((item) => item._id !== batch._id));
                toast.success("Batch deleted successfully!");
            }
            catch (error) {
                console.error("Error deleting batch:", error);
                toast.error("Failed to delete batch. Please try again.");
            }
        }
    }, []);
    return (_jsx("div", { className: styles.dashboardContainer, children: _jsxs("div", { className: styles.mainContent, children: [_jsx(Navbar, {}), _jsxs("div", { className: styles.pageContent, children: [_jsx("h2", { children: "View Batch" }), _jsxs("div", { className: styles.entriesSelector, children: [_jsx("label", { htmlFor: "entries", children: "Show " }), _jsxs("select", { id: "entries", value: pageSize, onChange: (e) => setPageSize(Number(e.target.value)), children: [_jsx("option", { value: 5, children: "5" }), _jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 20, children: "20" })] }), _jsx("span", { children: " entries" })] }), _jsx("div", { className: styles.filterContainer, children: _jsx("input", { type: "text", placeholder: "Filter by course or time...", value: filterText, onChange: (e) => setFilterText(e.target.value) }) }), _jsx("div", { className: styles.tableContainer, children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { onClick: () => handleSort("course"), children: "Course" }), _jsx("th", { onClick: () => handleSort("time"), children: "Time" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: currentItems.length > 0 ? (currentItems.map((batch, index) => (_jsxs("tr", { children: [_jsx("td", { children: batch.course }), _jsx("td", { children: batch.time }), _jsxs("td", { children: [_jsx("button", { className: styles.editBtn, onClick: () => handleEdit(batch), children: "Edit" }), _jsx("button", { className: styles.deleteBtn, onClick: () => handleDelete(batch), children: "Delete" })] })] }, index)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 3, children: "No records found" }) })) })] }) }), _jsxs("div", { className: styles.pagination, children: [_jsx("button", { disabled: currentPage === 1, onClick: () => handlePageChange(currentPage - 1), children: "Prev" }), _jsxs("span", { children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { disabled: currentPage === totalPages || totalPages === 0, onClick: () => handlePageChange(currentPage + 1), children: "Next" })] })] })] }) }));
};
export default ViewBatch;
