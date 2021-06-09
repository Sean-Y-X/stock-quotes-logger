export default class StockQuoteSummary {
  constructor(starting) {
    this.starting = starting;
    this.lowest = starting;
    this.highest = starting;
    this.current = starting;
  }

  addCurrentQuote(current) {
    this.current = current;
    this.highest = Math.max(this.highest, current);
    this.lowest = Math.min(this.lowest, current);
  }
}
