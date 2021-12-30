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
}
