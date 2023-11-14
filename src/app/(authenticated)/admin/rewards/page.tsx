import { DataTable } from "./data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recompensas",
};

export default async function Page() {
  return <DataTable />;
}
