import { DialogClose } from "@radix-ui/react-dialog";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiCheck, BiDollar } from "react-icons/bi";
import { useMutation } from "react-query";
import { transfer } from "~/api/operations.api";
import { useAuth } from "~/hooks/authHook";
import { styled } from "~/stitches.config";
import AutoCompleteEmail from "../AutoCompleteEmail";
import Button from "../Button";
import ConfirmationDialog from "../ConfirmationDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../Dialog";
import Fieldset from "../Fieldset";
import Flex from "../Flex";
import Grid from "../Grid";
import Input from "../Input";
import InputContainer from "../InputContainer";
import InputLeftIcon from "../InputLeftIcon";
import Label from "../Label";
import NumberFormat from "../NumberFormat";
import Typography from "../Typography";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { usdFormatter } from "~/utils/usdFormatter";
import SuccessDialogDescription from "../SuccessDialogDescription";
import { Operation } from "~/types/operation.type";

const FormShema = Yup.object().shape({
  note: Yup.string().optional(),
  amount: Yup.number().min(0.1).required(),
  email: Yup.string().email().required(),
});

const StyledForm = styled(motion.form, {
  display: "flex",
  flexDirection: "column",
  gap: 20,
  maxWidth: 1000,
  mx: "auto",
});

const TransferForm = () => {
  const [successModal, setSuccessModal] = useState<Operation | null>(null);
  const [emailExist, setEmailExiste] = useState<any | null>(false);

  const { mutate, isLoading } = useMutation("transfer", transfer, {
    onSuccess: ({ data }) => {
      setSuccessModal(data);
    },
  });

  const {
    values,
    getFieldProps,
    setFieldValue,
    handleBlur,
    handleSubmit,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      amount: 0,
      note: "",
    },
    onSubmit: async (values, { setErrors }) => {
      if (!emailExist) {
        console.log("email not existe");
        setErrors({
          email: "no existe",
        });
        return;
      }

      await mutate({
        amount: values.amount,
        toUser: values.email,
        fromUser: auth.user!.email,
      });
    },

    validationSchema: FormShema,
  });

  const router = useRouter();
  const auth = useAuth();

  return (
    <StyledForm>
      <Flex direction="column">
        <Typography size={"title"} css={{ mb: 12 }}>
          Transferencias
        </Typography>
        <Typography css={{ width: "50%", mb: 52 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra
          diam tincidunt vitae nibh etiam adipiscing.{" "}
        </Typography>
      </Flex>
      <Grid columns={2} css={{ gap: 40 }}>
        <Fieldset>
          <Label required>Receptor</Label>
          <AutoCompleteEmail
            error={(errors.email && touched.email) as boolean}
            value={values.email}
            onValueChange={(value) => setFieldValue("email", value)}
            onBlur={handleBlur}
            name="email"
            setIsValidEmail={setEmailExiste}
          />
        </Fieldset>
        <Flex direction="column" css={{ gap: 20 }}>
          <Fieldset>
            <Label required>Monto</Label>
            <InputContainer
              error={(errors.amount && touched.amount) as boolean}
            >
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
                value={values.amount}
              />
            </InputContainer>
          </Fieldset>

          <Fieldset>
            <Label>Nota</Label>
            <Input as="textarea" {...getFieldProps("note")} />
          </Fieldset>

          <ConfirmationDialog
            onConfirm={handleSubmit}
            title="Transferencia de fondos"
            trigger={
              <Button loading={isLoading} disabled={isLoading}>
                Transfiere
              </Button>
            }
          />
        </Flex>
      </Grid>

      <Dialog
        open={successModal !== null}
        onOpenChange={() => setSuccessModal(null)}
      >
        <DialogContent>
          <DialogTitle>Operacion Exitosa</DialogTitle>

          <SuccessDialogDescription>
            Transferencia completada satisfactoriamente. Se ha transferido el
            monto de: <b>{usdFormatter.format(values.amount)}</b> a{" "}
            <b>{values.email}</b>.
          </SuccessDialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" onClick={() => resetForm()}>
                Volver a transferir
              </Button>
            </DialogClose>
            <Button
              onClick={() =>
                router.push("/dashboard/historial/" + successModal!.id)
              }
            >
              Ver Detalles
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StyledForm>
  );
};

export default TransferForm;
