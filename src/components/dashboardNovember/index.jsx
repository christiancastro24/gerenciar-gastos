/* eslint-disable no-mixed-operators */
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Container } from "./style"
import { toast } from "react-toastify"
import { FaTrash } from "react-icons/fa"
import { motion } from 'framer-motion';

export const DashboardNovember = () => {

    const [titulo, setTitulo] = useState('')
    const [valor, setValor] = useState('')
    const [categoria, setCategoria] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [index, setIndex] = useState(1);


    const [entradasNovember, setEntradas] = useState(JSON.parse(localStorage.getItem('entradasNovember')) || [])
    const [saidasNovember, setSaidas] = useState(JSON.parse(localStorage.getItem('saidasNovember')) || [])

    const clearInputs = () => {
      setCategoria('')
      setValor('')
      setTitulo('')
    }

    const enviarValorEntrada = () => {
      setIndex(index + 1)
      setEntradas([...entradasNovember,  {id: index, titulo: titulo, valor: valor, categoria: categoria, tipo: 'Entrada'}])
        localStorage.setItem("entradasNovember", JSON.stringify(entradasNovember))
        toast.success('Transação adicionada!')
        onClose();
        clearInputs();
    }

    const enviarValorSaida = () => {
      setIndex(index + 1)
      setSaidas([...saidasNovember,  {id: index, titulo: titulo, valor: valor, categoria: categoria, tipo: 'Saída'}])
        localStorage.setItem("saidasNovember", JSON.stringify(saidasNovember))
        toast.success('Transação adicionada!')
        onClose();
        clearInputs();
    
    }

    const removeTask = (index) => {
      setEntradas(entradasNovember.filter(x => x !== index))
      toast.success('Transação Removida!')
    }

    const removeTaskReduce = (index) => {
      setSaidas(saidasNovember.filter(x => x !== index))
      toast.success('Transação Removida!')
    }

    const resetarDespesas = useCallback(() => {
      localStorage.removeItem('entradasNovember');
      localStorage.removeItem('saidasNovember');

      toast.success('Transaçãoes removidas!')

      setTimeout(() => {
        window.location.reload();
      }, 1000)
    }, [])

    useEffect(() => {
        localStorage.setItem('entradasNovember', JSON.stringify(entradasNovember))
        localStorage.setItem('saidasNovember', JSON.stringify(saidasNovember))
    }, [entradasNovember, saidasNovember])


    const valueMetas = entradasNovember.length > 0 && entradasNovember.map(a => a.valor).reduce((a, b) => parseInt(a) + parseInt(b))
    const valueMetasReduce = saidasNovember.length > 0 && saidasNovember.map(a => a.valor).reduce((d, e) => parseInt(e) + parseInt(d))

    return (
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
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
        {entradasNovember.length > 0 || saidasNovember.length > 0 ?
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
        {entradasNovember.length > 0 && entradasNovember.map((res, index) => (
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

      {saidasNovember.length > 0 && saidasNovember.map((res, index) => (
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
          </motion.div>
    )
}