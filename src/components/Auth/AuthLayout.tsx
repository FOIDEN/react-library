import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default AuthLayout;