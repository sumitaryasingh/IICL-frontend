import React, { useState, useEffect, useMemo } from "react";
import styles from "./styles/ViewEnquiry.module.css";
import { toast } from "react-toastify";
import { fetchContactEnquiries, ContactEnquiry, deleteContactEnquiry } from "../../services/contactForm";

const ViewContactEnquiry: React.FC = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [entriesPerPage] = useState<number>(10); // Define number of entries per page

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
  const displayedEnquiries = useMemo(() => {
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    return enquiries.slice(indexOfFirstEntry, indexOfLastEntry); // Get the correct page of enquiries
  }, [currentPage, enquiries]);

  // Calculate total pages
  const totalPages = Math.ceil(enquiries.length / entriesPerPage);

  // Handler for deleting an enquiry
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      await deleteContactEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      toast.success("Enquiry deleted successfully.");
    } catch (error) {
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedEnquiries.map((enquiry) => (
                <tr key={enquiry._id}>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.message}</td>
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
        </div>
      )}

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <span>{`Showing ${displayedEnquiries.length} of ${enquiries.length} entries`}</span>
        <div>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={styles.pageBtn}
          >
            Prev
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={styles.pageBtn}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewContactEnquiry;
