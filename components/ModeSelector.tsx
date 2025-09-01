import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { BoxIcon } from './icons/BoxIcon';

export type TransformMode = 'figureOnly' | 'packaged';

interface ModeSelectorProps {
  currentMode: TransformMode;
  onModeChange: (mode: TransformMode) => void;
}

interface ModeButtonProps {
    label: string;
    description: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}

const ModeButton: React.FC<ModeButtonProps> = ({ label, description, icon, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 p-4 rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                isActive 
                ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-600/20' 
                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
            }`}
        >
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                    {icon}
                </div>
                <div>
                    <h4 className={`font-bold text-lg ${isActive ? 'text-white' : 'text-gray-300'}`}>{label}</h4>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
            </div>
        </button>
    )
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="max-w-2xl mx-auto mt-8">
        <h3 className="text-center text-lg font-semibold text-gray-300 mb-4">Choose a style</h3>
        <div className="flex flex-col sm:flex-row gap-4">
            <ModeButton
                label="Figure Only"
                description="Generates a clean shot of the figure on a studio background."
                icon={<UserIcon />}
                isActive={currentMode === 'figureOnly'}
                onClick={() => onModeChange('figureOnly')}
            />
             <ModeButton
                label="Packaged Version"
                description="Shows the figure inside its retail box with custom art."
                icon={<BoxIcon />}
                isActive={currentMode === 'packaged'}
                onClick={() => onModeChange('packaged')}
            />
        </div>
    </div>
  );
};