// components/ViewFranchiseEnquiry.tsx
import React, { useState, useEffect, useMemo } from "react";
import styles from "./styles/ViewEnquiry.module.css";
import { toast } from "react-toastify";
import { fetchFranchiseEnquiries, FranchiseEnquiry } from "../../services/franchiseEnquiry";

const ViewFranchiseEnquiry: React.FC = () => {
  const [enquiries, setEnquiries] = useState<FranchiseEnquiry[]>([]);

  useEffect(() => {
    const getEnquiries = async () => {
      try {
        const data = await fetchFranchiseEnquiries();
        setEnquiries(data);
      } catch (error) {
        toast.error("Error fetching enquiries.");
      }
    };
    getEnquiries();
  }, []);

  // Memoize the enquiries list to avoid unnecessary recalculations.
  const displayedEnquiries = useMemo(() => enquiries, [enquiries]);

  // Handler for editing an enquiry
  const handleEdit = (id: number) => {
    console.log("Edit enquiry with id:", id);
    // Implement your edit logic here (e.g., open an edit modal or navigate to an edit page)
  };

  // Handler for deleting an enquiry
  const handleDelete = (id: number) => {
    console.log("Delete enquiry with id:", id);
    // Implement your delete logic here (e.g., call an API to delete the enquiry)
  };

  return (
    <div className={styles.container}>
      <h2>Franchise Enquiries</h2>
      {displayedEnquiries.length === 0 ? (
        <p className={styles.noData}>No enquiries found.</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Applying For</th>
                <th>Center Status</th>
                <th>Branch Name</th>
                <th>Director Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Facilities</th>
                <th>Existing Franchise</th>
                <th>Additional Info</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedEnquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.id}</td>
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
                      onClick={() => handleEdit(enquiry.id)}
                    >
                      Edit
                    </button>
                    <button 
                      className={styles.actionBtn} 
                      onClick={() => handleDelete(enquiry.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewFranchiseEnquiry;
