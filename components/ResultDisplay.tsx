
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
}

interface ImageCardProps {
    src: string | null;
    title: string;
    isPlaceholder?: boolean;
    objectFitClass?: 'object-contain' | 'object-cover';
}

const ImageCard: React.FC<ImageCardProps> = ({ src, title, isPlaceholder = false, objectFitClass = 'object-contain' }) => {
  const { t } = useLanguage();
  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-400 mb-3">{title}</h3>
      <div className="aspect-video w-full rounded-xl bg-gray-800 shadow-lg overflow-hidden relative">
        {src && <img src={src} alt={title} className={`w-full h-full ${objectFitClass}`} />}
        {isPlaceholder && (
           <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-sm">{t('placeholderText')}</p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage }) => {
  const { t } = useLanguage();
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <ImageCard src={originalImage} title={t('originalImageTitle')} objectFitClass="object-contain" />
      <ImageCard src={generatedImage} title={t('generatedImageTitle')} isPlaceholder={!generatedImage} objectFitClass="object-cover" />
    </div>
  );
};
