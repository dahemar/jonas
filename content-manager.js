// Content Manager for Jonas Website
// Loads all content dynamically from Google Sheets
// Handles empty columns gracefully - only imageUrl is required

class ContentManager {
    constructor() {
        this.spreadsheetId = '1RTrPB8qONlXQG37mRzPJ8aanTlxLGLy3MeYpsyKnmBk'; // Actual ID
        this.apiKey = 'AIzaSyAKYKOA8prGrSMgWAifEvjLJq9lUqsULzQ'; // Actual API key
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
            case 'work-detail':
                await this.loadWorkDetail();
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
        if (path.includes('work-detail.html')) return 'work-detail';
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
        
        data.forEach((row, i) => {
            const date = this.safeGet(row, 0);
            const title = this.safeGet(row, 1);
            const description = this.safeGet(row, 2);
            const imageUrl = this.safeGet(row, 3);
            
            const post = this.createBlogPost(date, title, description, imageUrl, i);
                container.appendChild(post);
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

    // Load works table content - unified format
    async loadWorksTableContent() {
        const worksData = await this.fetchSheetData('Works!A2:F');
        const container = document.getElementById('works-table-container');
        if (!container) return;
        this.worksData = worksData.map(row => {
            const title = this.safeGet(row, 0) || 'Untitled';
            const date = this.safeGet(row, 1) || '';
            const description = this.safeGet(row, 2) || '';
            const type = this.safeGet(row, 3) || '';
            const imageUrls = this.safeGet(row, 4) || '';
            const linkUrl = this.safeGet(row, 5) || '';
            const images = imageUrls.split(',').map(url => url.trim()).filter(url => url);
            return { title, date, description, type, images, linkUrl };
        });
        // Default sort: date descending, no arrow
        this.currentSort = { col: 'date', dir: 'desc', userClicked: false };
        this.renderWorksTable(container);
    }

    renderWorksTable(container) {
        let works = [...this.worksData];
        const { col, dir, userClicked } = this.currentSort || { col: 'date', dir: 'desc', userClicked: false };
        const isMobile = window.innerWidth <= 768;
        // Sorting logic
        works.sort((a, b) => {
            if (col === 'date') {
                if (!a.date && !b.date) return 0;
                if (!a.date) return dir === 'asc' ? -1 : 1;
                if (!b.date) return dir === 'asc' ? 1 : -1;
                return dir === 'asc' ? (new Date(a.date) - new Date(b.date)) : (new Date(b.date) - new Date(a.date));
            } else {
                const av = (a[col] || '').toLowerCase();
                const bv = (b[col] || '').toLowerCase();
                if (av < bv) return dir === 'asc' ? -1 : 1;
                if (av > bv) return dir === 'asc' ? 1 : -1;
                return 0;
            }
        });
        // Table rendering
        const table = document.createElement('table');
        table.className = 'works-table';
        const thead = document.createElement('thead');
        const arrow = dir === 'asc' ? '↓' : '↑';
        thead.innerHTML = isMobile ? `
            <tr>
                <th data-col="title">title${userClicked && col==='title'?` <span class='sort-arrow'>${arrow}</span>`:''}</th>
                <th data-col="description">description${userClicked && col==='description'?` <span class='sort-arrow'>${arrow}</span>`:''}</th>
            </tr>
        ` : `
            <tr>
                <th data-col="title">title${userClicked && col==='title'?` <span class='sort-arrow'>${arrow}</span>`:''}</th>
                <th data-col="date">date${userClicked && col==='date'?` <span class='sort-arrow'>${arrow}</span>`:''}</th>
                <th data-col="description">description${userClicked && col==='description'?` <span class='sort-arrow'>${arrow}</span>`:''}</th>
                <th data-col="type">type${userClicked && col==='type'?` <span class='sort-arrow'>${arrow}</span>`:''}</th>
                <th>𓁹</th>
            </tr>
        `;
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        works.forEach((work, index) => {
            const row = document.createElement('tr');
            const linkUrl = work.linkUrl && work.linkUrl.trim();
            const isVideoLink = linkUrl && (
                linkUrl.match(/\.(mp4)$/i) ||
                linkUrl.includes('youtube.com') ||
                linkUrl.includes('youtu.be') ||
                linkUrl.includes('vimeo.com')
            );
            const useExternal = linkUrl && !isVideoLink;
            const viewUrl = useExternal ? linkUrl : `work-detail.html?row=${index}`;
            const target = useExternal ? '_blank' : '_self';

            if (isMobile) {
                let desc = work.description && work.description.trim() ? work.description.trim() : '';
                let type = work.type && work.type.trim() ? work.type.trim() : '';
                let descType = desc ? (type ? desc + ', ' + type : desc) : type;
                row.innerHTML = `
                    <td class="mobile-title">
                        <a href="${viewUrl}" target="${target}" style="display:block;width:100%;color:inherit;text-decoration:underline;">${work.title}</a>
                    </td>
                    <td>${descType}</td>
                `;
            } else {
                row.innerHTML = `
                    <td>${work.title}</td>
                    <td>${work.date}</td>
                    <td>${work.description}</td>
                    <td>${work.type}</td>
                    <td><a href="${viewUrl}" target="${target}" class="view-work">${useExternal ? 'link' : 'view'}</a></td>
                `;
            }
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        container.innerHTML = '';
        container.appendChild(table);
        // Add event listeners for view links
        // (Eliminado para móvil: los enlaces <a> ya funcionan correctamente)
        // if (isMobile) {
        //     const titleLinks = table.querySelectorAll('.mobile-title');
        //     titleLinks.forEach(link => {
        //         link.onclick = (e) => {
        //             e.preventDefault();
        //             const hasLink = link.getAttribute('data-has-link') === 'true';
        //             const linkUrl = link.getAttribute('data-link-url');
        //             const images = link.getAttribute('data-images').split('|').filter(img => img);
        //             const description = link.getAttribute('data-description');
        //             if (hasLink) {
        //                 window.open(linkUrl, '_blank');
        //             } else if (images.length > 0) {
        //                 this.showFullscreenWork(images, description);
        //             }
        //         };
        //     });
        // } else {
            this.addWorksTableEventListeners();
        // }
        // Add sorting listeners
        const ths = table.querySelectorAll('th[data-col]');
        ths.forEach(th => {
            th.style.cursor = 'pointer';
            th.onclick = () => {
                const col = th.getAttribute('data-col');
                let dir = 'asc';
                if (this.currentSort && this.currentSort.col === col) {
                    dir = this.currentSort.dir === 'asc' ? 'desc' : 'asc';
                }
                this.currentSort = { col, dir, userClicked: true };
                this.renderWorksTable(container);
            };
        });
    }

    // Create works table
    createWorksTable(container, works) {
        // For compatibility, just store and call render
        this.worksData = works;
        if (!this.currentSort) this.currentSort = { col: 'date', dir: 'desc' };
        this.renderWorksTable(container);
    }

    // Add event listeners for works table
    addWorksTableEventListeners() {
        // This function is now empty as logic is handled directly in HTML
    }

    // Show fullscreen work modal - this is now replaced by the detail page
    showFullscreenWork(images, description) {
        // This function is no longer called from the works table
        console.log("Navigating to detail page instead of showing modal.");
    }

    // NEW: Load content for the work detail page
    async loadWorkDetail() {
        const container = document.getElementById('work-detail-container');
        if (!container) return;

        try {
            const params = new URLSearchParams(window.location.search);
            const rowIndex = parseInt(params.get('row'), 10);

            if (isNaN(rowIndex)) {
                container.innerHTML = '<p>Work not found.</p>';
                return;
            }

            const worksData = await this.fetchSheetData('Works!A2:F');
            const work = worksData[rowIndex];

            if (!work) {
                container.innerHTML = '<p>Work not found.</p>';
                return;
            }

            const title = this.safeGet(work, 0);
            const date = this.safeGet(work, 1);
            const description = this.safeGet(work, 2) || '';
            const imageUrls = this.safeGet(work, 4) || '';
            const images = imageUrls.split(',').map(url => url.trim()).filter(url => url);

            let html = `
                <div class="work-detail-header">
                    <a href="works.html" class="back-button">&larr;</a>
                </div>
                <div class="work-detail-block">
                    <div class="work-detail-meta">
                        <div class="work-detail-title-small">title: ${title || ''}</div>
                        ${date ? `<div class="work-detail-date-small">date: ${date}</div>` : ''}
                        ${description ? `<div class="work-detail-description">${linkify(description)}</div>` : ''}
                    </div>
            `;

            images.forEach(resourceUrl => {
                if (resourceUrl.match(/\.(mp4)$/i)) {
                    html += `<video class="work-detail-image" controls preload="metadata" style="background:#000;">
                        <source src="${resourceUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
                } else if (resourceUrl.includes('youtube.com') || resourceUrl.includes('youtu.be')) {
                    // Si es un enlace de embed, úsalo tal cual
                    if (resourceUrl.includes('/embed/')) {
                        html += `<div class="work-detail-video-embed"><iframe width="100%" height="400" src="${resourceUrl}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
                    } else {
                        // YouTube embed robusto (incluye shorts y parámetros extra)
                        let videoId = '';
                        try {
                            let urlObj = new URL(resourceUrl);
                            if (urlObj.hostname.includes('youtu.be')) {
                                videoId = urlObj.pathname.replace('/', '');
                            } else if (urlObj.hostname.includes('youtube.com')) {
                                if (urlObj.pathname.startsWith('/shorts/')) {
                                    videoId = urlObj.pathname.split('/shorts/')[1].split(/[/?&#]/)[0];
                                } else {
                                    videoId = urlObj.searchParams.get('v');
                                }
                            }
                            if (!videoId) {
                                let match = resourceUrl.match(/[?&]v=([^&]+)/);
                                if (match) videoId = match[1];
                            }
                            if (!videoId) {
                                let match = resourceUrl.match(/shorts\/([a-zA-Z0-9_-]+)/);
                                if (match) videoId = match[1];
                            }
                            if (!videoId) {
                                let match = resourceUrl.match(/youtu.be\/([a-zA-Z0-9_-]+)/);
                                if (match) videoId = match[1];
                            }
                        } catch (e) {}
                        if (videoId) {
                            html += `<div class="work-detail-video-embed"><iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
                        } else {
                            html += `<div class="work-detail-video-embed"><a href="${resourceUrl}" target="_blank">see video on youtube</a></div>`;
                        }
                    }
                } else if (resourceUrl.includes('vimeo.com')) {
                    // Vimeo embed
                    const match = resourceUrl.match(/vimeo.com\/(\d+)/);
                    const videoId = match ? match[1] : '';
                    if (videoId) {
                        html += `<div class="work-detail-video-embed"><iframe width="100%" height="400" src="https://player.vimeo.com/video/${videoId}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
                    } else {
                        html += `<div class="work-detail-video-embed"><a href="${resourceUrl}" target="_blank">see video on vimeo</a></div>`;
                    }
                } else {
                    html += `<img src="${resourceUrl}" alt="${title || 'Work image'}" class="work-detail-image">`;
                }
            });

            html += '</div>';
            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading work detail:', error);
            container.innerHTML = '<p>Could not load work details. Please try again later.</p>';
        }
    }

    // Load music content - only project name is required
    async loadMusicContent() {
        const data = await this.fetchSheetData('Music!A2:F'); // Ahora incluye Thumbnail
        const container = document.querySelector('.music-projects');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach(row => {
            const projectName = this.safeGet(row, 0);
            const bandcampUrl = this.safeGet(row, 1);
            const soundcloudUrl = this.safeGet(row, 2);
            const ninaUrl = this.safeGet(row, 3);
            const description = this.safeGet(row, 4);
            const thumbnail = this.safeGet(row, 5);
            const project = this.createMusicProject(projectName, bandcampUrl, soundcloudUrl, ninaUrl, description, thumbnail);
            container.appendChild(project);
        });
    }

    // Create music project element - handles empty fields gracefully
    createMusicProject(name, bandcampUrl, soundcloudUrl, ninaUrl, description, thumbnail) {
        const project = document.createElement('div');
        project.className = 'music-project';

        let html = `<div class="music-project-info">`;
        html += `<h2>${name}</h2>`;
        if (description) {
            html += `<p>${linkify(description)}</p>`;
        }
        if (bandcampUrl) {
            html += `<p><a href="${bandcampUrl}" target="_blank" class="music-link">bandcamp</a></p>`;
        }
        if (soundcloudUrl) {
            html += `<p><a href="${soundcloudUrl}" target="_blank" class="music-link">soundcloud</a></p>`;
        }
        if (ninaUrl) {
            html += `<p><a href="${ninaUrl}" target="_blank" class="music-link">nina</a></p>`;
        }
        html += `</div>`;

        if (thumbnail) {
            html += `<div class="music-thumbnail-container"><img src="${thumbnail}" alt="${name} cover" class="music-thumbnail"></div>`;
        } else {
            html += `<div class="music-thumbnail-container"></div>`;
        }

        project.innerHTML = html;
        return project;
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
        
        const name = this.safeGet(data[0], 0, '');
        const email = this.safeGet(data[0], 1, '');
        const instagram = this.safeGet(data[0], 2, '');
        
        // Formatear email como mailto link
        const emailLink = email ? `<a href="mailto:${email}">${email}</a>` : '';
        // Formatear instagram como link si empieza con @
        let instaLink = '';
        if (instagram) {
            const handle = instagram.startsWith('@') ? instagram.substring(1) : instagram;
            instaLink = `<a href="https://www.instagram.com/${handle}/" target="_blank" rel="noopener noreferrer">${instagram}</a>`;
        }
        
        container.innerHTML = `
            <div class="contact-project">
                <h2>${name}</h2>
                <div class="contact-project-details">
                    <p>mail. ${emailLink}</p>
                    <p>insta. ${instaLink}</p>
                </div>
            </div>
        `;
    }

    // Load commercial content - only imageUrl is required
    async loadCommercialContent() {
        const data = await this.fetchSheetData('Commercial!A2:C');
        const container = document.getElementById('commercial-posts');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach((row, i) => {
            const imageUrl = this.safeGet(row, 0);
            const altText = this.safeGet(row, 1);
            const description = this.safeGet(row, 2);
            const post = this.createCommercialPost(imageUrl, altText, description, i);
            container.appendChild(post);
        });
    }

    // Load exhibitions content - only imageUrl is required
    async loadExhibitionsContent() {
        const data = await this.fetchSheetData('Exhibitions!A2:D');
        const container = document.getElementById('exhibitions-posts');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach((row, i) => {
            const imageUrl = this.safeGet(row, 0);
            const altText = this.safeGet(row, 1);
            const description = this.safeGet(row, 2);
            const videoUrl = this.safeGet(row, 2) || this.safeGet(row, 3); // Soporta ambos formatos
            let isVideo = false;
            let isIframe = false;
            let videoPath = imageUrl;
            if (imageUrl === '(video)' && videoUrl) {
                if (videoUrl.endsWith('.mp4')) {
                    isVideo = true;
                    videoPath = videoUrl;
                } else if (
                    videoUrl.includes('youtube.com') ||
                    videoUrl.includes('youtu.be') ||
                    videoUrl.includes('vimeo.com')
                ) {
                    isIframe = true;
                    videoPath = videoUrl;
                }
            } else if (imageUrl) {
                if (imageUrl.endsWith('.mp4')) {
                    isVideo = true;
                    videoPath = imageUrl;
                } else if (
                    imageUrl.includes('youtube.com') ||
                    imageUrl.includes('youtu.be') ||
                    imageUrl.includes('vimeo.com')
                ) {
                    isIframe = true;
                    videoPath = imageUrl;
                }
            }
            if (isVideo && videoPath) {
                const post = document.createElement('div');
                post.className = 'blog-post';
                post.innerHTML = `<video controls width="100%" style="max-width:100%;height:auto;" preload="metadata">
                    <source src="${videoPath}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
                container.appendChild(post);
            } else if (isIframe && videoPath) {
                const post = document.createElement('div');
                post.className = 'blog-post';
                post.innerHTML = `<iframe width="100%" height="315" src="${videoPath}" frameborder="0" allowfullscreen loading="lazy"></iframe>`;
                container.appendChild(post);
            } else if (imageUrl === '(link)' && videoUrl) {
                // Si es un link
                const post = document.createElement('div');
                post.className = 'blog-post';
                post.innerHTML = `<a href="${videoUrl}" target="_blank" rel="noopener noreferrer">${videoUrl}</a>`;
                container.appendChild(post);
            } else if (imageUrl && imageUrl !== '') {
                // Imagen normal
                const post = this.createImagePost(imageUrl, altText, description, i);
                container.appendChild(post);
            }
        });
    }

    // Load commissions content - only imageUrl is required
    async loadCommissionsContent() {
        const data = await this.fetchSheetData('Commissions!A2:D');
        const container = document.getElementById('commissions-posts');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach((row, i) => {
            const imageUrl = this.safeGet(row, 0);
            const altText = this.safeGet(row, 1);
            const description = this.safeGet(row, 2);
            const videoUrl = this.safeGet(row, 2) || this.safeGet(row, 3); // Soporta ambos formatos
            let isVideo = false;
            let isIframe = false;
            let videoPath = imageUrl;
            if (imageUrl === '(video)' && videoUrl) {
                if (videoUrl.endsWith('.mp4')) {
                    isVideo = true;
                    videoPath = videoUrl;
                } else if (
                    videoUrl.includes('youtube.com') ||
                    videoUrl.includes('youtu.be') ||
                    videoUrl.includes('vimeo.com')
                ) {
                    isIframe = true;
                    videoPath = videoUrl;
                }
            } else if (imageUrl) {
                if (imageUrl.endsWith('.mp4')) {
                    isVideo = true;
                    videoPath = imageUrl;
                } else if (
                    imageUrl.includes('youtube.com') ||
                    imageUrl.includes('youtu.be') ||
                    imageUrl.includes('vimeo.com')
                ) {
                    isIframe = true;
                    videoPath = imageUrl;
                }
            }
            if (isVideo && videoPath) {
                const post = document.createElement('div');
                post.className = 'blog-post';
                post.innerHTML = `<video controls width="100%" style="max-width:100%;height:auto;" preload="metadata">
                    <source src="${videoPath}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
                container.appendChild(post);
            } else if (isIframe && videoPath) {
                const post = document.createElement('div');
                post.className = 'blog-post';
                post.innerHTML = `<iframe width="100%" height="315" src="${videoPath}" frameborder="0" allowfullscreen loading="lazy"></iframe>`;
                container.appendChild(post);
            } else if (imageUrl === '(link)' && videoUrl) {
                // Si es un link
                const post = document.createElement('div');
                post.className = 'blog-post';
                post.innerHTML = `<a href="${videoUrl}" target="_blank" rel="noopener noreferrer">${videoUrl}</a>`;
                container.appendChild(post);
            } else if (imageUrl && imageUrl !== '') {
                // Imagen normal
                const post = this.createImagePost(imageUrl, altText, description, i);
                container.appendChild(post);
            }
        });
    }

    // Load section content (for works) - only imageUrl is required
    loadSectionContent(sectionId, data) {
        const container = document.getElementById(sectionId);
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach((row, i) => {
            const imageUrl = this.safeGet(row, 0);
            const altText = this.safeGet(row, 1);
            const description = this.safeGet(row, 2);
            const videoUrl = this.safeGet(row, 2) || this.safeGet(row, 3); // Soporta ambos formatos
            let isVideo = false;
            let isIframe = false;
            let videoPath = imageUrl;
            if (imageUrl === '(video)' && videoUrl) {
                if (videoUrl.endsWith('.mp4')) {
                    isVideo = true;
                    videoPath = videoUrl;
                } else if (
                    videoUrl.includes('youtube.com') ||
                    videoUrl.includes('youtu.be') ||
                    videoUrl.includes('vimeo.com')
                ) {
                    isIframe = true;
                    videoPath = videoUrl;
                }
            } else if (imageUrl) {
                if (imageUrl.endsWith('.mp4')) {
                    isVideo = true;
                    videoPath = imageUrl;
                } else if (
                    imageUrl.includes('youtube.com') ||
                    imageUrl.includes('youtu.be') ||
                    imageUrl.includes('vimeo.com')
                ) {
                    isIframe = true;
                    videoPath = imageUrl;
                }
            }
            if (isVideo && videoPath) {
                const post = document.createElement('div');
                post.className = 'blog-post';
                post.innerHTML = `<video controls width="100%" style="max-width:100%;height:auto;" preload="metadata">
                    <source src="${videoPath}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
                container.appendChild(post);
            } else if (isIframe && videoPath) {
                const post = document.createElement('div');
                post.className = 'blog-post';
                post.innerHTML = `<iframe width="100%" height="315" src="${videoPath}" frameborder="0" allowfullscreen loading="lazy"></iframe>`;
                container.appendChild(post);
            } else if (imageUrl === '(link)' && videoUrl) {
                // Si es un link
                const post = document.createElement('div');
                post.className = 'blog-post';
                post.innerHTML = `<a href="${videoUrl}" target="_blank" rel="noopener noreferrer">${videoUrl}</a>`;
                container.appendChild(post);
            } else if (imageUrl && imageUrl !== '') {
                // Imagen normal
                const post = this.createImagePost(imageUrl, altText, description, i);
                container.appendChild(post);
            }
        });
    }

    // Create blog post element - handles empty fields gracefully
    createBlogPost(date, title, description, imageUrl, index = 0) {
        const post = document.createElement('div');
        post.className = 'blog-post';
        
        let html = '';
        
        // Always include image if provided
        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = title || 'Blog post';
            img.loading = index < 3 ? 'eager' : 'lazy';
            img.addEventListener('load', () => img.classList.add('loaded'));
            html += img.outerHTML;
        }
        
        // Only include title if provided
        if (title) {
            html += `<h3>${title}</h3>`;
        }
        
        // Only include date if provided
        if (date) {
            html += `<p class="date">${date}</p>`;
        }
        
        // Store description as data attribute for fullscreen view
        if (description) {
            post.setAttribute('data-description', description);
        }
        
        post.innerHTML = html;
        return post;
    }

    // Create music project element - handles empty fields gracefully
    createMusicProject(name, bandcampUrl, soundcloudUrl, ninaUrl, description, thumbnail) {
        const project = document.createElement('div');
        project.className = 'music-project';

        let html = `<div class="music-project-info">`;
        html += `<h2>${name}</h2>`;
        if (description) {
            html += `<p>${linkify(description)}</p>`;
        }
        if (bandcampUrl) {
            html += `<p><a href="${bandcampUrl}" target="_blank" class="music-link">bandcamp</a></p>`;
        }
        if (soundcloudUrl) {
            html += `<p><a href="${soundcloudUrl}" target="_blank" class="music-link">soundcloud</a></p>`;
        }
        if (ninaUrl) {
            html += `<p><a href="${ninaUrl}" target="_blank" class="music-link">nina</a></p>`;
        }
        html += `</div>`;

        if (thumbnail) {
            html += `<div class="music-thumbnail-container"><img src="${thumbnail}" alt="${name} cover" class="music-thumbnail"></div>`;
        } else {
            html += `<div class="music-thumbnail-container"></div>`;
        }

        project.innerHTML = html;
        return project;
    }

    // Create image post element - handles empty fields gracefully
    createImagePost(imageUrl, altText, description, index = 0) {
        const post = document.createElement('div');
        post.className = 'blog-post';
        
        let html = '';
        
        // Always include image if provided
        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = altText || 'Image';
            img.loading = index < 3 ? 'eager' : 'lazy';
            img.addEventListener('load', () => img.classList.add('loaded'));
            html += img.outerHTML;
        }
        
        // Store description as data attribute for fullscreen view
        if (description) {
            post.setAttribute('data-description', description);
        }
        
        post.innerHTML = html;
        return post;
    }

    // Create commercial post element - handles empty fields gracefully
    createCommercialPost(imageUrl, altText, description, index = 0) {
        const post = document.createElement('div');
        post.className = 'blog-post';
        let html = '';
        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = altText || 'Commercial work';
            img.loading = index < 3 ? 'eager' : 'lazy';
            img.addEventListener('load', () => img.classList.add('loaded'));
            html += img.outerHTML;
        }
        // Store description as data attribute for fullscreen view
        if (description) {
            post.setAttribute('data-description', description);
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

// Pantalla completa para imágenes en móvil y escritorio
function enableImageFullscreen() {
    document.body.addEventListener('click', function(e) {
        const img = e.target.closest('.blog-post img');
        if (!img) return;
        e.preventDefault();
        
        // Buscar la descripción en el atributo data-description
        const blogPost = img.closest('.blog-post');
        const description = blogPost ? blogPost.getAttribute('data-description') || '' : '';
        
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = '#fff'; // Fondo blanco
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 9999;
        overlay.style.flexDirection = 'column';
        // Cursor X SVG
        overlay.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'><text x=\'8\' y=\'24\' font-size=\'24\'>✕</text></svg>") 16 16, pointer';
        
        // Contenedor para imagen y descripción
        const contentContainer = document.createElement('div');
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';
        contentContainer.style.alignItems = 'center';
        contentContainer.style.justifyContent = 'center';
        contentContainer.style.maxWidth = '100vw';
        contentContainer.style.maxHeight = '100vh';
        
        // Imagen en grande
        const fullImg = document.createElement('img');
        fullImg.src = img.src;
        fullImg.alt = img.alt;
        fullImg.style.maxWidth = '100vw';
        fullImg.style.maxHeight = '80vh';
        fullImg.style.boxShadow = '0 0 24px #0000'; // Sin sombra
        fullImg.style.borderRadius = '0'; // Bordes rectos
        contentContainer.appendChild(fullImg);
        
        // Pie de foto con descripción
        if (description) {
            const caption = document.createElement('div');
            caption.style.marginTop = '1rem';
            caption.style.padding = '0 2rem';
            caption.style.textAlign = 'center';
            caption.style.color = '#333';
            caption.style.fontSize = '1rem';
            caption.style.lineHeight = '1.5';
            caption.style.maxWidth = '80vw';
            caption.innerHTML = linkify(description);
            contentContainer.appendChild(caption);
        }
        
        overlay.appendChild(contentContainer);
        
        // Cerrar overlay al hacer clic en cualquier parte
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        document.body.appendChild(overlay);
    });
}

// Reemplazar la función solo-móvil por la nueva
// Pantalla completa para imágenes en móvil y escritorio
enableImageFullscreen(); 

// Add a helper function to convert URLs in text to clickable links
function linkify(text) {
    if (!text) return '';
    // Regex to match URLs (http, https, www)
    return text.replace(/(https?:\/\/[^\s]+|www\.[^\s]+)/g, function(url) {
        let href = url;
        if (!href.match(/^https?:\/\//)) {
            href = 'http://' + href;
        }
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
} 