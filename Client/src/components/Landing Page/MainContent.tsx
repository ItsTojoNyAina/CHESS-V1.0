import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router';

const MainContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8">
      <h1 className="text-red-500 text-6xl font-bold leading-tight mb-12">
        Enjoy fair play<br />
        without cheating
      </h1>
      <ul className="space-y-3 text-white/90 mb-12">
        <li className="flex items-center gap-2">
          <span className="text-sm">• Online access</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-sm">• Social integration</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-sm">• Varied difficulty levels</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-sm">• Regular updates</span>
        </li>
      </ul>
      <Button className="px-8 py-6" onClick={() => navigate('/game')}>
        PLAY NOW
      </Button>
    </div>
  );
};

export default MainContent;
