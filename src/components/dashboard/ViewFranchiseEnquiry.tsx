// components/ViewFranchiseEnquiry.tsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles/ViewEnquiry.module.css";
import { toast } from "react-toastify";
import { deleteFranchiseEnquiry, fetchFranchiseEnquiries, FranchiseEnquiry } from "../../services/franchiseEnquiry";

const ViewFranchiseEnquiry: React.FC = () => {
  const [enquiries, setEnquiries] = useState<FranchiseEnquiry[]>([]);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<keyof FranchiseEnquiry | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const getEnquiries = async () => {
      try {
        const data = await fetchFranchiseEnquiries();
        setEnquiries(data);
      } catch (error) {
        toast.error("Error fetching contact enquiries.");
      }
    };
    getEnquiries();
  }, []);

  // Filter enquiries by matching search text in selected fields.
  const filteredData = useMemo(() => {
    if (!filterText) return enquiries;
    const lowerFilter = filterText.toLowerCase();
    return enquiries.filter((enquiry) =>
      enquiry.branchName.toLowerCase().includes(lowerFilter) ||
      enquiry.directorName.toLowerCase().includes(lowerFilter) ||
      enquiry.email.toLowerCase().includes(lowerFilter) ||
      enquiry.phoneNumber.toLowerCase().includes(lowerFilter)
    );
  }, [enquiries, filterText]);

  // Sort the filtered data based on the sortField and sortOrder.
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else {
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
  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((field: keyof FranchiseEnquiry) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }, [sortField]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      console.log("Delete enquiry with id:", id);
      try {
        await deleteFranchiseEnquiry(id);
        // Remove from local state
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
        toast.success(`Enquiry ${id} deleted.`);
      } catch (err: any) {
        toast.error(err.message || "Failed to delete enquiry.");
      }
    },
    [] // no dependencies, function identity stable
  );

  return (
    <div className={styles.container}>
      <h2>Franchise Enquiries</h2>
      
      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.filter}>
          <input
            type="text"
            placeholder="Search enquiries..."
            value={filterText}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.entries}>
          <label htmlFor="entriesSelect">Show </label>
          <select id="entriesSelect" value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span> entries</span>
        </div>
      </div>
      
      {sortedData.length === 0 ? (
        <p className={styles.noData}>No enquiries found.</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* <th onClick={() => handleSort("id")}>
                  ID {sortField === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th> */}
                <th onClick={() => handleSort("applyingFor")}>
                  Applying For {sortField === "applyingFor" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("centerStatus")}>
                  Center Status {sortField === "centerStatus" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("branchName")}>
                  Branch Name {sortField === "branchName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("directorName")}>
                  Director Name {sortField === "directorName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("email")}>
                  Email {sortField === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("phoneNumber")}>
                  Phone {sortField === "phoneNumber" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("address")}>
                  Address {sortField === "address" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("city")}>
                  City {sortField === "city" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("state")}>
                  State {sortField === "state" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("pincode")}>
                  Pincode {sortField === "pincode" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th>Facilities</th>
                <th onClick={() => handleSort("existingFranchise")}>
                  Existing Franchise {sortField === "existingFranchise" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("additionalInfo")}>
                  Additional Info {sortField === "additionalInfo" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((enquiry) => (
                <tr key={enquiry._id}>
                  {/* <td>{enquiry.id}</td> */}
                  <td>{enquiry.applyingFor}</td>
                  <td>{enquiry.centerStatus}</td>
                  <td>{enquiry.branchName}</td>
                  <td>{enquiry.directorName}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.phoneNumber}</td>
                  <td>{enquiry.address}</td>
                  <td>{enquiry.city}</td>
                  <td>{enquiry.state}</td>
                  <td>{enquiry.pincode}</td>
                  <td>{enquiry.facilities.join(", ")}</td>
                  <td>{enquiry.existingFranchise}</td>
                  <td>{enquiry.additionalInfo || "-"}</td>
                  <td>
                    <button 
                      className={styles.actionBtn} 
                      onClick={() => handleDelete(enquiry._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
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
      )}
    </div>
  );
};

export default ViewFranchiseEnquiry;
