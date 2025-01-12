import PropTypes from "prop-types";

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

export default ChaptersList;
