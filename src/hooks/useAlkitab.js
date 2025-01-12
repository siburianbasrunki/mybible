import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

const fetchBibleData = async ({ queryKey }) => {
  const [endpoint, params] = queryKey;
  const response = await axiosInstance.get(endpoint, { params });
  return response.data;
};

const useBibleApi = (endpoint, params = {}) => {
  return useQuery({
    queryKey: [endpoint, params],
    queryFn: fetchBibleData,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useBibleApi;
