import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true, 
            },
            styleOverrides: {
            root: {
                transition: "none",
                boxShadow: "none",
                "&:hover": {
                backgroundColor: "#3f51b5",
                boxShadow: "none",
                },
                "&:active": {
                boxShadow: "none",
                },
            },
            },
        },
        MuiCheckbox: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    transition: "none",
                    "&:hover": {
                    backgroundColor: "initial",
                },
              },
            },
        }
    },
    palette: {
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f44336"
        },
    },
  });

export default theme