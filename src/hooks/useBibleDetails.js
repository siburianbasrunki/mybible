// hooks/useBibleDetails.js
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

const fetchBibleChapters = async (bibleId, id) => {
  try {
    if (!bibleId || !id) return null;
    const response = await axiosInstance.get(
      `/bibles/${bibleId}/books/${id}/chapters`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
};

export const useBibleChapters = (bibleId, id) => {
  return useQuery({
    queryKey: ["bibleChapters", bibleId, id],
    queryFn: () => fetchBibleChapters(bibleId, id),
    enabled: !!bibleId && !!id,
  });
};

const fetchBibleSections = async (bibleId, id) => {
  try {
    if (!bibleId || !id) return null;
    const response = await axiosInstance.get(
      `/bibles/${bibleId}/books/${id}/sections`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};

export const useBibleSections = (bibleId, id) => {
  return useQuery({
    queryKey: ["bibleSections", bibleId, id],
    queryFn: () => fetchBibleSections(bibleId, id),
    enabled: !!bibleId && !!id,
  });
};

const fetchVerses = async (bibleId, bookId, chapterId) => {
  try {
    if (!bibleId || !bookId || !chapterId) return null;
    const response = await axiosInstance.get(
      `/bibles/${bibleId}/chapters/${chapterId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching verses:", error);
    throw error;
  }
};

export const useBibleVerses = (bibleId, bookId, chapterId) => {
  return useQuery({
    queryKey: ["verses", bibleId, bookId, chapterId],
    queryFn: () => fetchVerses(bibleId, bookId, chapterId),
    enabled: !!bibleId && !!bookId && !!chapterId,
  });
};
