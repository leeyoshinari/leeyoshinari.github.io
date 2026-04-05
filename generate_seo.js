const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.SITE_URL || 'http://localhost:3000';
const OUT_DIR = process.env.OUT_DIR || './'; 
const POSTS_DIR = './p';

function getHtmlFiles(dir, files_ = []) {
    if (!fs.existsSync(dir)) return files_;
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = path.join(dir, files[i]);
        if (fs.statSync(name).isDirectory()) {
            getHtmlFiles(name, files_);
        } else if (name.endsWith('.html')) {
            files_.push(name);
        }
    }
    return files_;
}

function generateSEOFiles() {
    const files = getHtmlFiles(POSTS_DIR);
    const pages = fs.existsSync('./index.html') ? ['index.html', ...files] : files;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    pages.forEach(file => {
        let urlPath = file.replace(/\\/g, '/');
        if (urlPath === 'index.html') urlPath = '';
        if (urlPath === '1.html') urlPath = '';
        
        const fullUrl = `${BASE_URL}/${urlPath}`;
        const stats = fs.statSync(file);
        const lastmod = stats.mtime.toISOString().split('T')[0];

        xml += `  <url>\n`;
        xml += `    <loc>${fullUrl}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>${urlPath === '' ? '1.0' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
    });
    xml += `</urlset>`;
    const robotsContent = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;
    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true });
    }

    const sitemapPath = path.join(OUT_DIR, 'sitemap.xml');
    const robotsPath = path.join(OUT_DIR, 'robots.txt');

    fs.writeFileSync(sitemapPath, xml);
    fs.writeFileSync(robotsPath, robotsContent);
}

generateSEOFiles();