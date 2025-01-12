import PropTypes from "prop-types";

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

export default VerseContent;
