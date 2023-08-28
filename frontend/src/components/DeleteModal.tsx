import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog"
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
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter >
          <Button variant={"red"} onClick={deleteAction} className="w-full" >Deletar</Button>
          <Button aria-label="Close" variant={"gray"} className="w-full" onClick={() => onOpenChange(false)} >Cancelar</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
