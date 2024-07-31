import { Box } from '@mui/material';
import { Table } from './components';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const store = setupStore();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Table />
      </Box>
    )
  }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
