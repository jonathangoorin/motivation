# Chrome Extension Deployment Guide

## Prerequisites
- Chrome browser installed
- All extension files present and valid
- Extension tested locally

## Local Testing (Before Deployment)

### 1. Load Extension in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select your extension directory (`/Users/anton/code/motivation`)
5. The extension should appear in your extensions list

### 2. Test the Extension
1. Open a new tab - it should show your motivation dashboard
2. Enter your birth date and click "Motivate"
3. Verify the age counter displays correctly
4. Check that the extension works as expected

## Chrome Web Store Deployment

### 1. Prepare Your Extension
- Ensure all files are present:
  - `manifest.json` (Manifest V3)
  - `dashboard.html`
  - `app/app.js`
  - `motivation.js`
  - `css/style.css`
  - Icons: `icon-16.png`, `icon-48.png`, `icon-128.png`
  - `screenshot.png` (for store listing)

### 2. Create Chrome Web Store Account
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Sign in with your Google account
3. Pay the one-time $5.00 registration fee

### 3. Upload Your Extension
1. Click "Add new item"
2. Upload your extension as a ZIP file:
   ```bash
   cd /Users/anton/code/motivation
   zip -r motivation-extension-fixed.zip . -x "*.git*" "*.DS_Store*"
   ```
3. Fill in the store listing information:
   - **App name**: Motivation
   - **Short description**: Replace new tab page with Motivation
   - **Detailed description**: A beautiful new tab page that shows your age with millisecond precision, helping you stay motivated by realizing how precious time is.
   - **Category**: Productivity
   - **Language**: English

### 4. Upload Images
- **Icon**: Use `icon-128.png`
- **Screenshot**: Use `screenshot.png`
- **Promotional images**: Create additional promotional graphics if desired

### 5. Privacy Policy
- If you collect any user data, provide a privacy policy URL
- For this extension, you might want to add: "This extension stores your birth date locally and does not transmit any data to external servers."

### 6. Submit for Review
1. Review all information
2. Click "Submit for review"
3. Wait for Google's review process (typically 1-3 business days)

## Post-Deployment

### 1. Monitor Reviews
- Check the developer dashboard for any issues
- Respond to user feedback and reviews

### 2. Updates
- To update the extension:
  1. Modify your code
  2. Increment version in `manifest.json`
  3. Re-upload to the Chrome Web Store

## Troubleshooting

### Common Issues
- **Manifest V2 deprecation**: Ensure using Manifest V3
- **Missing permissions**: Check that all required permissions are declared
- **Icon issues**: Verify icons are proper PNG format and sizes
- **Content Security Policy**: Ensure CSP is properly configured for Manifest V3

### Local Testing Issues
- Clear browser cache and reload extension
- Check Chrome DevTools console for errors
- Verify all file paths in manifest.json are correct

## Extension Features
- Replaces new tab page with motivation dashboard
- Shows age with millisecond precision
- Stores birth date locally using localStorage
- Beautiful, responsive design
- Works offline

## Support
For issues or questions about deployment, check:
- [Chrome Extension Development Documentation](https://developer.chrome.com/docs/extensions/)
- [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program_policies/)
