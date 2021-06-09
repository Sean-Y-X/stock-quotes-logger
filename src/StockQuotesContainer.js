import "./StockQuoteContainer.css";

import { clone, cloneDeep, forEach } from "lodash";
import { useEffect, useRef, useState } from "react";

import PauseButton from "./PauseButton";
import QuotesLogger from "./QuotesLogger";
import QuotesSummary from "./QuotesSummary";
import StockQuoteSummary from "./model/StockQuoteSummary";
import { fetchStockQuotes } from "./api/api";
import moment from "moment";

const UPDATE_PERIOD = 2_000;
const TIME_FORMAT = "YYYY-MM-DD hh:mm:ss";

export default function StockQuotesContainer() {
  const [state, setState] = useState({
    isPaused: false,
    logData: [],
    summaryData: {},
  });

  const ref = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchData() {
    try {
      const quotes = await fetchStockQuotes();
      if (!state.isPaused) addLog(quotes);
      updateSummaryData(quotes);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    ref.current = fetchData;
  }, [fetchData]);

  useEffect(() => {
    let interval = setInterval(() => {
      ref.current();
    }, UPDATE_PERIOD);
    return () => clearInterval(interval);
  }, []);

  function togglePauseState() {
    setState((_state) => ({ ..._state, isPaused: !state.isPaused }));
  }

  function addLog(quotes) {
    const logData = clone(state.logData);
    const time = moment().format(TIME_FORMAT);
    logData.unshift({ time: time, quotes: quotes });
    setState((_state) => ({ ..._state, logData: logData }));
  }

  function updateSummaryData(quotes) {
    const summaryData = cloneDeep(state.summaryData);

    forEach(quotes, (quote) => {
      const existingSummary = summaryData[quote.code];

      if (existingSummary) {
        summaryData[quote.code].addCurrentQuote(quote.price);
      } else {
        summaryData[quote.code] = new StockQuoteSummary(quote.price);
      }
    });

    setState((_state) => ({ ..._state, summaryData: summaryData }));
  }

  return (
    <div className="container">
      <div className="half">
        <h1 className="title">
          <div>Log</div>
          <PauseButton
            id="pause-button"
            isPaused={state.isPaused}
            togglePause={togglePauseState}
          />
        </h1>
        <QuotesLogger
          style={{ width: "100%" }}
          id="quotes-logger"
          logData={state.logData}
        />
      </div>
      <div className="half">
        <h1>Summary</h1>
        <QuotesSummary summaryData={state.summaryData} />
      </div>
    </div>
  );
}
