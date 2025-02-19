// components/ViewContactEnquiry.tsx
import React, { useState, useEffect, useMemo } from "react";
import styles from "./styles/ViewEnquiry.module.css";
import { toast } from "react-toastify";
import { fetchContactEnquiries, ContactEnquiry } from "../../services/contactForm";

const ViewContactEnquiry: React.FC = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);

  useEffect(() => {
    const getEnquiries = async () => {
      try {
        const data = await fetchContactEnquiries();
        setEnquiries(data);
      } catch (error) {
        toast.error("Error fetching contact enquiries.");
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
      <h2>Contact Enquiries</h2>
      {displayedEnquiries.length === 0 ? (
        <p className={styles.noData}>No contact enquiries found.</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedEnquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.id}</td>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.message}</td>
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

export default ViewContactEnquiry;
