import PropTypes from "prop-types";

const LoadingMessage = ({ message }) => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-pulse text-lg text-gray-600">{message}</div>
  </div>
);

LoadingMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoadingMessage;
