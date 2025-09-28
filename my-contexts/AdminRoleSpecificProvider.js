import { DataProvider } from "@plasmicapp/loader-nextjs";

export function AdminRoleSpecificProvider({
  children,
  className,
  allCoursesData,
  allStudentsData,
  allInstructorsData,
  adminCoursesData
}) {
  return (
    <div className={className}>
      <DataProvider name="globalCoursesData" data={allCoursesData}>
        <DataProvider name="globalStudentsData" data={allStudentsData}>
          <DataProvider name="globalInstructorsData" data={allInstructorsData}>
            <DataProvider name="adminCourses" data={adminCoursesData}>
              {children}
            </DataProvider>
          </DataProvider>
        </DataProvider>
      </DataProvider>
    </div>
  );
}
