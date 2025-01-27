import { Container } from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Select } from "@chakra-ui/react"; // Importando o componente Select

export const Header = () => {
  const months = [
    { name: 'Janeiro', path: '/' },
    { name: 'Fevereiro', path: '/dashboard/February' },
    { name: 'Março', path: '/dashboard/March' },
    { name: 'Abril', path: '/dashboard/April' },
    { name: 'Maio', path: '/dashboard/May' },
    { name: 'Junho', path: '/dashboard/June' },
    { name: 'Julho', path: '/dashboard/July' },
    { name: 'Agosto', path: '/dashboard/August' },
    { name: 'Setembro', path: '/dashboard/September' },
    { name: 'Outubro', path: '/dashboard/October' },
    { name: 'Novembro', path: '/dashboard/November' },
    { name: 'Dezembro', path: '/dashboard/December' },
  ];

  const history = useHistory();
  const { pathname } = useLocation();
  const [selectedMonth, setSelectedMonth] = useState('/');

  useEffect(() => {
    setSelectedMonth(pathname);
  }, [pathname]);

  const handleMonthChange = (event) => {
    const selectedPath = event.target.value;
    setSelectedMonth(selectedPath);
    history.push(selectedPath);
  };

  const redirectToResume = () => {
    history.push('/resume');
  }

  return (
    <Container>
      <h1>$VMONEY</h1>

      <Button colorScheme="red" onClick={redirectToResume}>Resumo</Button>
      <Select
        value={selectedMonth}
        onChange={handleMonthChange}
        placeholder="Selecione um mês"
        variant="outline"
        size="lg"
        style={{ width: "250px" }}
      >
        {months.map((month) => (
          <option key={month.name} value={month.path}>
            {month.name}
          </option>
        ))}
      </Select>
    </Container>
  );
};




