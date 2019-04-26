class LoggerFacade {
  log(message: string): void {
    console.log(message);
  }
}

export default new LoggerFacade();
