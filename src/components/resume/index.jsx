import { useEffect, useState } from "react";
import { Card, Container } from "./style";
import { Select } from "@chakra-ui/react";

export const Resume = () => {
  const [totals, setTotals] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("guardar");

  useEffect(() => {
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== "chakra-ui-color-mode" && key.includes("exits")) {
        const item = JSON.parse(localStorage.getItem(key));
        if (item && Array.isArray(item)) {
          allData[key] = item;
        }
      }
    }
    const accumulatedTotals = {};

    Object.entries(allData).forEach(([key, entries]) => {
      const monthMatch = key.match(/exits([a-zA-Z]+)/);
      if (monthMatch) {
        const monthInEnglish = monthMatch[1];

        const monthsMap = {
          January: "Janeiro",
          February: "Fevereiro",
          March: "Março",
          April: "Abril",
          May: "Maio",
          June: "Junho",
          July: "Julho",
          August: "Agosto",
          September: "Setembro",
          October: "Outubro",
          November: "Novembro",
          December: "Dezembro",
        };

        const month = monthsMap[monthInEnglish];

        entries.forEach((entry) => {
          if (entry.title.toLowerCase().includes(selectedFilter)) {
            const value = parseFloat(entry.value || 0);
            console.log(accumulatedTotals, "ANTES");
            if (!accumulatedTotals[month]) {
              accumulatedTotals[month] = 0;
            }
            accumulatedTotals[month] += value;
          }
        });
        setFilterOptions(entries);
      }
    });

    setTotals(accumulatedTotals);
  }, [selectedFilter]);

  const monthsOrder = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const sortedTotals = Object.entries(totals).sort((a, b) => {
    return monthsOrder.indexOf(a[0]) - monthsOrder.indexOf(b[0]);
  });

  const totalSum = sortedTotals.reduce((accumulator, current) => {
    return accumulator + current[1];
  }, 0);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setSelectedFilter(selectedFilter);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Container>
      <h1>
        Resumo de Contas de:{" "}
        <strong>
          {selectedFilter
            ? selectedFilter[0].toUpperCase() + selectedFilter.slice(1)
            : ""}
        </strong>
      </h1>

      <span>Selecione um Filtro para mais detalhes de cada gasto</span>
      <Select
        value={selectedFilter}
        onChange={handleFilterChange}
        placeholder="Selecione um Filtro"
        variant="solid"
        size="lg"
        style={{ width: "350px" }}
      >
        {filterOptions.map((month) => (
          <option key={month.id} value={month.title}>
            {month.title}
          </option>
        ))}
      </Select>

      <table>
        <thead>
          <tr>
            <th>Mês</th>
            <th>Valor Pago</th>
          </tr>
        </thead>
        <tbody>
          {sortedTotals.map(([month, total]) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{formatCurrency(total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Card>
        <h1 colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>
          Soma Total:
        </h1>
        <h2>{formatCurrency(totalSum)}</h2>
      </Card>
    </Container>
  );
};
