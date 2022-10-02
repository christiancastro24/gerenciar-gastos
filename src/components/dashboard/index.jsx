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

    const [indexMetas, setI] = useState(1);


    const [metas, setMetas] = useState(JSON.parse(localStorage.getItem('entradas')) || [])
    const [metasReduce, setMetasReduce] = useState(JSON.parse(localStorage.getItem('saida')) || [])

    const clearInputs = () => {
      setCategoria('')
      setValor('')
      setTitulo('')
    }

    const sendValueEntrada = () => {
      setI(indexMetas + 1)
        setMetas([...metas,  {id: indexMetas, titulo: titulo, valor: valor, categoria: categoria, tipo: 'Entrada'}])
        localStorage.setItem("entradas", JSON.stringify(metas))
        onClose();
        clearInputs();
    }

    const sendValueSaida = () => {
      setI(indexMetas + 1)
        setMetasReduce([...metasReduce,  {id: indexMetas, titulo: titulo, valor: valor, categoria: categoria, tipo: 'Saída'}])
        localStorage.setItem("saida", JSON.stringify(metasReduce))
        onClose();
        clearInputs();
    
    }

    const removeTask = (index) => {
      setMetas(metas.filter(x => x !== index))
    }

    const removeTaskReduce = (index) => {
      setMetasReduce(metasReduce.filter(x => x !== index))
    }

    const resetarDespesas = () => {
      localStorage.clear();

      setTimeout(() => {
        window.location.reload();
      }, 1500)
    }

    useEffect(() => {
        localStorage.setItem('entradas', JSON.stringify(metas))
        localStorage.setItem('saida', JSON.stringify(metasReduce))
    }, [metas, metasReduce])


    const valueMetas = metas.length > 0 && metas.map(a => a.valor).reduce((a, b) => parseInt(a) + parseInt(b))
    const valueMetasReduce = metasReduce.length > 0 && metasReduce.map(a => a.valor).reduce((d, e) => parseInt(e) + parseInt(d))

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
        {metas.length > 0 || metasReduce.length > 0 ?
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
        {metas.length > 0 && metas.map((res, index) => (
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


          <FaTrash title="Deletar" size={30} onClick={() => removeTask(res)} style={{position: "relative", left: "3rem", top: "1rem", cursor: "pointer", color: "#000"}}/>
          
            </tr>
              </>
            
        ))}

      {metasReduce.length > 0 && metasReduce.map((res, index) => (
                <tr key={index}> 
                <td>{res.titulo}</td>
                <td>R$ {res.valor}</td>
                <td>{res.categoria}</td>
                {res.tipo === 'Entrada' ?
                <td className="entrada">{res.tipo}</td>
                :
                <td className="saida">{res.tipo}</td>
                }
                <FaTrash title="Deletar" size={30} onClick={() => removeTaskReduce(res)} style={{position: "relative", left: "3rem", top: "1rem", cursor: "pointer", color: "#000"}}/>
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
            <Button colorScheme='green' mr={5} onClick={sendValueEntrada}>Entrada</Button>
            <Button colorScheme='red' mr={5} onClick={sendValueSaida}>Saída</Button>           
            </ModalFooter>
        </ModalContent>
      </Modal>
        </Container>
    )
}