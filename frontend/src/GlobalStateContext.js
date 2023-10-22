import axios from "axios";
import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import { API } from "./API";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialUser() {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/user`, {
          withCredentials: true,
        });
        const userDataFromApi = response.data;
        setUserData(userDataFromApi);
      } catch (err) {
        console.error("Error loading initial user:", err);
        toast.warning(`Msg: Login to get full Access`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setLoading(false);
      }
    }

    // Fetch initial user data on component mount
    loadInitialUser();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <GlobalStateContext.Provider value={{ userData, setUserData }}>
          {children}
        </GlobalStateContext.Provider>
      )}
    </Fragment>
  );
};
