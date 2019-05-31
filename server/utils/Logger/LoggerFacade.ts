class LoggerFacade {
  log(message: string | object): void {
    if (typeof message === 'string') {
      console.log(message);
    } else {
      console.log(JSON.stringify(message, null, 4));
    }
  }
}

export default new LoggerFacade();
