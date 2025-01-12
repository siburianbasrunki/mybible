import PropTypes from "prop-types";

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

export default BookItem;
