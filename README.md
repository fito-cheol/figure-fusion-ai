<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1jxcrrPSJiPJmtAwNO9SAOs4UczkR2nCB

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set your Gemini API key:

   - Open `services/geminiService.ts`
   - Replace `"YOUR_GEMINI_API_KEY_HERE"` with your actual Gemini API key
   - Example: `const API_KEY = "your-actual-api-key-here";`

3. Run the app:
   ```bash
   npm run dev
   ```

## Build for Production

```bash
npm run build
```

## PWA Features

This app includes Progressive Web App (PWA) functionality:

- **Installable**: Can be installed on devices like a native app
- **Offline Support**: Works offline with cached content
- **Auto Updates**: Automatically updates when new versions are available
- **Cross Platform**: Works on desktop, mobile, and tablet devices

### Installing the App

1. **Automatic Installation**: Click the "앱 설치하기" button in the footer
2. **Manual Installation**:
   - **Chrome/Edge**: Look for the install icon in the address bar
   - **iOS Safari**: Tap the share button → "Add to Home Screen"
   - **Android Chrome**: Tap the menu button → "Add to Home Screen"
