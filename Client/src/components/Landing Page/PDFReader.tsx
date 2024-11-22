import React from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Configure le worker avec la version correspondante
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const PDFReader: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div style={{ height: '100vh' }}>
      <Viewer
        fileUrl={pdfUrl}
        plugins={[defaultLayoutPluginInstance]}
      />
    </div>
  );
};

export default PDFReader;
