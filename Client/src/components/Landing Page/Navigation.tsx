import React, { useState } from 'react';
import Button from './Button';
import PDFReader from './PDFReader';
import course from '../../assets/Chess Course.pdf';

const Navigation: React.FC = () => {
  const [showCourses, setShowCourses] = useState(false);

  return (
    <div>
      {!showCourses ? (
        <nav className="flex items-center justify-between p-4">
          <div className="flex items-center gap-8">
            <a href="#" className="text-white/90 hover:text-white text-sm">Home</a>
            <a href="#" className="text-white/90 hover:text-white text-sm">About us</a>
            <a 
              href="#" 
              className="text-white/90 hover:text-white text-sm"
              onClick={() => setShowCourses(true)}
            >
              Courses
            </a>
            <a href="#" className="text-white/90 hover:text-white text-sm">Support</a>
          </div>
          <Button variant="ghost">Log in</Button>
        </nav>
      ) : (
        <PDFReader pdfUrl={course} />
      )}
    </div>
  );
};

export default Navigation;
