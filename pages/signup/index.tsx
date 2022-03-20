import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiCheck, BiHide, BiShow, BiX } from "react-icons/bi";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { signup } from "~/api/auth.api";
import { getUserByEmail } from "~/api/user.api";
import Button from "~/components/Button";
import Fieldset from "~/components/Fieldset";
import Grid from "~/components/Grid";
import Input from "~/components/Input";
import InputContainer from "~/components/InputContainer";
import InputLeftIcon from "~/components/InputLeftIcon";
import InputLoader from "~/components/InputLoader";
import InputRightIcon from "~/components/InputRightIcon";
import Label from "~/components/Label";
import Typography from "~/components/Typography";
import { useDebounce } from "~/hooks/debounceHook";
import { useEmailAvailable } from "~/hooks/emailAvailableHook";
import { styled } from "~/stitches.config";
import { useToast } from "~/stores/toastStore";

const formSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
  passwordValidation: Yup.string().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phoneNumber: Yup.number().required(),
});

const SignupContainer = styled("div", {
  maxWidth: 600,
  mx: "auto",
  mt: 60,
  mb: 40,

  "@lg": {
    mr: 200,
  },
});

const StyledForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: 28,
});

const FormFooter = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mt: 40,
});

const StyledLink = styled("a", {
  color: "$main500",
  textDecoration: "underline",
  cursor: "pointer",
  "&:hover": {
    color: "$main700",
  },
});

const Signup = () => {
  const toast = useToast();
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValidationVisible, setPasswordValidationVisible] =
    useState(false);

  const { mutate, isLoading } = useMutation("signup", signup, {
    onError: () => {
      toast.openDefault("unexpected");
    },
    onSuccess: () => {
      toast.open({
        description: "Usuario registrado satisfactoriamente",
        title: "Registro completo",
        type: "success",
      });

      router.push("/login");
    },
  });

  const { getFieldProps, values, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordValidation: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      birthday: "",
    },

    onSubmit: (
      { birthday, passwordValidation, ...values },
      { setFieldError }
    ) => {
      if (values.password !== passwordValidation) {
        setFieldError("passwordValidation", "Las contraseñas no coinciden");
        return;
      }

      mutate(values);
    },
    validationSchema: formSchema,
  });

  const email = useEmailAvailable(values.email, errors.email !== undefined);

  return (
    <SignupContainer>
      <Typography size="h1" css={{ mb: 24 }}>
        ¡Unete a nosotros!
      </Typography>
      <Typography css={{ mb: 68 }}>
        Se parte de nuestra comunidad, cambia tus divisas y transfiere al
        extranjero de la forma mas segura.
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <Typography size="title" css={{ mb: 12 }}>
          Informacion personal
        </Typography>
        <Grid columns={2} css={{ gap: 18, width: "100%" }}>
          <Fieldset>
            <Label required>Nombre</Label>
            <Input
              {...getFieldProps("firstName")}
              error={(errors.firstName && touched.firstName) as boolean}
            />
          </Fieldset>

          <Fieldset>
            <Label required>Apellido</Label>
            <Input
              {...getFieldProps("lastName")}
              error={(errors.lastName && touched.lastName) as boolean}
            />
          </Fieldset>
        </Grid>
        <Fieldset>
          <Label required>Numero de Telefono</Label>
          <Input
            {...getFieldProps("phoneNumber")}
            error={(errors.phoneNumber && touched.phoneNumber) as boolean}
          />
        </Fieldset>

        <Fieldset css={{ mb: 40 }}>
          <Label required>Fecha de nacimiento</Label>
          <Input
            {...getFieldProps("birthday")}
            type="date"
            error={Boolean(errors.birthday && touched.birthday)}
          />
        </Fieldset>

        <Typography size="title" css={{ mb: 12 }}>
          Datos de accesso
        </Typography>

        <Fieldset>
          <Label required>Email</Label>
          <InputContainer error={Boolean(errors.email && touched.email)}>
            <Input {...getFieldProps("email")} />
            {email.isLoading && <InputLoader />}
            {email.isEmailAvailable !== null && !email.isLoading && (
              <InputRightIcon
                as={!email.isEmailAvailable ? BiX : BiCheck}
                css={{
                  color: email.isEmailAvailable ? "$green500" : "$red500",
                  fontSize: 30,
                }}
              />
            )}
          </InputContainer>
        </Fieldset>

        <Grid columns={2} css={{ gap: 18 }}>
          <Fieldset>
            <Label required>Contraseña</Label>
            <InputContainer
              error={Boolean(errors.password && touched.password)}
            >
              <Input
                {...getFieldProps("password")}
                error={(errors.password && touched.password) as boolean}
                type={!passwordVisible ? "password" : "text"}
              />
              <InputRightIcon
                css={{ cursor: "pointer" }}
                as={passwordVisible ? BiHide : BiShow}
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            </InputContainer>
          </Fieldset>

          <Fieldset>
            <Label required>Repite tu contraseña</Label>
            <InputContainer
              error={Boolean(
                errors.passwordValidation && touched.passwordValidation
              )}
            >
              <Input
                {...getFieldProps("passwordValidation")}
                error={
                  (errors.passwordValidation &&
                    touched.passwordValidation) as boolean
                }
                type={!passwordValidationVisible ? "password" : "text"}
              />
              <InputRightIcon
                css={{ cursor: "pointer" }}
                as={passwordValidationVisible ? BiHide : BiShow}
                onClick={() =>
                  setPasswordValidationVisible(!passwordValidationVisible)
                }
              />
            </InputContainer>
          </Fieldset>
        </Grid>

        <FormFooter>
          <Link href={"/login"}>
            <StyledLink>¿Ya tienes una cuenta?</StyledLink>
          </Link>
          <Button loading={isLoading} disabled={isLoading}>
            Registrate
          </Button>
        </FormFooter>
      </StyledForm>
    </SignupContainer>
  );
};

export default Signup;
