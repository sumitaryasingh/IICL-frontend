import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "./styles/Dashboard.module.css";
import { Modal, Button, Table, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { addCourse, getCourses, updateCourse, deleteCourse } from "../../services/dashboardHome";
import { toast } from "react-toastify";
const DashboardHome = () => {
    const role = localStorage.getItem("role") || "franchise";
    const navigate = useNavigate();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isViewCoursesVisible, setIsViewCoursesVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const fetchCourseData = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        }
        catch (error) {
            console.error("Error fetching courses", error);
        }
    };
    useEffect(() => {
        fetchCourseData();
    }, []);
    const handleAddCourseClick = () => {
        setEditingCourse(null);
        setIsAddModalVisible(true);
    };
    const handleViewCoursesClick = () => {
        fetchCourseData();
        setIsViewCoursesVisible(true);
    };
    const onFinishCourseForm = async (values) => {
        if (editingCourse) {
            if (courses.some(c => c.course.toLowerCase() === values.course.toLowerCase() && c.id !== editingCourse.id)) {
                toast.error("Course already exists");
                return;
            }
        }
        else {
            if (courses.some(c => c.course.toLowerCase() === values.course.toLowerCase())) {
                toast.error("Course already exists");
                return;
            }
        }
        try {
            if (editingCourse) {
                await updateCourse(editingCourse.id, values);
            }
            else {
                await addCourse(values);
            }
            fetchCourseData();
            setIsAddModalVisible(false);
        }
        catch (error) {
            console.error("Error saving course", error);
        }
    };
    const handleEditCourse = (course) => {
        setEditingCourse(course);
        setIsAddModalVisible(true);
    };
    const handleDeleteCourse = async (courseId) => {
        try {
            await deleteCourse(courseId);
            fetchCourseData();
        }
        catch (error) {
            console.error("Error deleting course", error);
        }
    };
    const columns = [
        { title: "Course Name", dataIndex: "course", key: "course" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (_jsx(_Fragment, { children: _jsx(Button, { className: styles.deleteBtn, danger: true, onClick: () => handleDeleteCourse(record?._id), children: "Delete" }) })),
        },
    ];
    return (_jsxs("div", { className: styles.dashboardContainer, children: [_jsxs("div", { className: styles.pageContent, children: [_jsx("h1", { className: styles.pageTitle, children: "Welcome to the Dashboard" }), role === "admin" && (_jsxs("div", { className: styles.card, children: [_jsx("h2", { children: "Add Course" }), _jsxs("div", { className: styles.cardBtns, children: [_jsx(Button, { type: "primary", className: styles.addCourseBtn, onClick: handleAddCourseClick, children: "Add New Course" }), _jsx(Button, { type: "default", className: styles.viewCoursesBtn, onClick: handleViewCoursesClick, children: "View Courses" })] })] }))] }), _jsx(Modal, { title: editingCourse ? "Edit Course" : "Add Course", visible: isAddModalVisible, onCancel: () => setIsAddModalVisible(false), footer: null, width: 600, className: styles.modal, children: _jsxs(Form, { layout: "vertical", initialValues: editingCourse || {}, onFinish: onFinishCourseForm, children: [_jsx(Form.Item, { label: "Course Name", name: "course", rules: [{ required: true, message: "Please enter course name" }], children: _jsx(Input, {}) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", children: editingCourse ? "Update Course" : "Add Course" }) })] }) }), _jsx(Modal, { title: "View Courses", visible: isViewCoursesVisible, onCancel: () => setIsViewCoursesVisible(false), footer: null, width: 800, className: styles.modal, children: _jsx(Table, { dataSource: courses, columns: columns, rowKey: "id" }) })] }));
};
export default DashboardHome;
