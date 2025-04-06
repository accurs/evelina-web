import React from 'react';

interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function PageHeader({ icon, title, description }: PageHeaderProps) {
  return (
    <div className="text-center mb-16">
      <div className="w-16 h-16 bg-theme/10 rounded-xl flex items-center justify-center mx-auto mb-6">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8 text-theme' })}
      </div>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}

export default PageHeader;