/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { Container } from "./style";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

export const DashboardJune = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [status] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [transactions, setTransactions] = useState({
    entries: JSON.parse(localStorage.getItem("entriesJune")) || [],
    exits: JSON.parse(localStorage.getItem("exitsJune")) || [],
  });

  const [select, setSelect] = useState("Entry");

  const options = [
    { label: "Entry", value: "Entry" },
    { label: "Exit", value: "Exit" },
  ];

  const clearInputs = () => {
    setCategory("");
    setValue("");
    setTitle("");
  };

  const addTransaction = useCallback(
    (type) => {
      const id = uuid().slice(0, 5);
      const transaction = { id, title, value, category, type, status };
      setTransactions((prevState) => ({
        ...prevState,
        [type === "Entry" ? "entries" : "exits"]: [
          ...prevState[type === "Entry" ? "entries" : "exits"],
          transaction,
        ],
      }));
      toast.success("Transaction added!");
      setSelect(type === "Entry" ? "Exit" : "Entry");
      onClose();
      clearInputs();
    },
    [title, value, category, status]
  );

  const removeTransaction = (type, index) => {
    setTransactions((prevState) => {
      const updated = [...prevState[type]];
      updated.splice(index, 1);
      return { ...prevState, [type]: updated };
    });
    toast.success("Transaction removed!");
  };

  const toggleComplete = (type, transactionId) => {
    setTransactions((prevState) => {
      const updated = prevState[type].map((trans) =>
        trans.id === transactionId ? { ...trans, status: !trans.status } : trans
      );
      return { ...prevState, [type]: updated };
    });
    toast.success("Transaction status updated!");
  };

  const updateTransaction = () => {
    if (selectedTransaction) {
      const { id, type } = selectedTransaction;
      setTransactions((prevState) => {
        const updated = prevState[type].map((trans) =>
          trans.id === id ? { ...trans, title, value, category } : trans
        );
        return { ...prevState, [type]: updated };
      });
      onClose();
      clearInputs();
      toast.success("Transaction updated!");
    }
  };

  const resetTransactions = () => {
    setTransactions({ entries: [], exits: [] });
    localStorage.removeItem("entriesJune");
    localStorage.removeItem("exitsJune");
    toast.success("All transactions removed!");
    setTimeout(() => window.location.reload(), 1000);
  };

  useEffect(() => {
    localStorage.setItem("entriesJune", JSON.stringify(transactions.entries));
    localStorage.setItem("exitsJune", JSON.stringify(transactions.exits));
  }, [transactions]);

  const calculateTotal = (type) => {
    return Array.isArray(transactions[type])
      ? transactions[type].reduce(
          (total, item) => total + parseInt(item.value, 10),
          0
        )
      : 0;
  };

  const openModalToUpdate = (transaction, type) => {
    setEdit(true);
    setSelectedTransaction({ ...transaction, type });
    onOpen();
  };

  const handleAddOrUpdate = () =>
    edit ? updateTransaction() : addTransaction(select);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "auto",
          }}
        >
          <Button colorScheme="purple" onClick={onOpen}>
            Nova Transação
          </Button>
          <Button colorScheme="red" onClick={resetTransactions}>
            Resetar
          </Button>
        </div>

        <div className="container-boxes">
          <div className="entrada">
            <h3>Entradas</h3>
            <strong>R$ {calculateTotal("entries") || 0}</strong>
          </div>
          <div className="saida">
            <h3>Saídas</h3>
            <strong>R$ {calculateTotal("exits") || 0}</strong>
          </div>
          <div className="total">
            <h3>Total</h3>
            <strong>
              R$ {calculateTotal("entries") - calculateTotal("exits") || 0}
            </strong>
          </div>
        </div>

        {transactions.entries.length > 0 || transactions.exits.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Value</th>
                <th>Category</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#DDD" }}>
              {["entries", "exits"].map((type) =>
                transactions[type].map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{transaction.title}</td>
                    <td>R$ {transaction.value}</td>
                    <td>{transaction.category}</td>
                    <td style={{ color: type === "entries" ? "green" : "red" }}>
                      {transaction.type}
                    </td>
                    <td>
                      <FaTrash
                        title="Delete"
                        size={25}
                        onClick={() => removeTransaction(type, index)}
                        style={{ cursor: "pointer", color: "#000" }}
                      />
                      <FiEdit
                        title="Edit"
                        size={30}
                        onClick={() => openModalToUpdate(transaction, type)}
                        style={{ cursor: "pointer", color: "#fff" }}
                      />
                      <MdOutlineDownloadDone
                        title={transaction.status ? "Completed" : "Complete"}
                        size={30}
                        onClick={() => toggleComplete(type, transaction.id)}
                        style={{
                          cursor: "pointer",
                          color: transaction.status ? "green" : "#fff",
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : null}

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {edit ? "Editar Registro" : "Registrar Entrada/Saída"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Título</FormLabel>
                <Input
                  bg="#f2f2f2"
                  borderColor="gray"
                  ref={initialRef}
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Valor</FormLabel>
                <Input
                  bg="#f2f2f2"
                  borderColor="gray"
                  placeholder="Ex: 5000"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Categoria</FormLabel>
                <Input
                  bg="#f2f2f2"
                  borderColor="gray"
                  placeholder="Categoria"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormControl>
              {!edit && (
                <FormControl mt={4}>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    bg="#f2f2f2"
                    borderColor="gray"
                    value={select}
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    {options.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" onClick={handleAddOrUpdate}>
                {edit ? "Atualizar" : "Registrar"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </motion.div>
  );
};
