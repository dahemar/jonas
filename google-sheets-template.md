# Google Sheets Template Structure

## 📊 Complete Spreadsheet Structure

Create a Google Sheet with the following structure:

### Sheet 1: "Blog"
| Date       | Title           | Description                    | Image URL                    |
|------------|-----------------|--------------------------------|------------------------------|
| 2024-01-15 | New Exhibition  | Opening night at gallery      | blog/000_IMG_2358 2.webp     |
| 2024-01-20 | Studio Work     | Working on new series         | blog/002_angelito_malice.webp |
| 2024-01-25 | Latest Project  | Recent commission work        | blog/003_K8C5735.webp        |

### Sheet 2: "Works"
| Image URL                    | Alt Text        | Description           | Category    |
|------------------------------|-----------------|----------------------|-------------|
| works/WORKS/03_210207.webp   | Studio work     | New series 2024      | WORKS       |
| works/WORKS/03_K8C5735.webp  | Portrait        | Portrait series      | WORKS       |
| works/WORKS/04_210215.webp   | Landscape       | Landscape work       | WORKS       |

### Sheet 3: "Commissions"
| Image URL                    | Alt Text        | Description           | Video URL                    |
|------------------------------|-----------------|----------------------|------------------------------|
| works/COMMISSIONS/01_iriai-verden-flag.webp | Iriai Verden | Flag project | https://www.youtube.com/embed/oyWsw_F5dBw |
| works/COMMISSIONS/02_iriai-verden-flag2.webp | Iriai Verden 2 | Second flag | https://www.youtube.com/embed/tsqOHflO9oo |
| works/COMMISSIONS/MariaSpivak_WP8.webp | Maria Spivak | Performance | https://www.youtube.com/embed/WKk5hvFGNEA |

### Sheet 4: "Exhibitions"
| Image URL                    | Alt Text        | Description           | Category     |
|------------------------------|-----------------|----------------------|--------------|
| works/EXHIBITIONS/2019_westfaelischerkunstverein_jahresgabe1_ueberschaetztespezies.webp | Westfaelischer Kunstverein | 2019 exhibition | EXHIBITIONS |
| works/EXHIBITIONS/KVHBF_2020_lunchshow_09_jonasjusten_1.webp | KVHBF 2020 | Lunch show | EXHIBITIONS |
| works/EXHIBITIONS/Kunstakademie_classofTD_2_23.webp | Kunstakademie | Class of TD | EXHIBITIONS |

### Sheet 5: "Music"
| Project Name | Bandcamp URL                    | Soundcloud URL | Nina URL | Description |
|--------------|----------------------------------|----------------|----------|-------------|
| angelito     | https://angelito17.bandcamp.com/album/malice-roadshow-starting-a-fight | https://on.soundcloud.com/ULwhgDYD9dbYHwFsQe | https://www.ninaprotocol.com/releases/angelito-malice-roadshow-starting-a-fight | New album |
| babyfloating | https://babyfloating.bandcamp.com/album/babysmoking | https://on.soundcloud.com/XdokOAao7QmTZtzJTd | https://www.ninaprotocol.com/releases/babyfloating-babysmoking?ref=joni | EP release |
| club prizren | https://clubprizren.bandcamp.com/album/club-prizren | https://on.soundcloud.com/5TynDngvW5TnY4UzwR | https://www.ninaprotocol.com/releases/club-prizren-club-prizren | Club project |

### Sheet 6: "Radio"
| Embed Code | Description |
|------------|-------------|
| `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2012490777&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>` | Latest radio shows |

### Sheet 7: "Contact"
| Name          | Email                    | Instagram |
|---------------|--------------------------|-----------|
| jonas justen  | jonas.justen@gmx.de      | @jjuusten |

### Sheet 8: "Commercial"
| Image URL                    | Alt Text        | Description |
|------------------------------|-----------------|-------------|
| commercial/00001 Elevated_Pin Twist Taurillon Soft_Guimauve_0044.webp | Elevated Pin Twist | Taurillon Soft Guimauve |
| commercial/00002 Pin Twist Taurillon Soft_Mistral_0373.webp | Pin Twist Mistral | Taurillon Soft Mistral |
| commercial/00003 Pin Twist Taurillon Soft_Vegetal_0033.webp | Pin Twist Vegetal | Taurillon Soft Vegetal |

## 🔧 Setup Steps

1. **Create the Google Sheet** with the exact structure above
2. **Share it publicly** (Anyone with link can view)
3. **Get the Spreadsheet ID** from the URL
4. **Enable Google Sheets API** and get API key
5. **Update content-manager.js** with your IDs
6. **Test the website** - content should load from Google Sheets

## 📝 Notes

- Keep the exact column headers
- Use relative paths for image URLs
- Leave empty cells if no data
- The system will automatically load content based on the current page
- Changes in Google Sheets will appear on the website after refresh 