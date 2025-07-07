// Content Manager for Jonas Website
// Loads all content dynamically from Google Sheets
// Handles empty columns gracefully - only imageUrl is required

class ContentManager {
    constructor() {
        this.spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with actual ID
        this.apiKey = 'YOUR_API_KEY'; // Replace with actual API key
        this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
    }

    // Load all content when page loads
    async init() {
        try {
            await this.loadContent();
        } catch (error) {
            console.error('Error loading content:', error);
            this.showFallbackContent();
        }
    }

    // Load content based on current page
    async loadContent() {
        const currentPage = this.getCurrentPage();
        
        switch (currentPage) {
            case 'blog':
                await this.loadBlogContent();
                break;
            case 'works':
                await this.loadWorksContent();
                break;
            case 'music':
                await this.loadMusicContent();
                break;
            case 'radio':
                await this.loadRadioContent();
                break;
            case 'contact':
                await this.loadContactContent();
                break;
            case 'commercial':
                await this.loadCommercialContent();
                break;
            default:
                await this.loadBlogContent(); // Default to blog
        }
    }

    // Get current page from URL
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('works.html')) return 'works';
        if (path.includes('music.html')) return 'music';
        if (path.includes('radio.html')) return 'radio';
        if (path.includes('contact.html')) return 'contact';
        if (path.includes('commercial.html')) return 'commercial';
        return 'blog'; // Default
    }

    // Fetch data from Google Sheets
    async fetchSheetData(range) {
        const url = `${this.baseUrl}${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.values || [];
    }

    // Helper function to safely get array values
    safeGet(array, index, defaultValue = '') {
        return array && array[index] ? array[index].trim() : defaultValue;
    }

    // Load blog content - only imageUrl is required
    async loadBlogContent() {
        const data = await this.fetchSheetData('Blog!A2:D');
        const container = document.getElementById('blog-posts');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach(row => {
            const date = this.safeGet(row, 0);
            const title = this.safeGet(row, 1);
            const description = this.safeGet(row, 2);
            const imageUrl = this.safeGet(row, 3);
            
            // Only require imageUrl, everything else is optional
            if (imageUrl && imageUrl !== '') {
                const post = this.createBlogPost(date, title, description, imageUrl);
                container.appendChild(post);
            }
        });
    }

    // Load works content - only imageUrl is required
    async loadWorksContent() {
        const worksData = await this.fetchSheetData('Works!A2:D');
        const commissionsData = await this.fetchSheetData('Commissions!A2:D');
        const exhibitionsData = await this.fetchSheetData('Exhibitions!A2:D');
        
        this.loadSectionContent('works-posts', worksData);
        this.loadSectionContent('commissions-posts', commissionsData);
        this.loadSectionContent('exhibitions-posts', exhibitionsData);
    }

    // Load music content - only project name is required
    async loadMusicContent() {
        const data = await this.fetchSheetData('Music!A2:E');
        const container = document.querySelector('.music-projects');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach(row => {
            const projectName = this.safeGet(row, 0);
            const bandcampUrl = this.safeGet(row, 1);
            const soundcloudUrl = this.safeGet(row, 2);
            const ninaUrl = this.safeGet(row, 3);
            const description = this.safeGet(row, 4);
            
            // Only require project name, everything else is optional
            if (projectName && projectName !== '') {
                const project = this.createMusicProject(projectName, bandcampUrl, soundcloudUrl, ninaUrl, description);
                container.appendChild(project);
            }
        });
    }

    // Load radio content - only embed code is required
    async loadRadioContent() {
        const data = await this.fetchSheetData('Radio!A2:B');
        const container = document.querySelector('.section-content');
        
        if (!container) return;
        
        if (data.length > 0) {
            const embedCode = this.safeGet(data[0], 0);
            const description = this.safeGet(data[0], 1);
            
            if (embedCode && embedCode !== '') {
                container.innerHTML = `
                    ${embedCode}
                    ${description ? `<p>${description}</p>` : ''}
                `;
            }
        }
    }

    // Load contact content - all fields are optional
    async loadContactContent() {
        const data = await this.fetchSheetData('Contact!A2:C');
        const container = document.querySelector('.section-content');
        
        if (!container || data.length === 0) return;
        
        const name = this.safeGet(data[0], 0, 'jonas justen');
        const email = this.safeGet(data[0], 1, 'jonas.justen@gmx.de');
        const instagram = this.safeGet(data[0], 2, '@jjuusten');
        
        container.innerHTML = `
            <h2>${name}</h2>
            <p>mail. ${email}</p>
            <p>insta. ${instagram}</p>
        `;
    }

    // Load commercial content - only imageUrl is required
    async loadCommercialContent() {
        const data = await this.fetchSheetData('Commercial!A2:C');
        const container = document.getElementById('commercial-posts');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach(row => {
            const imageUrl = this.safeGet(row, 0);
            const altText = this.safeGet(row, 1);
            const description = this.safeGet(row, 2);
            
            // Only require imageUrl, everything else is optional
            if (imageUrl && imageUrl !== '') {
                const post = this.createCommercialPost(imageUrl, altText, description);
                container.appendChild(post);
            }
        });
    }

    // Load section content (for works) - only imageUrl is required
    loadSectionContent(sectionId, data) {
        const container = document.getElementById(sectionId);
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach(row => {
            const imageUrl = this.safeGet(row, 0);
            const altText = this.safeGet(row, 1);
            const description = this.safeGet(row, 2);
            const category = this.safeGet(row, 3);
            
            // Only require imageUrl, everything else is optional
            if (imageUrl && imageUrl !== '') {
                const post = this.createImagePost(imageUrl, altText, description);
                container.appendChild(post);
            }
        });
    }

    // Create blog post element - handles empty fields gracefully
    createBlogPost(date, title, description, imageUrl) {
        const post = document.createElement('div');
        post.className = 'blog-post';
        
        let html = '';
        
        // Always include image if provided
        if (imageUrl) {
            html += `<img src="${imageUrl}" alt="${title || 'Blog post'}">`;
        }
        
        // Only include title if provided
        if (title) {
            html += `<h3>${title}</h3>`;
        }
        
        // Only include date if provided
        if (date) {
            html += `<p class="date">${date}</p>`;
        }
        
        // Only include description if provided
        if (description) {
            html += `<p>${description}</p>`;
        }
        
        post.innerHTML = html;
        return post;
    }

    // Create music project element - handles empty fields gracefully
    createMusicProject(name, bandcampUrl, soundcloudUrl, ninaUrl, description) {
        const project = document.createElement('div');
        project.className = 'music-project';
        
        let html = `<h2>${name}</h2>`;
        
        // Only include description if provided
        if (description) {
            html += `<p>${description}</p>`;
        }
        
        // Only include links if provided
        if (bandcampUrl) {
            html += `<p><a href="${bandcampUrl}" target="_blank" class="music-link">bandcamp</a></p>`;
        }
        
        if (soundcloudUrl) {
            html += `<p><a href="${soundcloudUrl}" target="_blank" class="music-link">soundcloud</a></p>`;
        }
        
        if (ninaUrl) {
            html += `<p><a href="${ninaUrl}" target="_blank" class="music-link">nina</a></p>`;
        }
        
        project.innerHTML = html;
        return project;
    }

    // Create image post element - handles empty fields gracefully
    createImagePost(imageUrl, altText, description) {
        const post = document.createElement('div');
        post.className = 'blog-post';
        
        let html = `<img src="${imageUrl}" alt="${altText || 'Image'}">`;
        
        // Only include description if provided
        if (description) {
            html += `<p>${description}</p>`;
        }
        
        post.innerHTML = html;
        return post;
    }

    // Create commercial post element - handles empty fields gracefully
    createCommercialPost(imageUrl, altText, description) {
        const post = document.createElement('div');
        post.className = 'blog-post';
        
        let html = `<img src="${imageUrl}" alt="${altText || 'Commercial work'}">`;
        
        // Only include description if provided
        if (description) {
            html += `<p>${description}</p>`;
        }
        
        post.innerHTML = html;
        return post;
    }

    // Show fallback content if loading fails
    showFallbackContent() {
        console.log('Showing fallback content - check your Google Sheets configuration');
        // You can add fallback content here if needed
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const contentManager = new ContentManager();
    contentManager.init();
});

// Pantalla completa para imágenes en móvil
function enableMobileImageFullscreen() {
    if (window.innerWidth > 768) return; // Solo en móvil
    document.body.addEventListener('click', function(e) {
        const img = e.target.closest('.blog-post img');
        if (!img) return;
        e.preventDefault();
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.97)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 9999;
        overlay.style.flexDirection = 'column';
        // Imagen en grande
        const fullImg = document.createElement('img');
        fullImg.src = img.src;
        fullImg.alt = img.alt;
        fullImg.style.maxWidth = '100vw';
        fullImg.style.maxHeight = '80vh';
        fullImg.style.boxShadow = '0 0 24px #0008';
        fullImg.style.borderRadius = '6px';
        overlay.appendChild(fullImg);
        // Cerrar overlay al hacer clic en cualquier parte
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        document.body.appendChild(overlay);
    });
}
document.addEventListener('DOMContentLoaded', enableMobileImageFullscreen); 