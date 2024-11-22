import React from 'react';
import { SiInstagram, SiFacebook, SiYoutube } from 'react-icons/si';
import Button from './Button';
import Logo from '../../assets/Logo.png'

const Sidebar: React.FC = () => (
  <div className="w-72 bg-white p-8">
    <div className="mb-12">
      <img 
        src={Logo}
        width={40} 
        height={40} 
        alt="Chess knight logo" 
        className="opacity-90 w-40 "
      />
    </div>
    <div>
      <h2 className="font-semibold text-xl mb-4">About us</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-8">
        Our platform combines educational content with engaging gameplay, making learning both easy and enjoyable through an immersive gaming experience.
      </p>
      <div className="flex gap-4 mb-8">
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <SiInstagram className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <SiFacebook className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <SiYoutube className="w-5 h-5" />
        </a>
      </div>
      <Button variant="outline" className="px-6">
        LEARN MORE
      </Button>
    </div>
  </div>
);

export default Sidebar;
