import { DataProvider } from "@plasmicapp/loader-nextjs";

function InstructorRoleSpecificProvider({
  children,
  className,
  allEnrolledStudentsData,
  allCoursesData,
}) {
  return (
    <div className={className}>
      <DataProvider name="allEnrolledStudents" data={allEnrolledStudentsData}>
        <DataProvider name="allCourses" data={allCoursesData}>
          {children}
        </DataProvider>
      </DataProvider>
    </div>
  );
}

export default InstructorRoleSpecificProvider;
