import axios from "axios";
import { useEffect, useState, useContext } from "react";

import { auth } from "../context/AuthContext";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const {
    state: { user },
  } = useContext(auth);

  //console.log("user", user.token);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(url, {
          headers: { Authorization: "Bearer " + user.token },
        });
        setData(result.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url, user.token]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const result = await axios.get(url);
      setData(result.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { loading, data, error, reFetch };
};

export default useFetch;
