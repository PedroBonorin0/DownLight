import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";

interface Props {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deleteAction: () => void;
}

export function DeleteModal({
  title,
  description,
  open,
  onOpenChange,
  deleteAction,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-700 opacity-30" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-md -translate-x-[50%] -translate-y-[50%] rounded-md bg-white p-6 shadow-lg ">
          <Dialog.Title className="m-0 text-xl font-semibold text-gray-800">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2 text-base leading-6 text-gray-600">
            {description}
          </Dialog.Description>
          <div className="flex w-full gap-5">
            <Dialog.Close asChild>
              <Button text="Deletar" color="red" onClick={deleteAction} className="w-full" />
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button aria-label="Close" text="Cancelar" color="gray" className="w-full" />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
