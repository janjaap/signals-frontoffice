const fileSize = (size = 0, decimals = 1, delimiter = ',') => {
  if (size) {
    const i = Math.floor(Math.log(size) / Math.log(1024))
    // eslint-disable-next-line
    // @ts-ignore
    const newSize = `${(size / 1024 ** i).toFixed(decimals) * 1}`
    return `${newSize.replace('.', delimiter)} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
  }

  return size
}

export default fileSize
