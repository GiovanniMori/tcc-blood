import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patrocinador",
  description: "Example dashboard app using the components.",
};

export default function Page() {
  return (
    <div>
      Patrocinio
      <Dialog>
        <DialogTrigger>Criar novo</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
