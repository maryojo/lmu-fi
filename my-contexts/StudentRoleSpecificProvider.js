import { DataProvider } from "@plasmicapp/loader-nextjs";

function StudentRoleSpecificProvider({
  children,
  className,
  allAvailableCoursesData,
  allUserEnrolledCoursesData,
  allCoursesProgressData
}) {
  return (
    <div className={className}>
      <DataProvider name="allAvailableCourses" data={allAvailableCoursesData}>
        <DataProvider name="allUserEnrolledCourses" data={allUserEnrolledCoursesData}>
          <DataProvider name="allCoursesProgress" data={allCoursesProgressData}>
            {children}
          </DataProvider>
        </DataProvider>
      </DataProvider>
    </div>
  );
}

export default StudentRoleSpecificProvider;
