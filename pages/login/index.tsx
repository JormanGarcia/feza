import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { login } from "~/api/auth.api";
import Button from "~/components/Button";
import Fieldset from "~/components/Fieldset";
import Input from "~/components/Input";
import InputContainer from "~/components/InputContainer";
import Label from "~/components/Label";
import { useAuth } from "~/hooks/authHook";
import * as Yup from "yup";
import { styled } from "~/stitches.config";
import Link from "next/link";
import InputRightIcon from "~/components/InputRightIcon";
import { BiHide, BiShow } from "react-icons/bi";
import Typography from "~/components/Typography";
import { useToast } from "~/stores/toastStore";

const formSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const LoginContainer = styled("div", {
  maxWidth: 500,
  mx: "auto",
  mt: 100,

  "@lg": {
    mr: 200,
  },
});

const StyledForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: 32,
});

const FormFooter = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mt: 40,
});

const LoginLink = styled("a", {
  color: "$main500",
  textDecoration: "underline",
  cursor: "pointer",
  "&:hover": {
    color: "$main700",
  },
});

const Login = () => {
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate, data, isLoading } = useMutation("login", login, {
    onSuccess: ({ data: { data } }) => {
      auth.login(data);
      router.push("/dashboard");
    },

    onError: () => {
      toast.openDefault("unexpected");
    },
  });

  const { handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await mutate({
        email: values.email.toLowerCase(),
        password: values.password,
      });

      console.log(data);
    },

    validationSchema: formSchema,
  });
  return (
    <LoginContainer>
      <Typography size="h1" css={{ mb: 24 }}>
        ¡Bienvenido/a!
      </Typography>
      <Typography css={{ mb: 62, maxWidth: 400 }}>
        Que bueno verte de vuelta. Ingresa tus datos para iniciar sesion
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <Fieldset>
          <Label required>Correo Electronico</Label>
          <InputContainer>
            <Input
              name="email"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputContainer>
        </Fieldset>
        <Fieldset>
          <Label required>Contraseña</Label>
          <InputContainer>
            <Input
              name="password"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              type={isPasswordVisible ? "text" : "password"}
            />
            <InputRightIcon
              css={{ cursor: "pointer" }}
              as={isPasswordVisible ? BiHide : BiShow}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </InputContainer>
        </Fieldset>
        <FormFooter>
          <Link href={"/signup"}>
            <LoginLink>¿No estas registrado?</LoginLink>
          </Link>
          <Button loading={isLoading} disabled={isLoading}>
            Ingresar
          </Button>
        </FormFooter>
      </StyledForm>
    </LoginContainer>
  );
};

export default Login;
