/* eslint-disable no-mixed-operators */
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Container } from "./style"

import { FaTrash } from "react-icons/fa"

export const Dashboard = () => {

    const [titulo, setTitulo] = useState('')
    const [valor, setValor] = useState('')
    const [categoria, setCategoria] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [index, setIndex] = useState(1);


    const [entradas, setEntradas] = useState(JSON.parse(localStorage.getItem('entradas')) || [])
    const [saidas, setSaidas] = useState(JSON.parse(localStorage.getItem('saida')) || [])

    const clearInputs = () => {
      setCategoria('')
      setValor('')
      setTitulo('')
    }

    const enviarValorEntrada = () => {
      setIndex(index + 1)
      setEntradas([...entradas,  {id: index, titulo: titulo, valor: valor, categoria: categoria, tipo: 'Entrada'}])
        localStorage.setItem("entradas", JSON.stringify(entradas))
        onClose();
        clearInputs();
    }

    const enviarValorSaida = () => {
      setIndex(index + 1)
      setSaidas([...saidas,  {id: index, titulo: titulo, valor: valor, categoria: categoria, tipo: 'Saída'}])
        localStorage.setItem("saida", JSON.stringify(saidas))
        onClose();
        clearInputs();
    
    }

    const removeTask = (index) => {
      setEntradas(entradas.filter(x => x !== index))
    }

    const removeTaskReduce = (index) => {
      setSaidas(saidas.filter(x => x !== index))
    }

    const resetarDespesas = () => {
      localStorage.clear();

      setTimeout(() => {
        window.location.reload();
      }, 1500)
    }

    useEffect(() => {
        localStorage.setItem('entradas', JSON.stringify(entradas))
        localStorage.setItem('saida', JSON.stringify(saidas))
    }, [entradas, saidas])


    const valueMetas = entradas.length > 0 && entradas.map(a => a.valor).reduce((a, b) => parseInt(a) + parseInt(b))
    const valueMetasReduce = saidas.length > 0 && saidas.map(a => a.valor).reduce((d, e) => parseInt(e) + parseInt(d))

    return (
    <Container>
      <div style={{display: "flex", justifyContent: "flex-end", marginLeft: "auto"}}>
      <Button className="btn-open" colorScheme='purple' onClick={onOpen}>Nova Transação</Button>
      <Button className="btn-open" colorScheme='red' onClick={resetarDespesas}>Resetar</Button>
      </div>

    <div className="container-boxes">
      <div className="entrada">
        <h3>Entradas </h3>
        <strong>R$ {valueMetas || 0}</strong>
      </div>

      <div className="saida">
        <h3>Saídas </h3>
        <strong>R$ {valueMetasReduce || 0}</strong>
      </div>

      <div className="total">
        <h3>Total </h3>
        <strong>R$ {valueMetas -  valueMetasReduce || 0}</strong>
      </div>
    </div>
        
        <table>
        {entradas.length > 0 || saidas.length > 0 ?
        <>
            <thead>
            <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th> </th>
             </tr>
            </thead>
        </>
        :
        ""
        }
        <tbody style={{ backgroundColor: "#DDD"}}>
        {entradas.length > 0 && entradas.map((res, index) => (
          <>
                <tr key={index}> 
                <td>{res.titulo}</td>
                <td>R$ {res.valor}</td>
                <td>{res.categoria}</td>
                {res.tipo === 'Entrada' ?
                <td style={{color: "green"}}>{res.tipo}</td>
                :
                <td style={{color: "red"}}>{res.tipo}</td>
              }


          <FaTrash title="Deletar" size={25} onClick={() => removeTask(res)} style={{position: "relative", left: "3rem", top: "1rem", cursor: "pointer", color: "#000"}}/>
          
            </tr>
              </>
            
        ))}

      {saidas.length > 0 && saidas.map((res, index) => (
                <tr key={index}> 
                <td>{res.titulo}</td>
                <td>R$ {res.valor}</td>
                <td>{res.categoria}</td>
                {res.tipo === 'Entrada' ?
                <td className="entrada">{res.tipo}</td>
                :
                <td className="saida">{res.tipo}</td>
                }
                <FaTrash title="Deletar" size={25} onClick={() => removeTaskReduce(res)} style={{position: "relative", left: "3rem", top: "1rem", cursor: "pointer", color: "#000"}}/>
            </tr>
         
            
        ))}
            </tbody>
       </table>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registar Entrada/Saída</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

          <FormControl mt={4}>
              <FormLabel>Título</FormLabel>
              <Input required ref={initialRef} placeholder='Título' type="text" value={titulo} onChange={e => setTitulo(e.target.value)}/>
            </FormControl>

        <br />
            <FormControl>
              <FormLabel>Valor</FormLabel>
              <Input required placeholder='Ex: 5000' type="number" value={valor} onChange={e => setValor(e.target.value)} />
            </FormControl>

            <br />
            <FormControl>
              <FormLabel>Categoria</FormLabel>
              <Input required  placeholder='Categoria' type="text" value={categoria} onChange={e => setCategoria(e.target.value)} />
            </FormControl>

            <br />

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={5} onClick={enviarValorEntrada}>Entrada</Button>
            <Button colorScheme='red' mr={5} onClick={enviarValorSaida}>Saída</Button>           
            </ModalFooter>
        </ModalContent>
      </Modal>
        </Container>
    )
}