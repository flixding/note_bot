import * as React from "react";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { isEmpty, isEmail } from "../../utils/validators";
import { Image } from "../../components/Image";
import { login, signup } from "./api";

export const SignupForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    study: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [redirect, doRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (isEmpty(data.email)) {
      errors.email = "Email is required";
    } else if (!isEmail(data.email)) {
      errors.email = "Email is not valid";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    setErrors({});
    try {
      //Fetch POST request
      setLoading(true);
      console.log("start ... ", data);
      const res = await signup(
        data.email,
        data.password,
        data.username,
        data.study
      );
      console.log("res == ", res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", res.userId);
      setResponse(res);
      doRedirect(true);
    } catch (error) {
      setLoading(false);
      setResponse(error.data);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };
  return (
    <Container
      sx={{
        flexGrow: 1,
      }}
      component="form"
      onSubmit={onSubmit}
    >
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          marginTop: 4,
        }}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image width="420px" src="../signup.png" />
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            background: "rgba(165, 165, 165, 0.1)",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
            borderRadius: 2,
          }}
        >
          <Stack spacing={3} margin={2}>
            {!!response?.message && (
              <Alert severity="error">{response.message}</Alert>
            )}
            <TextField
              required
              label="User Name"
              id="outlined-required"
              value={data.username}
              name="username"
              onChange={handleChange}
              error={errors.username}
              helpertext={errors.username}
              fullWidth
              sx={{
                background: "#FEFEFE",
                border: "0.5px solid #C2C2C2",
                borderRadius: 2,
              }}
            />

            <TextField
              required
              type="email"
              label="Email"
              id="outlined-required"
              value={data.email}
              name="email"
              onChange={handleChange}
              error={errors.email}
              helpertext={errors.email}
              fullWidth
              sx={{
                background: "#FEFEFE",
                border: "0.5px solid #C2C2C2",
                borderRadius: 2,
              }}
            />

            <TextField
              required
              label="Password"
              id="outlined-required"
              value={data.password}
              name="password"
              type="password"
              onChange={handleChange}
              error={errors.password}
              helpertext={errors.password}
              fullWidth
              sx={{
                background: "#FEFEFE",
                border: "0.5px solid #C2C2C2",
                borderRadius: 2,
              }}
            />

            <TextField
              required
              label="Study Field"
              id="outlined-required"
              value={data.study}
              name="study"
              onChange={handleChange}
              error={errors.study}
              helpertext={errors.study}
              fullWidth
              sx={{
                background: "#FEFEFE",
                border: "0.5px solid #C2C2C2",
                borderRadius: 2,
              }}
            />

            <Button
              type="submit"
              disabled={loading}
              size="large"
              variant="contained"
              fullWidth
              startIcon={
                loading && <CircularProgress color="inherit" size={16} />
              }
              sx={{
                padding: 1.5,
              }}
            >
              Register
            </Button>

            <Box
              sx={{
                color: "#6FADE6",
                // border: "solid 1px #fecaca",
                marginBottom: 2,
                fontSize: 14,
                display: "flex",
                justifyContent: "center",
                padding: 1,
              }}
            >
              <Box>Already have account ? </Box>
              <Link
                to="/login"
                sx={{ color: "#6FADE6", textDecoration: "none" }}
              >
                {" "}
                Login
              </Link>
            </Box>

            {/* {(response && response["status"] === 400 || response["status"] === 401) && (
              <Box
                sx={{
                  background: "#fef2f2",
                  color: "#dc2626",
                  border: "solid 1px #fecaca",
                  marginBottom: 2,
                  fontSize: 14,
                }}
              >
                {response["error"]}
              </Box>
            )} */}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
