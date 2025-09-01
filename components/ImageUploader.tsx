
import React, { useCallback, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const { t } = useLanguage();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onImageUpload(event.target.files[0]);
        }
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            onImageUpload(event.dataTransfer.files[0]);
        }
    }, [onImageUpload]);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (!isDragging) setIsDragging(true);
    }, [isDragging]);

    const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
    }, []);

  return (
    <div className="max-w-2xl mx-auto w-full">
      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex justify-center items-center w-full px-6 py-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-gray-800/50' : 'border-gray-600 hover:border-gray-500 bg-gray-800'}`}
      >
        <div className="text-center">
            <UploadIcon />
          <h2 className="text-xl font-semibold text-gray-200">
            {t('uploaderTitle')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{t('uploaderSubtitle')}</p>
        </div>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
    </div>
  );
};
