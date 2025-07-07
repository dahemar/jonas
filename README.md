# Jonas Website

A simple, DIY-style website hosted on GitHub Pages with **complete content management through Google Sheets**.

## 🎯 Features

- **Complete Content Management**: All content (images, text, links) managed through Google Sheets
- **No Code Required**: Client can update everything without touching any code
- **Dynamic Loading**: Content loads automatically from Google Sheets
- **Clean, DIY aesthetic**: Minimalist design with subtle glitch effects
- **Responsive design**: Works perfectly on all devices
- **Mobile-friendly layout**: Optimized for mobile navigation

## 📋 Content Management

### What Can Be Managed via Google Sheets:
- ✅ **Blog posts** (images, titles, dates, descriptions)
- ✅ **Works** (studio work, commissions, exhibitions)
- ✅ **Music projects** (bandcamp, soundcloud, nina links)
- ✅ **Radio shows** (SoundCloud embeds)
- ✅ **Contact information** (name, email, Instagram)
- ✅ **Commercial work** (images and descriptions)

### Setup Instructions:
1. **Follow the detailed setup guide**: [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)
2. **Use the template structure**: [google-sheets-template.md](google-sheets-template.md)
3. **Configure API keys** in `content-manager.js`

## 🛠️ Technical Setup

### Prerequisites:
- Google Sheets account
- Google Cloud Console access (for API key)
- GitHub account (for hosting)

### Quick Start:
1. **Create Google Sheet** following the template
2. **Enable Google Sheets API** and get API key
3. **Update configuration** in `content-manager.js`
4. **Deploy to GitHub Pages**

## 📁 File Structure
```
jonas/
├── *.html              # All website pages
├── *.css               # Styling files
├── content-manager.js  # Google Sheets integration
├── blog/               # Blog images (1.webp, 2.webp, etc.)
├── works/              # Works images (1.webp, 2.webp, etc.)
├── commercial/         # Commercial images (1.webp, 2.webp, etc.)
├── TemplateGothic.otf  # Custom font
└── *.md               # Documentation
```

## 🎨 Design Features

- **Glitch Effects**: Subtle DIY aesthetic with hover effects
- **Crosshair Cursor**: Technical, experimental feel
- **Responsive Navigation**: Mobile-optimized menu
- **WebP Images**: Optimized for fast loading
- **Clean Typography**: Template Gothic font

## 📱 Mobile Features

- **Fixed Header**: Menu stays at top on mobile
- **Horizontal Menu**: All navigation in one line
- **Touch Optimized**: No hover effects on mobile
- **Responsive Images**: Automatically scaled

## 🔧 Configuration

### Google Sheets Setup:
- Create spreadsheet with 8 sheets (Blog, Works, Commissions, Exhibitions, Music, Radio, Contact, Commercial)
- Share publicly (view only)
- Get spreadsheet ID and API key
- Update `content-manager.js`

### Content Updates:
- Edit Google Sheets directly
- Changes appear on website after refresh
- No code deployment needed
- Real-time content management

## 🚀 Deployment

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Configure Google Sheets API
4. Update content-manager.js with your credentials
5. Website is live and manageable via Google Sheets

## 📚 Documentation

- [Google Sheets Setup Guide](GOOGLE_SHEETS_SETUP.md) - Complete setup instructions
- [Template Structure](google-sheets-template.md) - Google Sheets template
- [Image Mapping](IMAGE_MAPPING.md) - Original filename to number mapping

## 🆘 Support

- **Content Issues**: Check Google Sheets configuration
- **API Issues**: Verify API key and spreadsheet sharing
- **Image Issues**: Ensure correct file paths in Google Sheets
- **Mobile Issues**: Test responsive design settings

## 🔄 Updates

- **Content**: Edit Google Sheets (instant)
- **Design**: Modify CSS files (requires deployment)
- **Structure**: Edit HTML files (requires deployment)
- **Functionality**: Modify JavaScript files (requires deployment) 