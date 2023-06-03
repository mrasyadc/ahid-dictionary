import { userAgent, NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { lang: string };
  }
) {
  //Find the absolute path of the json directory
  const { lang } = params;

  const jsonDirectory = path.join(process.cwd(), "json");

  //Read the json data file data.json

  let fileContents;

  if (lang == "en") {
    fileContents = await fs.readFile(jsonDirectory + "/data.json", "utf8");
  } else {
    fileContents = await fs.readFile(jsonDirectory + "/data_id.json", "utf8");
  }
  //Return the content of the data file in json format

  return NextResponse.json(JSON.parse(fileContents));
}
