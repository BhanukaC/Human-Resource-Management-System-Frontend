import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import user from "../../auth";
import { useEffect } from "react";

const theme = createTheme();

export default function Login() {
  useEffect(() => {
    if (user !== null) {
      window.location = "/hr";
    }
  }, [""]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/auth/login",
        {
          username: data.get("username"),
          password: data.get("password"),
        }
      )
      .then((res) => {
        if (res.data.message === "Logged In") {
          {
            document.cookie = "access-token=" + res.data.token;
            window.location = "/hr";
          }
        } else {
          alert("Please check your username and password");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
