/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    }
    // webpack: (config) => {
    //     config.infrastructureLogging = {
    //         debug: /PackFileCache/,
    //     }
    //     return config
    // },
}

module.exports = nextConfig
