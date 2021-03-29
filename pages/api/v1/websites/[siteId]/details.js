import db from 'db.json';

export default function handler(req, res) {
    const details = db.websites.find(site => site.id === req.query.siteId);

    if (!details) {
        res.status(404);
        res.end();
        return;
    }

    res.status(200).json(details);
    res.end();
}