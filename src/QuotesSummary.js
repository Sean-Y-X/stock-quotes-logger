import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { isEmpty, map } from "lodash";

import Paper from "@material-ui/core/Paper";

export default function QuotesSummary({ summaryData }) {
  const columns = ["Stock", "Starting", "Lowest", "Highest", "Current"];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {map(columns, (column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {!isEmpty(summaryData) &&
            map(Object.keys(summaryData), (code) => (
              <TableRow key={code}>
                <TableCell component="th" scope="row">
                  {code}
                </TableCell>

                <TableCell>{summaryData[code]["starting"]}</TableCell>
                <TableCell>{summaryData[code]["lowest"]}</TableCell>
                <TableCell>{summaryData[code]["highest"]}</TableCell>
                <TableCell>{summaryData[code]["current"]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
