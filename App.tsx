
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { TransformOptions, FigureOptions } from './components/TransformOptions';
import { transformImageToFigure } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { useLanguage } from './contexts/LanguageContext';

const initialFigureOptions: Omit<FigureOptions, 'mode'> = {
  scale: '1/7',
  artStyle: 'Anime',
  texture: 'Matte',
  base: 'Simple Disc',
  material: 'PVC/ABS',
  pose: 'Standing',
  colorScheme: 'Original Colors',
  detailing: 'Standard',
  background: 'Studio',
};

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [originalImageDimensions, setOriginalImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [figureOptions, setFigureOptions] = useState<Omit<FigureOptions, 'mode'>>(initialFigureOptions);
  const { language, setLanguage, t } = useLanguage();

  const handleImageUpload = (file: File) => {
    setOriginalImageFile(file);
    setGeneratedImage(null);
    setError(null);
    const previewUrl = URL.createObjectURL(file);
    setOriginalImagePreview(previewUrl);

    // Get image dimensions
    const img = new Image();
    img.onload = () => {
        setOriginalImageDimensions({ width: img.width, height: img.height });
    };
    img.src = previewUrl;
  };
  
  const resetState = () => {
      setOriginalImageFile(null);
      setOriginalImagePreview(null);
      setGeneratedImage(null);
      setOriginalImageDimensions(null);
      setError(null);
      setIsLoading(false);
      setFigureOptions(initialFigureOptions);
  };

  const handleTransform = useCallback(async () => {
    if (!originalImageFile || !originalImageDimensions) {
      setError(t('errorUpload'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const { base64Data, mimeType } = await fileToBase64(originalImageFile);
      const fullOptions: FigureOptions = { ...figureOptions, mode: 'dual' };
      const result = await transformImageToFigure(base64Data, mimeType, fullOptions, originalImageDimensions);
      
      if (result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      } else {
        setError(t('errorGenerate'));
      }
    } catch (e) {
      console.error(e);
      setError(t('errorTransform'));
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, figureOptions, originalImageDimensions, t]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ko' : 'en');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />

        {!originalImagePreview && (
          <ImageUploader onImageUpload={handleImageUpload} />
        )}

        {error && (
          <div className="mt-8 text-center bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">{t('errorTitle')}: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading && <Loader />}
        
        {originalImagePreview && !isLoading && (
            <ResultDisplay 
                originalImage={originalImagePreview} 
                generatedImage={generatedImage} 
            />
        )}

        {originalImagePreview && !isLoading && (
          <>
            <TransformOptions 
              currentOptions={figureOptions} 
              onOptionChange={setFigureOptions} 
            />
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                    onClick={handleTransform}
                    disabled={isLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-600/30"
                >
                    <SparklesIcon />
                    {generatedImage ? t('regenerateButton') : t('transformButton')}
                </button>
                 <button
                    onClick={resetState}
                    className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
                >
                    {t('startOverButton')}
                </button>
            </div>
          </>
        )}

      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>{t('footerCredit')}</p>
        <div className="mt-2">
            <button onClick={toggleLanguage} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                {language === 'en' ? '한국어로 변경' : 'Switch to English'}
            </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
