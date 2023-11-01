import { DataTable } from "./data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doadores",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function DemoPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="text-lg font-bold">Bem vindo de volta!</div>
        <div className="text-sm font-light">Aqui estão todos os doadores</div>
      </div>
      <DataTable />
    </div>
  );
}
