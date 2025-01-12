import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

const fetchBibleBooks = async (bibleId) => {
  const response = await axiosInstance.get(`/bibles/${bibleId}/books`);
  return response.data;
};

const useBibleBooks = (bibleId) => {
  return useQuery({
    queryKey: ["bibleBooks", bibleId],
    queryFn: () => fetchBibleBooks(bibleId),
    enabled: !!bibleId,
  });
};

export default useBibleBooks;
