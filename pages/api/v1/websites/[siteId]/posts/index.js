import db from 'db.json';

export default function handler(req, res) {
    const site = db.websites.find(site => req.query.siteId === site.id);

    if (!site) {
        res.status(404);
        res.end();
        return;
    }

    const posts = db.posts.filter(post => site.posts.includes(post.id));

    res.status(200).json(posts);
    res.end();
}