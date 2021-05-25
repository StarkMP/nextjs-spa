require('dotenv').config();

const withImages = require('next-images');

module.exports = withImages({
    env: {
        API_URL: process.env.API_URL
    },
    webpack(config) {
        return config;
    }  
});