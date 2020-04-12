class CustomException extends Error {
  constructor(err) {
    super(err)
    this.status = err.status
    this.code = err.code
    this.msg = err.msg
  }
}

module.exports = CustomException
