export interface Course {
    id?: string;
    name: string;
}
export declare const addCourse: (course: Course) => Promise<Course>;
export declare const getCourses: () => Promise<Course[]>;
export declare const updateCourse: (courseId: string, course: Course) => Promise<Course>;
export declare const deleteCourse: (courseId: string) => Promise<{
    message: string;
}>;
