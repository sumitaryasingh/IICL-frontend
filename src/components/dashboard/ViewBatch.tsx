// components/ViewBatch.tsx
import React, { useState, useEffect } from "react";
import styles from "./styles/ViewBatch.module.css";
import Navbar from "./Navbar";
import DashboardSidebar from "./DashboardSidebar";
import { fetchBatchOptions, BatchData } from "../../services/batchService";

const ViewBatch: React.FC = () => {
  // State for batch data
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [filteredData, setFilteredData] = useState<BatchData[]>([]);

  // States for filtering, sorting, and pagination
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<keyof BatchData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);

  // Fetch data from backend (or fallback sample data) on mount
  useEffect(() => {
    const getBatches = async () => {
      const franchiseIdData = localStorage.getItem("franchiseId") || "";
      const data = await fetchBatchOptions(franchiseIdData);
      setBatches(data);
      setFilteredData(data);
    };
    getBatches();
  }, []);

  // Update filtered data whenever dependencies change
  // useEffect(() => {
  //   let data = [...batches];

  //   // Filtering by course or time
  //   if (filterText) {
  //     data = data.filter((item) =>
  //       item.course.toLowerCase().includes(filterText.toLowerCase()) ||
  //       item.time.toLowerCase().includes(filterText.toLowerCase())
  //     );
  //   }

  //   // Sorting if a sort field is selected
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
  //   setCurrentPage(1); // Reset to first page when data changes
  // }, [filterText, batches, sortField, sortOrder]);

  // Calculate pagination indices
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Toggle sort field and order
  const handleSort = (field: keyof BatchData) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Dummy event handlers for edit and delete actions
  const handleEdit = (batch: BatchData) => {
    console.log("Editing batch:", batch);
    // Implement your edit functionality here.
  };

  const handleDelete = (batch: BatchData) => {
    console.log("Deleting batch:", batch);
    // Implement your delete functionality here.
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <Navbar />
        <div className={styles.pageContent}>
          <h2>View Batch</h2>
          {/* Show Entries Selector */}
          <div className={styles.entriesSelector}>
            <label htmlFor="entries">Show </label>
            <select
              id="entries"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span> entries</span>
          </div>

          {/* Filter Input */}
          <div className={styles.filterContainer}>
            <input
              type="text"
              placeholder="Filter by course or time..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {/* Responsive Table Container */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => handleSort("course")}>Course</th>
                  <th onClick={() => handleSort("time")}>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((batch, index) => (
                    <tr key={index}>
                      <td>{batch.course}</td>
                      <td>{batch.time}</td>
                      <td>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEdit(batch)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(batch)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBatch;
