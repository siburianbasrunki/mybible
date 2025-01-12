import PropTypes from "prop-types";

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

export default ErrorMessage;
