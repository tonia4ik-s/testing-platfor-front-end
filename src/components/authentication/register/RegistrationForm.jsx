import React, { useEffect, useState } from "react";
// import { Form, Input, Button } from "antd";
// import { Link } from "react-router-dom";
// import { inputValidationErrorMessages } from "../../../constants/messages/inputValidationErrors";
import { IconButton, InputAdornment, Link, Stack } from "@mui/material";
import { createBrowserHistory } from "history";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {login, register} from "../../../services/authentication";
// import { errorMessage } from "../../../services/alerts";
// import { authenticationMessages } from "../../../constants/messages/authentication";
// import { generalMessages } from "../../../constants/messages/general";
// import InputRules from "../../../constants/inputRules";
import tokenService from "../../../services/tokens";
import { FormProvider, RHFCheckbox, RHFTextField } from "../../../themeComponents/hook-form";
import Iconify from "../../../themeComponents/Iconify";

function RegistrationForm() {
  const history = createBrowserHistory();

  useEffect(() => {
    tokenService.deleteTokens();
  }, []);

  const onFinish = (values) => {
    console.log(values)
    register(values, history);
  };

  // const onFinishFailed = () => {
    // errorMessage(
    //   authenticationMessages.LOGIN_BLOCKED,
    //   generalMessages.CORRECT_ALL_COMMENTS
    // );
  // };

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    userName: '',
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
        <RHFTextField name="userName" label="Username" />
        <RHFTextField name="email" label="Email address" />

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
        Register
      </LoadingButton>
    </FormProvider>
  );
}

export default RegistrationForm;
