import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3001", // Adjust base URL as needed
    // baseURL: 'https://job-task1-server-6yyr.vercel.app', // Adjust base URL as needed
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Add 'Bearer' prefix
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default useAxiosPublic;
