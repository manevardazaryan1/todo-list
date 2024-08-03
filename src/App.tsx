import {FC} from 'react';
import AppRoutes from './components/AppRoutes';
import './App.css';
import store from "./features/store/store"
import { Provider } from 'react-redux';

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
