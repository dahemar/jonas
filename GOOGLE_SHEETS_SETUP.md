# Google Sheets Content Management Setup

## 📋 Overview

This website uses Google Sheets to manage ALL content dynamically. The client can edit everything from images to text without touching any code.

## 🛠️ Setup Instructions

### 1. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Jonas Website Content"

### 2. Create the Required Sheets

Create these sheets in your Google Spreadsheet:

#### **Blog Sheet**
- **Range**: `Blog!A1:D1`
- **Headers**: `Date | Title | Description | Image URL`
- **Required**: Only `Image URL` is required
- **Optional**: Date, Title, and Description can be empty
- **Example**:
  ```
  Date        | Title           | Description                    | Image URL
  2024-01-15  | New Exhibition  | Opening night at gallery      | blog/1.webp
              | Studio Work     |                               | blog/2.webp
              |                 | Working on new series         | blog/3.webp
              |                 |                               | blog/4.webp
  ```

#### **Works Sheet**
- **Range**: `Works!A1:D1`
- **Headers**: `Image URL | Alt Text | Description | Category`
- **Required**: Only `Image URL` is required
- **Optional**: Alt Text, Description, and Category can be empty
- **Example**:
  ```
  Image URL                    | Alt Text        | Description           | Category
  works/WORKS/1.webp           | Studio work     | New series 2024      | WORKS
  works/COMMISSIONS/2.webp     |                 | Client project       | COMMISSIONS
  works/EXHIBITIONS/3.webp     | Exhibition      |                      | EXHIBITIONS
  works/WORKS/4.webp           |                 |                      | 
  ```

#### **Commissions Sheet**
- **Range**: `Commissions!A1:D1`
- **Headers**: `Image URL | Alt Text | Description | Video URL`
- **Required**: Only `Image URL` is required
- **Optional**: Alt Text, Description, and Video URL can be empty
- **Example**:
  ```
  Image URL                    | Alt Text        | Description           | Video URL
  works/COMMISSIONS/1.webp     | Project A       | Commercial work      | https://youtube.com/embed/...
  works/COMMISSIONS/2.webp     |                 | Fashion shoot        | 
  works/COMMISSIONS/3.webp     | Project C       |                      | 
  works/COMMISSIONS/4.webp     |                 |                      | 
  ```

#### **Exhibitions Sheet**
- **Range**: `Exhibitions!A1:D1`
- **Headers**: `Image URL | Alt Text | Description | Category`
- **Required**: Only `Image URL` is required
- **Optional**: Alt Text, Description, and Category can be empty
- **Example**:
  ```
  Image URL                    | Alt Text        | Description           | Category
  works/EXHIBITIONS/1.webp     | Gallery A       | Solo exhibition       | EXHIBITIONS
  works/EXHIBITIONS/2.webp     |                 | Group show            | EXHIBITIONS
  works/EXHIBITIONS/3.webp     | Gallery C       |                      | EXHIBITIONS
  works/EXHIBITIONS/4.webp     |                 |                      | 
  ```

#### **Music Sheet**
- **Range**: `Music!A1:E1`
- **Headers**: `Project Name | Bandcamp URL | Soundcloud URL | Nina URL | Description`
- **Required**: Only `Project Name` is required
- **Optional**: All URLs and Description can be empty
- **Example**:
  ```
  Project Name | Bandcamp URL                    | Soundcloud URL | Nina URL | Description
  angelito     | https://angelito17.bandcamp.com | https://...    | https://... | New album
  babyfloating | https://babyfloating.bandcamp.com|                 | https://... | EP release
  newproject   |                                 | https://...    |              | 
  solo         |                                 |                 |              | 
  ```

#### **Radio Sheet**
- **Range**: `Radio!A1:B1`
- **Headers**: `Embed Code | Description`
- **Required**: Only `Embed Code` is required
- **Optional**: Description can be empty
- **Example**:
  ```
  Embed Code                                                                  | Description
  <iframe src="https://w.soundcloud.com/player/..." width="100%" height="300"> | Latest radio shows
  <iframe src="https://youtube.com/embed/..." width="100%" height="300">        | 
  ```

#### **Contact Sheet**
- **Range**: `Contact!A1:C1`
- **Headers**: `Name | Email | Instagram`
- **Required**: None (all fields are optional)
- **Default**: Will use default values if empty
- **Example**:
  ```
  Name          | Email                    | Instagram
  jonas justen  | jonas.justen@gmx.de      | @jjuusten
                | newemail@example.com     | @newhandle
  jonas justen  |                          | 
                |                          | @jjuusten
  ```

#### **Commercial Sheet**
- **Range**: `Commercial!A1:C1`
- **Headers**: `Image URL | Alt Text | Description`
- **Required**: Only `Image URL` is required
- **Optional**: Alt Text and Description can be empty
- **Example**:
  ```
  Image URL                    | Alt Text        | Description
  commercial/1.webp            | Fashion shoot   | Commercial work for brand
  commercial/2.webp            |                 | Product photography
  commercial/3.webp            | Editorial       | 
  commercial/4.webp            |                 | 
  ```

### 3. Share the Sheet

1. Click "Share" in the top right
2. Set to "Anyone with the link" can "View"
3. Copy the sharing link

### 4. Get Spreadsheet ID

From the sharing link, extract the ID:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit#gid=0
```

### 5. Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create credentials (API Key)
5. Copy the API key

### 6. Update Website Configuration

In `content-manager.js`, replace:
- `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID
- `YOUR_API_KEY` with your actual API key

## 📝 Content Management Guide

### Adding Blog Posts
1. Go to the "Blog" sheet
2. Add a new row with:
   - Date (YYYY-MM-DD format) - **optional**
   - Title - **optional**
   - Description - **optional**
   - Image URL (path to image file) - **required**
3. Only the Image URL is required - you can leave other fields empty

### Adding Works
1. Go to the "Works" sheet
2. Add new rows for each image
3. Use categories: WORKS, COMMISSIONS, EXHIBITIONS
4. Only Image URL is required - Alt Text, Description, and Category are optional

### Adding Music Projects
1. Go to the "Music" sheet
2. Add project name (required) and any relevant URLs (optional)
3. Include description if needed (optional)
4. Only Project Name is required - all URLs and description can be empty

### Updating Contact Info
1. Go to the "Contact" sheet
2. Update name, email, and Instagram handle (all optional)
3. If fields are empty, default values will be used

### Adding Commercial Work
1. Go to the "Commercial" sheet
2. Add image URLs (required) and descriptions (optional)
3. Images should be in the `commercial/` folder
4. Only Image URL is required - Alt Text and Description can be empty

## 🖼️ Image Management

### Supported Formats
- WebP (recommended for best performance)
- JPG/JPEG
- PNG

### Image Organization
- Blog images: `blog/` folder
- Works images: `works/WORKS/`, `works/COMMISSIONS/`, `works/EXHIBITIONS/`
- Commercial images: `commercial/` folder

### Image URLs
Use relative paths with simple numbers:
- `blog/1.webp`
- `works/WORKS/2.webp`
- `works/COMMISSIONS/3.webp`
- `works/EXHIBITIONS/4.webp`
- `commercial/5.webp`

## 🔄 How It Works

1. Website loads
2. JavaScript fetches data from Google Sheets
3. Content is dynamically generated
4. No code changes needed for content updates

## ⚠️ Important Notes

- Keep image URLs consistent with folder structure
- Use WebP format for best performance
- Test changes by refreshing the website
- API has rate limits (1000 requests per 100 seconds)
- Keep spreadsheet publicly viewable

## 🎯 Flexible Content Management

### Key Benefits:
- **Only essential fields are required** - you can leave most columns empty
- **No broken content** - the website handles missing data gracefully
- **Easy to use** - just add the minimum required information
- **Progressive enhancement** - add more details when you have them

### Required vs Optional Fields:
- **Blog**: Only Image URL required
- **Works**: Only Image URL required
- **Music**: Only Project Name required
- **Radio**: Only Embed Code required
- **Contact**: All fields optional (uses defaults)
- **Commercial**: Only Image URL required

### Examples of Minimal Entries:
```
Blog: Just add an image URL
Works: Just add an image URL
Music: Just add a project name
Commercial: Just add an image URL
```

## 🆘 Troubleshooting

### Content not loading?
- Check API key and spreadsheet ID
- Verify spreadsheet is publicly shared
- Check browser console for errors

### Images not showing?
- Verify image URLs are correct
- Check if images exist in the specified folders
- Ensure proper file permissions

### Changes not appearing?
- Clear browser cache
- Wait a few minutes for Google Sheets to update
- Check if API quota is exceeded 