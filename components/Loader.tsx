
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Loader: React.FC = () => {
  const { t } = useLanguage();
  const messages = [
    t('loaderMsg1'),
    t('loaderMsg2'),
    t('loaderMsg3'),
    t('loaderMsg4'),
    t('loaderMsg5'),
  ];
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    // Set initial random message
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
    
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [t]); // Rerun effect if language changes


  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto"></div>
            <p className="text-white text-lg mt-4 font-semibold">{message}</p>
        </div>
    </div>
  );
};
