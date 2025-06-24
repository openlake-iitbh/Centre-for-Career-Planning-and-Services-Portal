import { useState } from "react";
import toast from "react-hot-toast";

const useGetAlumniByType = () => {
  const [loading, setLoading] = useState(false);

  const getAlumni = async (type, search) => {
    if (!search?.trim()) {
      toast.error("Please enter a value to search");
      return [];
    }

    setLoading(true);
    let url = "";

    switch (type) {
      case "jobId":
        url = `http://localhost:3000/api/alumni/search-by-id?jobId=${search}`;
        break;
      case "jobRole":
        url = `http://localhost:3000/api/alumni/search-by-role?jobRole=${search}`;
        break;
      case "company":
        url = `http://localhost:3000/api/alumni/search-by-company?company=${search}`;
        break;
      default:
        toast.error("Invalid search type");
        return [];
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok || data.message) throw new Error(data.message || "Something went wrong");
      return data;
    } catch (error) {
      toast.error(error.message || "Error fetching alumni");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, getAlumni };
};

export default useGetAlumniByType;
