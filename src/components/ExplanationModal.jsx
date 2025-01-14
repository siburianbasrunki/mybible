import PropTypes from "prop-types";
import Modal from "./modal";

const ExplanationModal = ({
  isOpen,
  onClose,
  loading,
  explanation,
  error,
  selectedVerse,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Penjelasan Ayat">
      {/* Selected Verse */}
      {selectedVerse && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-600">Ayat yang dipilih:</p>
          <p className="mt-2 text-gray-800">{selectedVerse}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent" />
          <span className="ml-3 text-gray-600">Memuat penjelasan...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Terjadi kesalahan: {error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Explanation Content */}
      {explanation && !loading && !error && (
        <div className="prose max-w-none">
          <div className="text-gray-600 whitespace-pre-wrap">{explanation}</div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </Modal>
  );
};

ExplanationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  explanation: PropTypes.string,
  error: PropTypes.string,
  selectedVerse: PropTypes.string,
};

export default ExplanationModal;
