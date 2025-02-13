import React, { useState, useEffect } from "react";
import styles from "./styles/ViewFranchise.module.css";
import Navbar from "./Navbar";
import DashboardSidebar from "./DashboardSidebar";

export interface FranchiseData {
  firstName: string;
  lastName: string;
  dob: string;
  directorName: string;
  instituteName: string;
  address: string;
  mobile: string;
  email: string;
  aadharId: string;
}

// Sample data for demonstration
const sampleData: FranchiseData[] = [
  {
    firstName: "John",
    lastName: "Doe",
    dob: "1990-01-01",
    directorName: "Alice Smith",
    instituteName: "Institute A",
    address: "123 Main St, Cityville",
    mobile: "1234567890",
    email: "john.doe@example.com",
    aadharId: "123456789012"
  },
  {
    firstName: "Jane",
    lastName: "Roe",
    dob: "1988-05-12",
    directorName: "Bob Johnson",
    instituteName: "Institute B",
    address: "456 Elm St, Townsville",
    mobile: "0987654321",
    email: "jane.roe@example.com",
    aadharId: "987654321098"
  },
  // Add more sample items as needed...
];

const ViewFranchise: React.FC = () => {
  // Original franchise data and filtered data
  const [franchises, setFranchises] = useState<FranchiseData[]>([]);
  const [filteredData, setFilteredData] = useState<FranchiseData[]>([]);

  // For filtering, sorting, and pagination
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<keyof FranchiseData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Initialize with sample data
  useEffect(() => {
    setFranchises(sampleData);
    setFilteredData(sampleData);
  }, []);

  // Filter and sort whenever dependencies change
  useEffect(() => {
    let data = [...franchises];

    // Filtering by firstName, lastName, or email
    if (filterText) {
      data = data.filter((item) =>
        item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.email.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sorting if a sort field is selected
    if (sortField) {
      data.sort((a, b) => {
        const aField = a[sortField];
        const bField = b[sortField];
        if (aField < bField) return sortOrder === "asc" ? -1 : 1;
        if (aField > bField) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(data);
    setCurrentPage(1); // Reset to first page whenever data changes
  }, [filterText, franchises, sortField, sortOrder]);

  // Calculate pagination
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Toggle sort field and order
  const handleSort = (field: keyof FranchiseData) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handlers for action buttons (for demonstration)
  const handleEdit = (data: FranchiseData) => {
    console.log("Edit clicked for:", data);
    // Implement your edit logic here
  };

  const handleDelete = (data: FranchiseData) => {
    console.log("Delete clicked for:", data);
    // Implement your delete logic here
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <Navbar />
        <div className={styles.pageContent}>
          <h2>View Franchise</h2>
          <div className={styles.filterContainer}>
            <input
              type="text"
              placeholder="Filter by name or email..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => handleSort("firstName")}>First Name</th>
                  <th onClick={() => handleSort("lastName")}>Last Name</th>
                  <th onClick={() => handleSort("dob")}>DOB</th>
                  <th onClick={() => handleSort("directorName")}>Director Name</th>
                  <th onClick={() => handleSort("instituteName")}>Institute Name</th>
                  <th>Address</th>
                  <th onClick={() => handleSort("mobile")}>Mobile</th>
                  <th onClick={() => handleSort("email")}>Email</th>
                  <th onClick={() => handleSort("aadharId")}>Aadhar ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((franchise, index) => (
                    <tr key={index}>
                      <td>{franchise.firstName}</td>
                      <td>{franchise.lastName}</td>
                      <td>{franchise.dob}</td>
                      <td>{franchise.directorName}</td>
                      <td>{franchise.instituteName}</td>
                      <td>{franchise.address}</td>
                      <td>{franchise.mobile}</td>
                      <td>{franchise.email}</td>
                      <td>{franchise.aadharId}</td>
                      <td>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEdit(franchise)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(franchise)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10}>No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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

export default ViewFranchise;
