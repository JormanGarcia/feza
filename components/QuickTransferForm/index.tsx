import { useFormik, validateYupSchema } from "formik";
import React, { useState } from "react";
import Button from "../Button";
import ConfirmationDialog from "../ConfirmationDialog";
import Fieldset from "../Fieldset";
import Flex from "../Flex";
import Input from "../Input";
import Label from "../Label";
import Typography from "../Typography";
import { useMutation, useQueryClient } from "react-query";
import { transfer } from "~/api/operations.api";
import InputContainer from "../InputContainer";
import InputLeftIcon from "../InputLeftIcon";
import { BiDollar } from "react-icons/bi";
import * as Yup from "yup";
import NumberFormat from "../NumberFormat";
import { Operation } from "~/types/operation.type";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../Dialog";
import SuccessDialogDescription from "../SuccessDialogDescription";
import { usdFormatter } from "~/utils/usdFormatter";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useAuth } from "~/hooks/authHook";
import { getIssuer } from "~/utils/getIssuer";
import { useToast } from "~/stores/toastStore";

const formSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  amount: Yup.number().required().min(0.1),
});

const QuickTransferForm = ({
  refetchDashboard,
}: {
  refetchDashboard: () => void;
}) => {
  const [successModal, setSuccessModal] = useState<Operation | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const { mutate, isLoading, isSuccess } = useMutation("transfer", transfer, {
    onSuccess: async ({ data: data }) => {
      setSuccessModal(data);
      await refetchDashboard();
    },
    onError: (error: any) => {
      console.log(error.response, "error");

      if (error.response.data.err === "invalid_email") {
        return toast.open({
          description: "El correo ingresado no es valido",
          title: "Correo invalido",
          type: "error",
        });
      }

      if (error.response.data.err === "invalid_amount") {
        return toast.open({
          description: "Fondos insuficientes para realizar esta operacion",
          title: "Fondos insuficientes",
          type: "error",
        });
      }

      toast.open({
        description: "Algo ha salido mal. por favor vuelve a intentar",
        title: "Operacion Incompleta",
        type: "error",
      });
    },
  });
  const {
    handleSubmit,
    handleChange,
    resetForm,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      amount: 0,
    },
    onSubmit: async (value) => {
      if (user) {
        await mutate({
          amount: +value.amount,
          fromUser: user.email,
          toUser: value.email,
        });
      }
      if (isSuccess) {
        resetForm();
      }
    },
    validationSchema: formSchema,
  });

  return (
    <form>
      <Typography size="title" css={{ mb: 36 }}>
        Transfiere en un instante
      </Typography>

      <Flex direction="column" css={{ gap: 20, mb: 28, alignItems: "initial" }}>
        <Fieldset>
          <Label required htmlFor="email">
            Destinatario
          </Label>
          <Input
            error={(errors.email && touched.email) as boolean}
            id="email"
            autoComplete="off"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Fieldset>

        <Fieldset>
          <Label required htmlFor="amount">
            Monto
          </Label>

          <InputContainer error={(errors.amount && touched.amount) as boolean}>
            <InputLeftIcon as={BiDollar} />
            <NumberFormat
              id="amount"
              autoComplete="off"
              name="amount"
              onValueChange={(e) => setFieldValue("amount", e.floatValue)}
              onBlur={handleBlur}
              fixedDecimalScale
              min={0}
              decimalScale={2}
            />
          </InputContainer>
        </Fieldset>
      </Flex>

      <ConfirmationDialog
        onConfirm={handleSubmit}
        title="Transferencia de fondos"
        trigger={
          <Button block type="button" loading={isLoading} disabled={isLoading}>
            Transfiere
          </Button>
        }
      />

      <Dialog
        open={successModal !== null}
        onOpenChange={() => setSuccessModal(null)}
      >
        {successModal && (
          <DialogContent>
            <DialogTitle>Operacion Exitosa</DialogTitle>

            <SuccessDialogDescription>
              Transferencia completada satisfactoriamente. Se ha transferido el
              monto de: <b>{usdFormatter.format(successModal.amount)}</b> a{" "}
              <b>
                {getIssuer(successModal).firstName}{" "}
                {getIssuer(successModal).lastName}
              </b>
              .
            </SuccessDialogDescription>

            <DialogFooter>
              <Button
                onClick={() =>
                  router.push("/dashboard/historial/" + successModal!.id)
                }
              >
                Ver Detalles
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </form>
  );
};

export default QuickTransferForm;
