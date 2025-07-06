// Replace these values with your actual Google Sheets credentials
// 1. Get the SPREADSHEET_ID from your Google Sheet URL
//    Example: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
// 2. Get the API_KEY from Google Cloud Console
const SPREADSHEET_ID = '1Cns-OOGDcvg3-EaqWPqkzRFG_yazsx3TWzHkOcIMQJQ';
const API_KEY = 'AIzaSyDVrLJHQXvGxL0HryTLkPLQlvIM0MJAbvk';

// Function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

async function loadBlogPosts() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:E?key=${API_KEY}`
        );
        const data = await response.json();
        
        if (!data.values) {
            throw new Error('No data found in the spreadsheet');
        }
        
        const posts = data.values.slice(1); // Skip header row
        const blogContainer = document.getElementById('blog-posts');
        blogContainer.innerHTML = '';

        posts.forEach((post, idx) => {
            // Rellenar valores vacíos
            const [date = '', title = '', content = '', imageUrl = '', section = ''] = post;
            if (section.trim().toLowerCase() !== 'blog') return;
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';
            // Only include image if URL exists and is not empty
            const imageHtml = imageUrl && imageUrl.trim() !== '' 
                ? `<img src="${imageUrl}" alt="${title}">` 
                : '';
            postElement.innerHTML = `
                <h2>${title}</h2>
                <div class="date">${formatDate(date)}</div>
                ${imageHtml}
                <div class="content">${content}</div>
            `;
            blogContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById('blog-posts').innerHTML = `
            <div class="error-message">
                <p>Error loading blog posts. Please check:</p>
                <ul>
                    <li>Your spreadsheet ID and API key are correct</li>
                    <li>The Google Sheet is shared publicly</li>
                    <li>Your spreadsheet has the correct column headers</li>
                </ul>
                <p>Error details: ${error.message}</p>
            </div>
        `;
    }
}

// Load blog posts when the page loads
document.addEventListener('DOMContentLoaded', loadBlogPosts); 