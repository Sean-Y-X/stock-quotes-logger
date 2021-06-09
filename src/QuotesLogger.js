import { TextField } from "@material-ui/core";
import { map } from "lodash";

export default function QuotesLogger({ logData }) {
  const processLogData = (logData) =>
    map(logData, (log) => processLog(log)).join("\n\n");

  function processLog(log) {
    const time = `Updates for ${log.time}\n`;
    const quotes = map(
      log.quotes,
      (quote) => `${quote.code}: $${quote.price}`
    ).join("\n");
    return time + quotes;
  }

  return (
    <TextField
      id="outlined-multiline-static"
      label="Quotes"
      multiline
      fullWidth
      rows={30}
      disabled={true}
      value={processLogData(logData)}
      variant="outlined"
    />
  );
}
