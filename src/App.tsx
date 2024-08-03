import {FC} from "react"
import AppRoutes from "./components/AppRoutes"
import "./App.css"
import store from "./features/store/store"
import { Provider } from "react-redux"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./template/template"

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <AppRoutes />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
