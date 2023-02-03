import React, { useEffect, useState } from "react";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { createBrowserHistory } from "history";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../../services/authentication";
import tokenService from "../../../services/tokens";
import { FormProvider, RHFTextField } from "../../../themeComponents/hook-form";
import Iconify from "../../../themeComponents/Iconify";

function LoginForm() {
  const history = createBrowserHistory();

  useEffect(() => {
    tokenService.deleteTokens();
  }, []);

  const onFinish = (values) => {
    login(values, history);
  };

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email or username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: ''
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onFinish)}>
      <Stack width={"300pt"} spacing={3}>
        <RHFTextField name="email" label="Email or Username" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton sx={{mt: 3}} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}

export default LoginForm;
