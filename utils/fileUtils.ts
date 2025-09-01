
export const fileToBase64 = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // The result is a data URL: "data:image/png;base64,iVBORw0KGgo..."
            // We need to strip the prefix "data:[mimeType];base64,"
            const base64Data = result.split(',')[1];
            const mimeType = result.substring(result.indexOf(':') + 1, result.indexOf(';'));
            resolve({ base64Data, mimeType });
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};
