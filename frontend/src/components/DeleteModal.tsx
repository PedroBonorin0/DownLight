import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./Dialog"
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
  // return (
  //   <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
  //     <Dialog.Portal>
  //       <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
  //       <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
  //         <Dialog.Title className="m-0 text-xl font-semibold text-gray-800">
  //           {title}
  //         </Dialog.Title>
  //         <Dialog.Description className="mb-5 mt-2 text-base leading-6 text-gray-600">
  //           {description}
  //         </Dialog.Description>
  //         <div className="flex w-full gap-5">
  //           <Dialog.Close asChild>
  //             <Button text="Deletar" color="red" onClick={deleteAction} className="w-full" />
  //           </Dialog.Close>
  //           <Dialog.Close asChild>
  //             <Button aria-label="Close" text="Cancelar" color="gray" className="w-full" />
  //           </Dialog.Close>
  //         </div>
  //       </Dialog.Content>
  //     </Dialog.Portal>
  //   </Dialog.Root>
  // );

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter >
          <Button text="Deletar" color="red" onClick={deleteAction} className="w-full" />
          <Button aria-label="Close" text="Cancelar" color="gray" className="w-full" onClick={() => onOpenChange(false)} />
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
