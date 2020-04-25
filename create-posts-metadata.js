import fs from 'fs';
import { getSortedPostsData } from './lib/posts';

function main() {
    const posts = getSortedPostsData();
    fs.writeFileSync('./public/posts.json', JSON.stringify({ posts }));
}

try {
    main();
} catch (e) {
    console.error(e);
}
