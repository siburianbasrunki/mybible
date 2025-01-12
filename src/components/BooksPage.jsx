import { useState } from "react";
import { useParams } from "react-router-dom";
import useBibleBooks from "../hooks/useBibleBook";
import { useBibleChapters, useBibleVerses } from "../hooks/useBibleDetails";
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";
import BookItem from "./BookItem";
import ChaptersList from "./ChaptersList";
import VerseContent from "./VerseContent";

const BooksPage = () => {
  const { bibleId } = useParams();
  const { data, error, isLoading } = useBibleBooks(bibleId);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const {
    data: chapters,
    error: chaptersError,
    isLoading: chaptersLoading,
  } = useBibleChapters(bibleId, selectedBookId);

  const {
    data: verseContent,
    error: verseError,
    isLoading: verseLoading,
  } = useBibleVerses(bibleId, selectedBookId, selectedChapterId);

  if (isLoading) return <LoadingMessage message="Loading books..." />;
  if (error)
    return <ErrorMessage message={error.message || "Terjadi kesalahan."} />;

  return (
    <div className="mt-10 w-full">
      <div className="flex flex-col md:flex-row h-screen bg-gray-50 w-full">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden fixed top-4 right-4 z-50 bg-green-500 text-white p-2 rounded-lg"
        >
          {showSidebar ? "✕" : "☰"}
        </button>

        <div
          className={`fixed md:static inset-0 bg-white z-40 w-full md:w-80 transform transition-transform duration-300 ease-in-out ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 overflow-y-auto`}
        >
          <div className="p-4 space-y-4">
            {data.data.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                isSelected={book.id === selectedBookId}
                onClick={() => {
                  setSelectedBookId(book.id);
                  setSelectedChapterId(null);
                  setShowSidebar(false);
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 md:h-screen overflow-y-auto">
          <div className="p-4 max-w-4xl mx-auto">
            <ChaptersList
              chapters={chapters?.data}
              isLoading={chaptersLoading}
              error={chaptersError}
              onChapterClick={setSelectedChapterId}
              selectedChapterId={selectedChapterId}
            />

            {verseLoading && (
              <div className="animate-pulse text-center p-4">
                Loading verses...
              </div>
            )}
            {verseError && (
              <div className="text-red-600 text-center p-4">
                Error: {verseError.message}
              </div>
            )}
            {verseContent && (
              <VerseContent content={verseContent.data.content} />
            )}
          </div>
        </div>

        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BooksPage;
