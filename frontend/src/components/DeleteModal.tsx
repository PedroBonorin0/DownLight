import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";
import { Input } from "./Input";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemSelected: { name: string; id: string };
  deleteAction: () => void;
}

export function DeleteModal({
  title,
  description,
  open,
  onOpenChange,
  itemSelected,
  deleteAction,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-700 opacity-30" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-md -translate-x-[50%] -translate-y-[50%] rounded-md bg-white p-6 shadow-lg ">
          <Dialog.Title className="m-0 text-lg font-semibold text-gray-800">
            {title + " " + itemSelected.name}
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2 text-base leading-6 text-gray-600">
            {description}
          </Dialog.Description>
          <div className="flex flex-row gap-5">
            <Dialog.Close asChild>
              <Button text="Deletar" color="red" onClick={deleteAction} />
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button aria-label="Close" text="Cancelar" color="gray" />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
