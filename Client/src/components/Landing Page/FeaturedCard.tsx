import React from 'react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/20 gap-3">
    {icon}
    <span className="text-white/90 text-sm">{title}</span>
  </div>
);

export default FeatureCard;
