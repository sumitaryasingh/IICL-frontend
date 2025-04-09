import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './styles/MarkEntryForm.module.css';
import { addEditStudentMarksByEnrollmentId, updateStudentMarkByEnrollmentId, deleteStudentMarkByEnrollmentId } from '../../services/studentService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const courses = [
    {
        id: "1",
        course: "ADCA",
        subjects: [
            "Fundamentals",
            "MS Excel",
            "MS Word",
            "MS PowerPoint",
            "Tally",
            "Pagemaker",
            "MS Access",
            "MS Outlook & Internet"
        ],
    },
    {
        id: "2",
        course: "DCA",
        subjects: ["Fundamentals", "MS Excel", "MS Word", "MS PowerPoint", "Tally"],
    },
];
const AddMarksFormPopUp = ({ student, setIsMarksModalVisible, StudentMarks, onMarksUpdate, }) => {
    // Form fields state
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [theoryMaxMarks, setTheoryMaxMarks] = useState(60);
    const [theoryObtainedMarks, setTheoryObtainedMarks] = useState('');
    const [practicalMaxMarks, setPracticalMaxMarks] = useState(40);
    const [practicalObtainedMarks, setPracticalObtainedMarks] = useState('');
    // Editing state variables
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const selectedCourse = courses.find(course => course.id === selectedCourseId);
    // Reset form fields
    const resetForm = () => {
        setSelectedSubject('');
        setTheoryMaxMarks('');
        setTheoryObtainedMarks('');
        setPracticalMaxMarks('');
        setPracticalObtainedMarks('');
    };
    // Handle form submission for adding or updating a mark
    const handleAddSubject = async (e) => {
        e.preventDefault();
        // Validation
        if (!selectedCourseId) {
            toast.error("Please select a course.");
            return;
        }
        if (!selectedSubject) {
            toast.error("Please select a subject.");
            return;
        }
        if (theoryMaxMarks === '' || theoryObtainedMarks === '' || practicalMaxMarks === '' || practicalObtainedMarks === '') {
            toast.error("Please enter all marks.");
            return;
        }
        // If in editing mode, update the mark in the database
        if (isEditing && editingIndex !== null) {
            const updatedMark = {
                subject: selectedSubject,
                theoryMaxMarks: Number(theoryMaxMarks),
                theoryObtainedMarks: Number(theoryObtainedMarks),
                practicalMaxMarks: Number(practicalMaxMarks),
                practicalObtainedMarks: Number(practicalObtainedMarks),
            };
            try {
                await updateStudentMarkByEnrollmentId(student, updatedMark);
                const updatedMarks = [...StudentMarks];
                updatedMarks[editingIndex] = updatedMark;
                onMarksUpdate(updatedMarks);
                toast.success("Mark updated successfully!");
            }
            catch (error) {
                toast.error("Failed to update mark. Please try again.");
                console.error("Update error:", error);
            }
            setIsEditing(false);
            setEditingIndex(null);
            resetForm();
            return;
        }
        // For adding new mark, check if subject already exists (case-insensitive)
        const duplicate = StudentMarks.some((mark) => mark.subject.toLowerCase() === selectedSubject.toLowerCase());
        if (duplicate) {
            toast.error("This subject already exists in the database. Duplicate entries are not allowed.");
            return;
        }
        const newSubjectMark = {
            subject: selectedSubject,
            theoryMaxMarks: Number(theoryMaxMarks),
            theoryObtainedMarks: Number(theoryObtainedMarks),
            practicalMaxMarks: Number(practicalMaxMarks),
            practicalObtainedMarks: Number(practicalObtainedMarks),
        };
        try {
            await addEditStudentMarksByEnrollmentId(student.enrollmentId, [newSubjectMark]);
            onMarksUpdate([...StudentMarks, newSubjectMark]);
            toast.success("Mark added successfully!");
            resetForm();
        }
        catch (error) {
            toast.error("Failed to add mark. Please try again.");
            console.error("Add error:", error);
        }
    };
    // Edit function: pre-fill form with the mark's data and set edit mode
    const handleEditMarks = (mark, index) => {
        setSelectedSubject(mark.subject);
        setTheoryMaxMarks(mark.theoryMaxMarks);
        setTheoryObtainedMarks(mark.theoryObtainedMarks);
        setPracticalMaxMarks(mark.practicalMaxMarks);
        setPracticalObtainedMarks(mark.practicalObtainedMarks);
        setIsEditing(true);
        setEditingIndex(index);
    };
    // Delete function: remove the mark from the database and update parent's state
    const handleDeleteMarks = async (mark) => {
        try {
            await deleteStudentMarkByEnrollmentId(student, mark.subject);
            const updatedMarks = StudentMarks.filter((item) => item.subject.toLowerCase() !== mark.subject.toLowerCase());
            onMarksUpdate(updatedMarks);
            toast.success("Mark deleted successfully!");
        }
        catch (error) {
            toast.error("Failed to delete mark. Please try again.");
            console.error("Delete error:", error);
        }
    };
    const handleOnSave = async () => {
        // Since all changes are directly updated in the DB, just close the modal.
        setIsMarksModalVisible(false);
    };
    const handleOnCancel = () => {
        setIsMarksModalVisible(false);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.marksFormContainer, children: [_jsx("h2", { className: styles.heading, children: "Add/Edit Marks" }), _jsxs("form", { onSubmit: handleAddSubject, className: styles.form, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Course:" }), _jsxs("select", { value: selectedCourseId, onChange: (e) => setSelectedCourseId(e.target.value), children: [_jsx("option", { value: "", children: "Select a course" }), courses.map(course => (_jsx("option", { value: course.id, children: course.course }, course.id)))] })] }), selectedCourse && (_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Subject:" }), _jsxs("select", { value: selectedSubject, onChange: (e) => setSelectedSubject(e.target.value), children: [_jsx("option", { value: "", children: "Select a subject" }), selectedCourse.subjects.map((sub, idx) => (_jsx("option", { value: sub, children: sub }, idx)))] })] })), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Theory Max Marks:" }), _jsx("input", { type: "number", value: theoryMaxMarks, onChange: (e) => setTheoryMaxMarks(Number(e.target.value)) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Theory Obtained Marks:" }), _jsx("input", { type: "number", value: theoryObtainedMarks, onChange: (e) => setTheoryObtainedMarks(Number(e.target.value)) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Practical Max Marks:" }), _jsx("input", { type: "number", value: practicalMaxMarks, onChange: (e) => setPracticalMaxMarks(Number(e.target.value)) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Practical Obtained Marks:" }), _jsx("input", { type: "number", value: practicalObtainedMarks, onChange: (e) => setPracticalObtainedMarks(Number(e.target.value)) })] }), _jsx("button", { type: "submit", className: styles.submitButton, children: isEditing ? "Update Mark" : "Add Mark" })] }), _jsxs("div", { className: styles.marksTableContainer, children: [_jsx("h3", { children: "Marks in Database" }), StudentMarks.length === 0 ? (_jsx("p", { children: "No marks added yet." })) : (_jsxs("table", { className: styles.marksTable, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Subject" }), _jsx("th", { children: "Theory Max Marks" }), _jsx("th", { children: "Theory Obtained Marks" }), _jsx("th", { children: "Practical Max Marks" }), _jsx("th", { children: "Practical Obtained Marks" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: StudentMarks.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: item.subject }), _jsx("td", { children: item.theoryMaxMarks }), _jsx("td", { children: item.theoryObtainedMarks }), _jsx("td", { children: item.practicalMaxMarks }), _jsx("td", { children: item.practicalObtainedMarks }), _jsxs("td", { children: [_jsx("button", { className: styles.editBtn, onClick: () => handleEditMarks(item, index), children: "Edit" }), _jsx("button", { className: styles.dltBtn, onClick: () => handleDeleteMarks(item), children: "Delete" })] })] }, index))) })] }))] })] }), _jsxs("div", { style: { display: "flex", gap: "10px", justifyContent: "center" }, children: [_jsx("button", { onClick: handleOnSave, style: {
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }, children: "Save" }), _jsx("button", { onClick: handleOnCancel, style: {
                            backgroundColor: "#f8f9fa",
                            color: "#333",
                            border: "1px solid #ccc",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }, children: "Cancel" })] })] }));
};
export default AddMarksFormPopUp;
