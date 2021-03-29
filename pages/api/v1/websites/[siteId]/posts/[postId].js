import db from 'db.json';

export default function handler(req, res) {
    const postId = Number(req.query.postId);
    const site = db.websites.find(site => req.query.siteId === site.id);

    if (!site) {
        res.status(404);
        res.end();
        return;
    }

    const posts = db.posts.filter(item => site.posts.includes(item.id));
    const post = posts.find(item => item.id === postId);

    if (!post) {
        res.status(404);
        res.end();
        return;
    }

    res.status(200).json(post);
    res.end();
}