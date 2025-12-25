import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styles from './styles/MarkEntryForm.module.css';
import { addEditStudentMarksByEnrollmentId, updateStudentMarkByEnrollmentId, deleteStudentMarkByEnrollmentId, setStudentIssueDate, } from '../../services/studentService';
import { getCourses } from '../../services/dashboardHome';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddMarksFormPopUp = ({ student, setIsMarksModalVisible, StudentMarks, onMarksUpdate, }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [marksList, setMarksList] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [manualSubject, setManualSubject] = useState(''); // For manual subject entry
    const [theoryMaxMarks, setTheoryMaxMarks] = useState(60);
    const [theoryObtainedMarks, setTheoryObtainedMarks] = useState('');
    const [practicalMaxMarks, setPracticalMaxMarks] = useState(40);
    const [practicalObtainedMarks, setPracticalObtainedMarks] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [activeTab, setActiveTab] = useState('marks');
    const [issueDate, setIssueDate] = useState('');
    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const data = await getCourses();
                // Transform API response to match component's expected format
                const transformedCourses = data.map((course) => ({
                    id: course._id || course.id,
                    course: course.course || course.name,
                    subjects: course.subjects || [],
                }));
                setCourses(transformedCourses);
            }
            catch (error) {
                console.error("Error fetching courses:", error);
                toast.error("Failed to fetch courses. Please try again.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);
    useEffect(() => {
        setMarksList(StudentMarks);
    }, [StudentMarks]);
    const selectedCourse = courses.find(course => {
        const courseId = course._id || course.id;
        return courseId === selectedCourseId;
    });
    // Check if course has subjects or needs manual entry
    const hasSubjects = selectedCourse && selectedCourse.subjects && selectedCourse.subjects.length > 0;
    const resetForm = () => {
        setSelectedSubject('');
        setManualSubject('');
        setTheoryMaxMarks(60);
        setTheoryObtainedMarks('');
        setPracticalMaxMarks(40);
        setPracticalObtainedMarks('');
    };
    // Get the subject value (from dropdown or manual entry)
    const getSubjectValue = () => {
        if (hasSubjects) {
            return selectedSubject;
        }
        return manualSubject;
    };
    const handleSaveIssueDate = async () => {
        try {
            const response = await setStudentIssueDate(student.enrollmentId, issueDate);
            alert(response.message); // or show in toast
        }
        catch (error) {
            alert(error.message);
        }
    };
    const handleAddSubject = async () => {
        if (!selectedCourseId) {
            toast.error("Please select a course.");
            return false;
        }
        const subjectValue = getSubjectValue();
        if (!subjectValue || subjectValue.trim() === '') {
            toast.error("Please select or enter a subject.");
            return false;
        }
        if (theoryMaxMarks === '' ||
            theoryObtainedMarks === '' ||
            practicalMaxMarks === '' ||
            practicalObtainedMarks === '') {
            toast.error("Please enter all marks.");
            return false;
        }
        const newSubjectMark = {
            subject: subjectValue.trim(),
            theoryMaxMarks: Number(theoryMaxMarks),
            theoryObtainedMarks: Number(theoryObtainedMarks),
            practicalMaxMarks: Number(practicalMaxMarks),
            practicalObtainedMarks: Number(practicalObtainedMarks),
        };
        if (isEditing && editingIndex !== null) {
            try {
                await updateStudentMarkByEnrollmentId(student, newSubjectMark);
                const updatedMarks = [...marksList];
                updatedMarks[editingIndex] = newSubjectMark;
                setMarksList(updatedMarks);
                onMarksUpdate(updatedMarks);
                toast.success("Mark updated successfully!");
                setIsEditing(false);
                setEditingIndex(null);
                resetForm();
                return true;
            }
            catch (error) {
                toast.error("Failed to update mark. Please try again.");
                console.error("Update error:", error);
                return false;
            }
        }
        const duplicate = marksList.some((mark) => mark.subject.toLowerCase() === subjectValue.trim().toLowerCase());
        if (duplicate) {
            toast.error("This subject already exists. Duplicate entries are not allowed.");
            return false;
        }
        try {
            await addEditStudentMarksByEnrollmentId(student.enrollmentId, [newSubjectMark]);
            const updated = [...marksList, newSubjectMark];
            setMarksList(updated);
            onMarksUpdate(updated);
            toast.success("Mark added successfully!");
            resetForm();
            return true;
        }
        catch (error) {
            toast.error("Failed to add mark. Please try again.");
            console.error("Add error:", error);
            return false;
        }
    };
    const handleEditMarks = (mark, index) => {
        setSelectedSubject(mark.subject);
        setTheoryMaxMarks(mark.theoryMaxMarks);
        setTheoryObtainedMarks(mark.theoryObtainedMarks);
        setPracticalMaxMarks(mark.practicalMaxMarks);
        setPracticalObtainedMarks(mark.practicalObtainedMarks);
        setIsEditing(true);
        setEditingIndex(index);
    };
    const handleDeleteMarks = async (mark) => {
        try {
            await deleteStudentMarkByEnrollmentId(student, mark.subject);
            const updatedMarks = marksList.filter((item) => item.subject.toLowerCase() !== mark.subject.toLowerCase());
            setMarksList(updatedMarks);
            onMarksUpdate(updatedMarks);
            toast.success("Mark deleted successfully!");
        }
        catch (error) {
            toast.error("Failed to delete mark. Please try again.");
            console.error("Delete error:", error);
        }
    };
    const handleOnSave = async () => {
        await handleAddSubject();
    };
    const handleOnCancel = () => {
        setIsMarksModalVisible(false);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'center', marginBottom: '1rem' }, children: [_jsx("button", { onClick: () => setActiveTab('marks'), style: {
                            padding: '0.5rem 1rem',
                            marginRight: '10px',
                            backgroundColor: activeTab === 'marks' ? '#007bff' : '#f0f0f0',
                            color: activeTab === 'marks' ? '#fff' : '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }, children: "Marks Entry" }), _jsx("button", { onClick: () => setActiveTab('issue'), style: {
                            padding: '0.5rem 1rem',
                            backgroundColor: activeTab === 'issue' ? '#007bff' : '#f0f0f0',
                            color: activeTab === 'issue' ? '#fff' : '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }, children: "Issue Date" })] }), activeTab === 'marks' && (_jsx(_Fragment, { children: _jsxs("div", { className: styles.marksFormContainer, children: [_jsx("h2", { className: styles.heading, children: "Add/Edit Marks" }), _jsxs("form", { className: styles.form, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Course:" }), _jsxs("select", { value: selectedCourseId, onChange: (e) => {
                                                setSelectedCourseId(e.target.value);
                                                setSelectedSubject(''); // Reset subject when course changes
                                                setManualSubject(''); // Reset manual subject
                                            }, disabled: loading, children: [_jsx("option", { value: "", children: loading ? "Loading courses..." : "Select a course" }), courses.map(course => {
                                                    const courseId = course._id || course.id;
                                                    const courseName = course.course || course.name || 'Unknown Course';
                                                    return (_jsx("option", { value: courseId, children: courseName }, courseId));
                                                })] })] }), selectedCourse && (_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Subject:" }), hasSubjects ? (_jsxs("select", { value: selectedSubject, onChange: (e) => {
                                                setSelectedSubject(e.target.value);
                                                setManualSubject(''); // Clear manual entry when selecting from dropdown
                                            }, children: [_jsx("option", { value: "", children: "Select a subject" }), selectedCourse.subjects?.map((sub, idx) => (_jsx("option", { value: sub, children: sub }, idx))) || []] })) : (_jsx("input", { type: "text", value: manualSubject, onChange: (e) => {
                                                setManualSubject(e.target.value);
                                                setSelectedSubject(''); // Clear dropdown selection when typing
                                            }, placeholder: "Enter subject name" }))] })), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Theory Max Marks:" }), _jsx("input", { type: "number", value: theoryMaxMarks, onChange: (e) => setTheoryMaxMarks(Number(e.target.value)) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Theory Obtained Marks:" }), _jsx("input", { type: "number", value: theoryObtainedMarks, onChange: (e) => setTheoryObtainedMarks(Number(e.target.value)) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Practical Max Marks:" }), _jsx("input", { type: "number", value: practicalMaxMarks, onChange: (e) => setPracticalMaxMarks(Number(e.target.value)) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Practical Obtained Marks:" }), _jsx("input", { type: "number", value: practicalObtainedMarks, onChange: (e) => setPracticalObtainedMarks(Number(e.target.value)) })] })] }), _jsxs("div", { className: styles.marksTableContainer, children: [_jsx("h3", { children: "Marks in Database" }), marksList.length === 0 ? (_jsx("p", { children: "No marks added yet." })) : (_jsxs("table", { className: styles.marksTable, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Subject" }), _jsx("th", { children: "Theory Max Marks" }), _jsx("th", { children: "Theory Obtained Marks" }), _jsx("th", { children: "Practical Max Marks" }), _jsx("th", { children: "Practical Obtained Marks" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: marksList.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: item.subject }), _jsx("td", { children: item.theoryMaxMarks }), _jsx("td", { children: item.theoryObtainedMarks }), _jsx("td", { children: item.practicalMaxMarks }), _jsx("td", { children: item.practicalObtainedMarks }), _jsxs("td", { children: [_jsx("button", { className: styles.editBtn, onClick: () => handleEditMarks(item, index), children: "Edit" }), _jsx("button", { className: styles.dltBtn, onClick: () => handleDeleteMarks(item), children: "Delete" })] })] }, index))) })] }))] }), _jsxs("div", { style: { display: "flex", gap: "10px", justifyContent: "center" }, children: [_jsx("button", { onClick: handleOnSave, style: {
                                        backgroundColor: "#007bff",
                                        color: "#fff",
                                        border: "none",
                                        padding: "8px 16px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        marginTop: "0.8rem",
                                    }, children: isEditing ? "Update & Save" : "Add & Save" }), _jsx("button", { onClick: handleOnCancel, style: {
                                        backgroundColor: "crimson",
                                        color: "#fff",
                                        border: "1px solid #ccc",
                                        padding: "8px 16px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        marginTop: "0.8rem",
                                    }, children: "Cancel" })] })] }) })), activeTab === 'issue' && (_jsxs("div", { className: styles.marksFormContainer, children: [_jsx("h2", { className: styles.heading, children: "Set Issue Date" }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Issue Date:" }), _jsx("input", { type: "date", value: issueDate, onChange: (e) => setIssueDate(e.target.value) })] }), _jsxs("div", { style: { display: "flex", gap: "10px", justifyContent: "center" }, children: [_jsx("button", { onClick: handleSaveIssueDate, style: {
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    marginTop: "0.8rem",
                                }, children: "Save Issue Date" }), _jsx("button", { onClick: handleOnCancel, style: {
                                    backgroundColor: "crimson",
                                    color: "#fff",
                                    border: "1px solid #ccc",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    marginTop: "0.8rem",
                                }, children: "Cancel" })] })] }))] }));
};
export default AddMarksFormPopUp;
