/** @type {import('next').NextConfig} */
const {i18n} = require("./next-i18next.config")

module.exports = {
    i18n,
    eslint: {
        dirs: ["src"],
    },
    reactStrictMode: true,
    images: {
        domains: [
            "source.unsplash.com",
            "images.unsplash.com",
            "c.stocksy.com",
            "firebasestorage.googleapis.com",
            "cdn.sanity.io"
        ],
    },
}
