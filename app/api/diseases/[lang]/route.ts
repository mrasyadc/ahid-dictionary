import { promises as fs } from "node:fs";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ lang: string }>;
  }
) {
  //Find the absolute path of the json directory
  const { lang } = await params;

  const jsonDirectory = path.join(process.cwd(), "json");

  //Read the json data file data.json

  let fileContents;

  fileContents = await (lang == "en" ? fs.readFile(jsonDirectory + "/data.json", "utf8") : fs.readFile(jsonDirectory + "/data_id.json", "utf8"));
  //Return the content of the data file in json format

  return NextResponse.json(JSON.parse(fileContents));
}
