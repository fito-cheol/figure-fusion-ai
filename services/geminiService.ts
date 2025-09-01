
import { GoogleGenAI, Modality } from "@google/genai";
import { FigureOptions } from "../components/TransformOptions";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getArtStyleDescription = (style: FigureOptions['artStyle']): string => {
    switch (style) {
        case 'Anime': return "The figure must have a Japanese anime/manga art style, characterized by large expressive eyes, defined linework, and cel-shading.";
        case 'Realistic': return "The figure must be hyper-realistic, with detailed skin textures, accurate anatomy, and natural shading to look like a real person/animal.";
        case 'Chibi/SD': return "The figure must have 'chibi' or 'super-deformed' (SD) proportions: a very large, expressive head and a small, cute, simplified body.";
        case 'Stylized': return "The figure should have a unique, stylized look, like something from a modern western cartoon or fantasy art, with exaggerated features and dynamic shapes.";
        default: return "An anime art style.";
    }
}

const getTextureDescription = (texture: FigureOptions['texture']): string => {
    switch (texture) {
        case 'Matte': return "The figure's surface finish must be matte, with a smooth, non-reflective surface that diffuses light.";
        case 'Glossy': return "The figure must have a glossy, high-shine finish that reflects light, making it look polished and sleek.";
        case 'Metallic': return "Incorporate metallic paint effects, especially on armor, weapons, or accessories, to give them a realistic metal sheen.";
        case 'Weathered': return "Apply a weathered effect to the figure, with details like scratches, dust, or rust to make it look aged or battle-worn.";
        default: return "A smooth, matte finish.";
    }
}

const getBaseDescription = (base: FigureOptions['base']): string => {
    switch (base) {
        case 'None': return 'The figure should have no display base and be able to stand on its own.';
        case 'Simple Disc': return 'The figure must be placed on a simple, elegant circular or square disc-like display base (black, white, or clear).';
        case 'Themed Diorama': return 'The figure must be part of a themed diorama base that complements its origin (e.g., a rocky battlefield, a forest floor, a sci-fi platform).';
        case 'Floating': return 'The figure should be mounted on a discreet stand to give it a dynamic, floating or flying appearance.';
        default: return 'A simple display base.';
    }
};

const getPoseDescription = (pose: FigureOptions['pose']): string => {
    switch (pose) {
        case 'Standing': return "A museum-style standing pose, either neutral or with a slight, characterful stance. It should be stable and grounded.";
        case 'Dynamic/Action': return "A dynamic action pose, as if captured mid-movement (e.g., jumping, attacking, running). The pose should be energetic and expressive.";
        case 'Sitting': return "A relaxed sitting or kneeling pose, interacting with the base or an accessory naturally.";
        default: return "A standard standing pose.";
    }
}

const getColorSchemeDescription = (scheme: FigureOptions['colorScheme']): string => {
    switch (scheme) {
        case 'Original Colors': return "Use the colors from the original uploaded image as the primary reference for the figure's paint scheme.";
        case 'Monochrome': return "Render the entire figure in a monochrome color scheme, like a grayscale prototype or a stylish single-color variant (e.g., all-black).";
        case 'Vibrant': return "Use a vibrant, high-saturation color palette that enhances the original colors, making the figure pop visually.";
        default: return "Use the original colors.";
    }
}

const getDetailingDescription = (detailing: FigureOptions['detailing']): string => {
    switch (detailing) {
        case 'Standard': return "A standard level of detail suitable for the scale.";
        case 'High': return "A high level of detail, with fine textures on clothing, intricate facial expressions, and carefully sculpted hair.";
        case 'Ultra': return "An ultra-fine level of detail, capturing microscopic details like fabric weaves, subtle skin pores, and complex accessory patterns.";
        default: return "A standard level of detail.";
    }
}

const getBackgroundDescription = (background: FigureOptions['background']): string => {
    switch (background) {
        case 'Studio': return "Both the figure and the box must be presented against a clean, neutral, and seamless studio background (e.g., a simple white or gray gradient). The lighting should be professional and highlight both objects clearly.";
        case 'Bookshelf': return "The scene should be a realistic bookshelf, with the figure and box placed amongst books. Use a shallow depth of field (bokeh effect) to make the scene look like a real photograph taken with a DSLR camera.";
        case 'Desktop': return "The scene should be a modern, clean desktop environment, with items like a keyboard, monitor, or plant nearby. The lighting should be natural, as if from a window.";
        case 'Showcase': return "The scene should be inside a glass display showcase, possibly with other collectibles faintly visible in the background. The lighting should be dramatic, like from integrated LED strips.";
        default: return "A clean, studio background.";
    }
};

const createFigurePrompt = (options: FigureOptions, dimensions: { width: number; height: number }): string => `
You are an expert AI digital artist specializing in creating photorealistic images of collectible figures.
Your task is to take the user's uploaded image and transform the main subject into a high-quality, ${options.scale} scale collectible figure, presented as a professional photograph that includes both the figure and its packaging.

**Overall Goal:** The final image must look like a single, real photograph of physical objects. It must NOT look like a digital render, illustration, or a collage.

---

**INPUT IMAGE CONTEXT (FOR YOUR INFORMATION ONLY):**
*   The user uploaded an image with dimensions ${dimensions.width}px (width) by ${dimensions.height}px (height).
*   **Crucial Instruction:** You MUST completely IGNORE the original aspect ratio. Your goal is to create a new scene, not to replicate the original's composition.

---

**CORE FIGURE SPECIFICATIONS:**

*   **1. Art Style:** ${getArtStyleDescription(options.artStyle)}
*   **2. Material & Texture:** The figure must look like it's made of high-grade ${options.material}. The surface finish is critical: ${getTextureDescription(options.texture)}
*   **3. Pose:** The figure's pose should be a static, non-articulated ${options.pose}. It should be inspired by the original image but optimized for a display piece.
*   **4. Color & Detailing:**
    *   **Color Scheme:** ${getColorSchemeDescription(options.colorScheme)}
    *   **Detailing Level:** The sculpt must have a ${options.detailing} level of detail.
*   **5. Base:** ${getBaseDescription(options.base)}

---

**FINAL IMAGE COMPOSITION:**

*   **Resolution & Aspect Ratio:** The final output image MUST be a high-resolution landscape photograph with an exact resolution of 1920x1080 pixels (a 16:9 aspect ratio). This is a strict, non-negotiable requirement.
*   **Composition:** The arrangement of the figure and box must be HORIZONTAL to fill the wide 1920x1080 frame. DO NOT stack them vertically. The final image should be a cinematic, wide shot.
*   **Scene:** Create a single, cohesive professional product photograph.
*   **Arrangement:** On the left side, display the collectible figure standing on its base. On the right side, display its corresponding retail packaging (box) standing upright.
*   **Box Art:** Use the original uploaded image itself as the primary artwork on the packaging. The art should be vibrant and well-integrated into the box design, which should also feature a clear plastic window.
*   **Environment:** ${getBackgroundDescription(options.background)}

**CRITICAL RULE:** Avoid an "action figure" look with visible joints or articulation. The result must be a premium, static, display-focused art piece, presented as a single, unified product shot.
`;

export const transformImageToFigure = async (
    base64Data: string, 
    mimeType: string, 
    options: FigureOptions,
    dimensions: { width: number; height: number }
): Promise<{imageUrl: string | null; text: string | null}> => {
  try {
    const prompt = createFigurePrompt(options, dimensions);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let imageUrl: string | null = null;
    let text: string | null = null;

    if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64ImageBytes = part.inlineData.data;
              const imageMimeType = part.inlineData.mimeType;
              imageUrl = `data:${imageMimeType};base64,${base64ImageBytes}`;
            } else if (part.text) {
              text = part.text;
            }
        }
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while transforming the image with the Gemini API.");
  }
};
