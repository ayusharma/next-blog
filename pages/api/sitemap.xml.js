import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';
import fetch from 'node-fetch';

const postsURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://learningjs.dev';

export default async (req, res) => {
    if (!res) return {};
    try {
        // Set response header
        res.setHeader('content-type', 'application/xml');
        res.setHeader('Content-Encoding', 'gzip');

        // A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
        // The readable stream it transforms must be in object mode.
        const smStream = new SitemapStream({
            hostname: 'https://learningjs.dev',
        });

        const pipeline = smStream.pipe(createGzip());
        // Add any static entries here
        smStream.write({
            url: '/',
            lastmod: process.env.siteUpdatedAt,
            changefreq: EnumChangefreq.WEEKLY,
        });

        // E.g. we create a sitemap.xml for articles
        // Set articles change frequency is weekly
        const articles = await fetchPosts();
        articles.posts.map((article) => {
            smStream.write({
                url: `/posts/${article.id}`,
                lastmod: article.lastModified,
                changefreq: EnumChangefreq.WEEKLY,
            });
        });
        smStream.end();

        // cache the response
        // streamToPromise.then(sm => sitemap = sm)
        streamToPromise(pipeline);
        // stream the response
        pipeline.pipe(res).on('error', (e) => {
            throw e;
        });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
};

async function fetchPosts() {
    try {
        const response = await fetch(`${postsURL}/posts.json`);
        const posts = await response.json();
        if (response.ok) {
            return posts;
        }
        return [];
    } catch (e) {
        console.error('Unable to fetch posts', e);
    }
}
