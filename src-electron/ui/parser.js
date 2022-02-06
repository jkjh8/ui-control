async function parse(args) {
  return new Promise(function (resolve, reject) {
    try {
      if (!args.bus) {
        resolve('not selected mix buses')
      }
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

export default parse
