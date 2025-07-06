# Jonas Website

A simple, DIY-style website hosted on GitHub Pages with blog content managed through Google Sheets.

## Setup Instructions

1. **Google Sheets Setup**
   - Create a new Google Sheet
   - Add the following columns: Date, Title, Content, Image URL
   - Share the sheet publicly (View only)
   - Get the spreadsheet ID from the URL
   - Enable Google Sheets API in Google Cloud Console
   - Create an API key

2. **Website Setup**
   - Replace `YOUR_SPREADSHEET_ID` and `YOUR_API_KEY` in `script.js` with your actual values
   - Push the code to a GitHub repository
   - Enable GitHub Pages in the repository settings

3. **Adding Blog Posts**
   - Simply add new rows to your Google Sheet
   - The website will automatically load the new content

## File Structure
- `index.html` - Main website structure
- `styles.css` - Styling
- `script.js` - Blog post loading functionality

## Features
- Clean, DIY aesthetic
- Responsive design
- Easy blog post management through Google Sheets
- Sidebar navigation
- Mobile-friendly layout 