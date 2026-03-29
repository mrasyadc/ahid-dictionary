import { promises as fs } from "node:fs";
import path from "node:path";

import DiseaseClient from "@/app/disease/[disease_name]/DiseaseClient";

/**
 * Generates the static paths for all diseases at build time.
 * Reads the disease names from data.json to pre-render each page.
 */
export async function generateStaticParams() {
  const jsonDirectory = path.join(process.cwd(), "json");
  const fileContents = await fs.readFile(path.join(jsonDirectory, "data.json"), "utf8");
  const data = JSON.parse(fileContents);

  // Return an array of objects matching the route parameter [disease_name]
  return Object.keys(data).map((disease) => ({
    disease_name: encodeURIComponent(disease),
  }));
}

export default async function DiseasePage({
  params,
}: {
  params: Promise<{ disease_name: string }>;
}) {
  const { disease_name } = await params;
  const decodedName = decodeURIComponent(disease_name);

  const jsonDirectory = path.join(process.cwd(), "json");
  const [dataEn, dataId] = await Promise.all([
    fs.readFile(path.join(jsonDirectory, "data.json"), "utf8"),
    fs.readFile(path.join(jsonDirectory, "data_id.json"), "utf8"),
  ]);

  const initialDataEn = JSON.parse(dataEn)[decodedName];
  const initialDataId = JSON.parse(dataId)[decodedName];

  // Pass the initial data to the client component
  return (
    <DiseaseClient 
      initialDataEn={initialDataEn} 
      initialDataId={initialDataId} 
    />
  );
}
