import {
  readCSV,
  writeJSON,
  removeFile,
} from "https://deno.land/x/flat@0.0.5/mod.ts";
import { parse, format } from "https://deno.land/std@0.69.0/datetime/mod.ts";

const inputFilename = Deno.args[0];
const outputFilename = inputFilename.replace(".csv", ".json");

const contents = await readCSV(inputFilename, { skipFirstRow: true });
const parsedContents = contents
  .filter((d) => d["sub_region_1"] !== "sub_region_1")
  .map((d) => ({
    date: format(parse(d["date"], "yyyyMMdd"), "MM/dd/yyyy"),
  }));

await removeFile(inputFilename);

await writeJSON(outputFilename, parsedContents);
