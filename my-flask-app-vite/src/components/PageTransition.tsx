<<<<<<< HEAD
=======
import React from 'react';

>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
interface PageTransitionProps {
  show: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ show }) => {
  return (
    <div
<<<<<<< HEAD
      className={`fixed inset-0 bg-blue-600 z-50 transition-transform duration-500 ease-in-out ${
=======
      className={`fixed inset-0 bg-emerald-600 z-50 transition-transform duration-500 ease-in-out ${
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    />
  );
};

export default PageTransition; 