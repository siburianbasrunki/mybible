import { useState } from "react";
import { useParams } from "react-router-dom";
import useBibleBooks from "../hooks/useBibleBook";
import { useBibleChapters, useBibleVerses } from "../hooks/useBibleDetails";
import PropTypes from "prop-types";

const LoadingMessage = ({ message }) => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-pulse text-lg text-gray-600">{message}</div>
  </div>
);

LoadingMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const ErrorMessage = ({ message }) => (
  <div className="flex items-center justify-center p-4">
    <div className="text-red-600 bg-red-50 p-4 rounded-lg shadow">
      Error: {message}
    </div>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const BookItem = ({ book, onClick, isSelected }) => (
  <div
    onClick={onClick}
    className={`bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border ${
      isSelected ? "border-green-500" : "border-gray-200"
    }`}
  >
    <h2 className="text-lg font-bold text-gray-800 mb-2">
      {book.name || "Tidak ada judul"}
    </h2>
    <p className="text-gray-600 text-sm">
      {book.nameLong || "Tidak ada deskripsi untuk buku ini."}
    </p>
  </div>
);

BookItem.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string,
    nameLong: PropTypes.string,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

const ChaptersList = ({
  chapters,
  isLoading,
  error,
  onChapterClick,
  selectedChapterId,
}) => {
  if (isLoading)
    return <div className="animate-pulse">Loading chapters...</div>;
  if (error) return <div className="text-red-600">Error: {error.message}</div>;

  return (
    <div className="mb-6 min-h-[200px] flex flex-col justify-center">
      {Array.isArray(chapters) ? (
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-10 md:grid-cols-12">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onChapterClick(chapter.id)}
              className={`p-2 rounded-md text-center transition-colors duration-200 ${
                selectedChapterId === chapter.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 hover:bg-green-100 text-gray-700"
              }`}
            >
              {chapter.number}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-600 text-lg bg-gray-50 rounded-lg px-6 py-4">
            Pilih buku terlebih dahulu
          </div>
        </div>
      )}
    </div>
  );
};

ChaptersList.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  onChapterClick: PropTypes.func.isRequired,
  selectedChapterId: PropTypes.string,
};

const VerseContent = ({ content }) => {
  if (!content) return null;

  const processContent = (htmlContent) => {
    return htmlContent.replace(
      /<span data-number="([^"]*)" data-sid="([^"]*)" class="v">([^<]*)<\/span>/g,
      '</p><p class="p"><span class="v">$3</span>'
    );
  };

  return (
    <div className="prose max-w-none">
      <div
        dangerouslySetInnerHTML={{ __html: processContent(content) }}
        className="space-y-2 text-gray-800"
      />
      <style>{`
        .prose p {
          margin-bottom: 0.5rem;
          line-height: 1.8;
          font-size: 1rem;
        }

        .prose .s {
          color: #15803d;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem;
          text-align: center;
        }

        .prose .qr {
          color: #15803d;
          font-size: 1.125rem;
          font-weight: 500;
          margin: 1rem 0 0.5rem;
        }

        .prose .v {
          color: #166534;
          font-weight: 600;
          font-size: 0.875rem;
          vertical-align: super;
          margin-right: 0.25rem;
        }

        .prose .p {
          text-align: justify;
          padding: 0.25rem 0;
          margin: 0;
        }

        .prose .q1 {
          margin-left: 1.5rem;
          font-style: italic;
        }

        .prose .q2 {
          margin-left: 3rem;
          font-style: italic;
        }

        .prose .m {
          margin: 0.5rem 0;
        }

        .prose .b {
          height: 0.5rem;
        }

        @media (max-width: 640px) {
          .prose p {
            font-size: 0.95rem;
            line-height: 1.6;
          }
        }
      `}</style>
    </div>
  );
};

VerseContent.propTypes = {
  content: PropTypes.string,
};

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
