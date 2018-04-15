module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'SaveTheDate',
      externals: {
        react: 'React'
      }
    }
  }
}
