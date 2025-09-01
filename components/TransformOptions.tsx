
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tooltip } from './Tooltip';

// --- Type Definitions ---
export type TransformMode = 'figureOnly' | 'packaged' | 'dual'; 
export type FigureScale = '1/12' | '1/8' | '1/7' | '1/6' | '1/4';
export type FigureArtStyle = 'Anime' | 'Realistic' | 'Chibi/SD' | 'Stylized';
export type FigureTexture = 'Matte' | 'Glossy' | 'Metallic' | 'Weathered';
export type FigureBase = 'None' | 'Simple Disc' | 'Themed Diorama' | 'Floating';
export type FigureMaterial = 'PVC/ABS' | 'Resin' | 'Polystone' | 'Metal';
export type FigurePose = 'Standing' | 'Dynamic/Action' | 'Sitting';
export type FigureColorScheme = 'Original Colors' | 'Monochrome' | 'Vibrant';
export type FigureDetailing = 'Standard' | 'High' | 'Ultra';
export type FigureBackground = 'Studio' | 'Bookshelf' | 'Desktop' | 'Showcase';

export interface FigureOptions {
    mode: TransformMode;
    scale: FigureScale;
    artStyle: FigureArtStyle;
    texture: FigureTexture;
    base: FigureBase;
    material: FigureMaterial;
    pose: FigurePose;
    colorScheme: FigureColorScheme;
    detailing: FigureDetailing;
    background: FigureBackground;
}

interface TransformOptionsProps {
    currentOptions: Omit<FigureOptions, 'mode'>;
    onOptionChange: (options: Omit<FigureOptions, 'mode'>) => void;
}

// --- Reusable Sub-components ---
interface OptionGroupProps<T extends string> {
    label: string;
    options: readonly T[];
    selectedValue: T;
    onChange: (value: T) => void;
    disabled?: boolean;
}

const OptionGroup = <T extends string>({ label, options, selectedValue, onChange, disabled = false }: OptionGroupProps<T>) => {
    const { t, td } = useLanguage();
    
    return (
        <div className={`transition-opacity duration-300 ${disabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">{label}</h4>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <Tooltip key={option} text={td(option as any)}>
                        <button
                            onClick={() => onChange(option)}
                            className={`px-3 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                                selectedValue === option
                                    ? 'bg-indigo-600 text-white font-semibold shadow-md'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {t(option as any)}
                        </button>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="space-y-6">
        <h4 className="text-md font-bold text-gray-200 border-b-2 border-gray-700 pb-2">{title}</h4>
        {children}
    </div>
);

// --- Main Component ---
export const TransformOptions: React.FC<TransformOptionsProps> = ({ currentOptions, onOptionChange }) => {
    const { t } = useLanguage();

    const scales: readonly FigureScale[] = ['1/12', '1/8', '1/7', '1/6', '1/4'];
    const artStyles: readonly FigureArtStyle[] = ['Anime', 'Realistic', 'Chibi/SD', 'Stylized'];
    const textures: readonly FigureTexture[] = ['Matte', 'Glossy', 'Metallic', 'Weathered'];
    const bases: readonly FigureBase[] = ['None', 'Simple Disc', 'Themed Diorama', 'Floating'];
    const materials: readonly FigureMaterial[] = ['PVC/ABS', 'Resin', 'Polystone', 'Metal'];
    const poses: readonly FigurePose[] = ['Standing', 'Dynamic/Action', 'Sitting'];
    const colorSchemes: readonly FigureColorScheme[] = ['Original Colors', 'Monochrome', 'Vibrant'];
    const detailings: readonly FigureDetailing[] = ['Standard', 'High', 'Ultra'];
    const backgrounds: readonly FigureBackground[] = ['Studio', 'Bookshelf', 'Desktop', 'Showcase'];

    const handleOptionChange = <K extends keyof Omit<FigureOptions, 'mode'>>(key: K, value: Omit<FigureOptions, 'mode'>[K]) => {
        onOptionChange({ ...currentOptions, [key]: value });
    };

    return (
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-2xl space-y-8">
            <h3 className="text-center text-xl font-semibold text-gray-100">{t('customizeTitle')}</h3>
            
            <Section title={t('coreConceptSection')}>
                <OptionGroup label={t('artStyleLabel')} options={artStyles} selectedValue={currentOptions.artStyle} onChange={(v) => handleOptionChange('artStyle', v)} />
            </Section>

            <Section title={t('physicalPropertiesSection')}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <OptionGroup label={t('scaleLabel')} options={scales} selectedValue={currentOptions.scale} onChange={(v) => handleOptionChange('scale', v)} />
                    <OptionGroup label={t('materialLabel')} options={materials} selectedValue={currentOptions.material} onChange={(v) => handleOptionChange('material', v)} />
                    <OptionGroup label={t('textureLabel')} options={textures} selectedValue={currentOptions.texture} onChange={(v) => handleOptionChange('texture', v)} />
                </div>
            </Section>
            
            <Section title={t('stagingPoseSection')}>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <OptionGroup label={t('poseLabel')} options={poses} selectedValue={currentOptions.pose} onChange={(v) => handleOptionChange('pose', v)} />
                    <OptionGroup label={t('baseLabel')} options={bases} selectedValue={currentOptions.base} onChange={(v) => handleOptionChange('base', v)} />
                    <OptionGroup 
                        label={t('backgroundLabel')} 
                        options={backgrounds} 
                        selectedValue={currentOptions.background} 
                        onChange={(v) => handleOptionChange('background', v)}
                    />
                 </div>
            </Section>

            <Section title={t('aestheticsSection')}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <OptionGroup label={t('colorSchemeLabel')} options={colorSchemes} selectedValue={currentOptions.colorScheme} onChange={(v) => handleOptionChange('colorScheme', v)} />
                    <OptionGroup label={t('detailingLabel')} options={detailings} selectedValue={currentOptions.detailing} onChange={(v) => handleOptionChange('detailing', v)} />
                </div>
            </Section>
        </div>
    );
};
