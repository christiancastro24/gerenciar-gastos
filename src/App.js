import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from './components/header';
import { Routes } from './routes';
import { ToastContainerComp } from './components/toastify';

function App() {
  return (
    <main>
    <ChakraProvider>
      <ToastContainerComp />
      <div>
        <Header />
        <Routes />
      </div>
    </ChakraProvider>
    </main>
  );
}

export default App;
