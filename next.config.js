module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/(incident)?',
        destination: '/incident/beschrijf',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
