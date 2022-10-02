import './App.css';
import { Dashboard } from './components/dashboard';
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from './components/header';

function App() {
  return (
    <main>
    <ChakraProvider>
      <div>
        <Header />
        <Dashboard />
      </div>
    </ChakraProvider>
    </main>
  );
}

export default App;
