import { APP_CONSTANTS } from "@/constants";
import { DataProvider } from "@plasmicapp/loader-nextjs";
import { useState, useCallback, useEffect } from "react";

function SimpleGlobalProvider({ children, className, constants, userData: initialUserData }) {
  const [userData, setUserData] = useState(initialUserData); // fallback to {}

  // i don't really need to update user again because i can refresh the queries
  useEffect(() => {
    if (initialUserData !== undefined) {
      setUserData(initialUserData);
    }
  }, [initialUserData]);

  // updating global state provider, initialUserData is only used for initial state and matter too
  const updateUser = useCallback((updates) => {
    setUserData(updates);
  }, []);

  return (
    <div className={className}>
      <DataProvider name="globalUserData" data={userData}>
        <DataProvider name="setGlobalUserData" data={updateUser}>
          <DataProvider name="globalConstants" data={constants}>
            {children}
          </DataProvider>
        </DataProvider>
      </DataProvider>
    </div>
  );
}

export default SimpleGlobalProvider;