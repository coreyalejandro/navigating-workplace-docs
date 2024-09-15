import React from 'react';

interface DocumentViewerProps {
  content: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ content }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md max-h-[60vh] overflow-y-auto">
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default DocumentViewer;