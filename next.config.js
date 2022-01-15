module.exports = {
  experimental: {
    outputStandalone: true,
  },
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
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    })

    return config
  },
}
