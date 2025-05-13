import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles/ViewFranchise.module.css";
import { fetchFranchiseData, FranchiseData, deleteFranchiseData } from "../../services/viewFranchise";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewFranchise: React.FC = () => {
  const [franchises, setFranchises] = useState<FranchiseData[]>([]);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<keyof FranchiseData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchFranchiseData();
      setFranchises(data);
    };
    getData();
  }, []);

  const convertBufferToBase64 = (buffer: Uint8Array) => {
    if (!buffer || buffer.length === 0) return "";
    return btoa(String.fromCharCode(...buffer));
  };

  const renderDirectorImage = (image: FranchiseData["image"], alt: string) => {
    if (!image?.data) return "No Image";

    let base64Image = "";

    if (typeof image.data === "string") {
      base64Image = image.data;
    } else if (image.data instanceof ArrayBuffer) {
      base64Image = convertBufferToBase64(new Uint8Array(image.data));
    } else if (image.data instanceof Uint8Array) {
      base64Image = convertBufferToBase64(image.data);
    } else if (
      typeof image.data === "object" &&
      (image.data as any).type === "Buffer" &&
      Array.isArray((image.data as any).data)
    ) {
      const bufferData = new Uint8Array((image.data as any).data);
      base64Image = convertBufferToBase64(bufferData);
    } else {
      return "Invalid image";
    }

    return (
      <img
        src={`data:${image.contentType};base64,${base64Image}`}
        alt={alt}
        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
      />
    );
  };

  const filteredData = useMemo(() => {
    let data = [...franchises];
    if (filterText) {
      const lowerFilter = filterText.toLowerCase();
      data = data.filter(
        (item) =>
          item.firstName.toLowerCase().includes(lowerFilter) ||
          item.lastName.toLowerCase().includes(lowerFilter) ||
          item.email.toLowerCase().includes(lowerFilter)
      );
    }
    if (sortField) {
      data.sort((a, b) => {
        const aField = a[sortField];
        const bField = b[sortField];
        if ((aField ?? "") < (bField ?? "")) return sortOrder === "asc" ? -1 : 1;
        if ((aField ?? "") > (bField ?? "")) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [franchises, filterText, sortField, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterText, sortField, sortOrder]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / pageSize),
    [filteredData, pageSize]
  );
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentItems = useMemo(
    () => filteredData.slice(indexOfFirst, indexOfLast),
    [filteredData, indexOfFirst, indexOfLast]
  );

  const handleSort = useCallback(
    (field: keyof FranchiseData) => {
      if (sortField === field) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    },
    [sortField]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setCurrentPage(1);
    },
    []
  );

  const navigate = useNavigate();

  const handleEdit = useCallback((data: FranchiseData) => {
    console.log("Edit clicked for:", data);
    navigate(`/dashboard/franchise/add/${data._id}`);
  }, [navigate]);

  const handleDelete = useCallback(async (data: FranchiseData) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete franchise for ${data.firstName} ${data.lastName}?`);
    if (confirmDelete) {
      try {
        await deleteFranchiseData(data._id);
        const refreshedData = await fetchFranchiseData();
        setFranchises(refreshedData);
        toast.success("Franchise deleted successfully!");
      } catch (error) {
        console.error("Error deleting franchise:", error);
        toast.error("Failed to delete. Please try again.");
      }
    }
  }, []);

  return (
    <div>
      <div className={styles.mainContent}>
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

          <div className={styles.entries}>
            <label htmlFor="entriesSelect">Show </label>
            <select
              id="entriesSelect"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span> entries</span>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {/* <th>Image</th> */}
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
                      {/* <td>{renderDirectorImage(franchise.image, franchise.directorName)}</td> */}
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
                    <td colSpan={11}>No records found</td>
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
