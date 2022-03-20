import React, { useState } from "react";
import Button from "../Button";
import {
  Dialog,
  Trigger,
  DialogTitle,
  DialogFooter,
  Close,
  DialogContent,
  DialogDescription,
} from "../Dialog";

interface IProps {
  trigger: JSX.Element;
  title: string;
  onConfirm: () => void;
}

const ConfirmationDialog = ({ trigger, title, onConfirm }: IProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <Trigger asChild>{trigger}</Trigger>
      <DialogContent css={{ maxWidth: 480 }}>
        <DialogTitle css={{ mb: 52 }}>{title}</DialogTitle>

        <DialogDescription>
          ¿Estas seguro de realizar esta operacion?. Esta accion podria ser
          irreversible.
        </DialogDescription>
        <DialogFooter css={{ mt: 52 }}>
          <Close asChild>
            <Button variant="warning">Cancelar</Button>
          </Close>
          <Button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
