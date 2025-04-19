import React, { useState, useEffect } from "react";
import styles from "./styles/Dashboard.module.css";
import { Modal, Button, Table, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { addCourse, getCourses, updateCourse, deleteCourse } from "../../services/dashboardHome";
import { toast } from "react-toastify";

const DashboardHome: React.FC = () => {
  const role = localStorage.getItem("role") || "franchise";
  const navigate = useNavigate();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewCoursesVisible, setIsViewCoursesVisible] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const fetchCourseData = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
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

  const onFinishCourseForm = async (values: any) => {
    if (editingCourse) {
      if (courses.some(c => c.course.toLowerCase() === values.course.toLowerCase() && c.id !== editingCourse.id)) {
        toast.error("Course already exists");
        return;
      }
    } else {
      if (courses.some(c => c.course.toLowerCase() === values.course.toLowerCase())) {
        toast.error("Course already exists");
        return;
      }
    }

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, values);
      } else {
        await addCourse(values);
      }
      fetchCourseData();
      setIsAddModalVisible(false);
    } catch (error) {
      console.error("Error saving course", error);
    }
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setIsAddModalVisible(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      fetchCourseData();
    } catch (error) {
      console.error("Error deleting course", error);
    }
  };

  const columns = [
    { title: "Course Name", dataIndex: "course", key: "course" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <>
          {/* <Button className={styles.editBtn} onClick={() => handleEditCourse(record)}>Edit</Button> */}
          <Button className={styles.deleteBtn} danger onClick={() => handleDeleteCourse(record?._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.pageContent}>
        <h1 className={styles.pageTitle}>Welcome to the Dashboard</h1>
        {role === "admin" && (
          <div className={styles.card}>
            <h2>Add Course</h2>
            <div className={styles.cardBtns}>
              <Button type="primary" className={styles.addCourseBtn} onClick={handleAddCourseClick}>
                Add New Course
              </Button>
              <Button type="default" className={styles.viewCoursesBtn} onClick={handleViewCoursesClick}>
                View Courses
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Course */}
      <Modal
        title={editingCourse ? "Edit Course" : "Add Course"}
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        width={600}
        className={styles.modal}
      >
        <Form layout="vertical" initialValues={editingCourse || {}} onFinish={onFinishCourseForm}>
          <Form.Item
            label="Course Name"
            name="course"
            rules={[{ required: true, message: "Please enter course name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCourse ? "Update Course" : "Add Course"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Viewing Courses Table */}
      <Modal
        title="View Courses"
        visible={isViewCoursesVisible}
        onCancel={() => setIsViewCoursesVisible(false)}
        footer={null}
        width={800}
        className={styles.modal}
      >
        <Table dataSource={courses} columns={columns} rowKey="id" />
      </Modal>
    </div>
  );
};

export default DashboardHome;
