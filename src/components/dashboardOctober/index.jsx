/* eslint-disable no-mixed-operators */
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Select } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Container } from "./style"
import { motion } from 'framer-motion';
import { FaTrash } from "react-icons/fa"
import { MdOutlineDownloadDone } from "react-icons/md"
import { FiEdit } from "react-icons/fi"
import { toast } from "react-toastify"
import { v4 as uuid } from 'uuid';

export const DashboardOctober = () => {

    const [titulo, setTitulo] = useState('')
    const [valor, setValor] = useState('')
    const [categoria, setCategoria] = useState('')
    const [status] = useState(false)

    const [id, setId] = useState({})

    const [edit, setEdit] = useState(false)

    const unique_id = uuid();
    const small_id = unique_id.slice(0,5)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [entradasOctober, setEntradas] = useState(JSON.parse(localStorage.getItem('entradasOctober')) || [])
    const [saidasOctober, setSaidas] = useState(JSON.parse(localStorage.getItem('saidasOctober')) || [])

    const [select, setSelect] = useState("Entrada")

    const options = [
      {
        label: "Entrada",
        value: "Entrada",
      },
      {
        label: "Saída",
        value: "Saída",
      },
    ]

    // Limpar INputs
    const clearInputs = () => {
      setCategoria('')
      setValor('')
      setTitulo('')
    }


    // Cadastrar transação do tipo entrada
    const enviarValorEntrada = () => {
      if(select === 'Entrada') {
        setEntradas([...entradasOctober,  {id: small_id, titulo: titulo, valor: valor, categoria: categoria, tipo: select, status: status}])
        localStorage.setItem("entradasOctober", JSON.stringify(entradasOctober))
        toast.success('Transação adicionada!')
        setSelect("Saída")
        onClose();
        clearInputs();

        if (select === "") {
          alert('Escolha o tipo da transação: entrada ou saída')
          return;
        }

      } else if (select === 'Saída') {
        setSaidas([...saidasOctober,  {id: small_id, titulo: titulo, valor: valor, categoria: categoria, tipo: select, status: status}])
        localStorage.setItem("saidasOctober", JSON.stringify(saidasOctober))
        toast.success('Transação adicionada!')
        setSelect("Entrada")
        onClose();
        clearInputs();
      }
    }

  // Remover tarefa do tipo entrada
    const removeTask = (index) => {
      setEntradas(entradasOctober.filter(x => x !== index))
      toast.success('Transação Removida!')
    }

    // Remover tarefa do tipo saída
    const removeTaskReduce = (index) => {
      setSaidas(saidasOctober.filter(x => x !== index))
      toast.success('Transação Removida!')
    }

    // Concluir tarefa do tipo entrada
    const concluirTaskEntrada = (obj) => {
      const concluirTransacao = entradasOctober.map(x => {
        if(x.id === obj.id) {
          return {...x, status: !x.status}
        }
        return x
      })
      setEntradas(concluirTransacao)
    }


    // Concluir tarefa do tipo saída
    const concluirTaskSaida = (obj) => {
      const concluirTransacao = saidasOctober.map(x => {
        if(x.id === obj.id) {
          return {...x, status: !x.status}
        }
        return x
      })
      setSaidas(concluirTransacao)
    }

    // Abrir Modal Para edição
    const openToUpdate = (index, res) => {
      onOpen(index)
      setEdit(true)
      setId(res)
    }

    // Abrir modal das transações
    const openModal = () => {
      setEdit(false)
      onOpen();
    }

    // Edição
    const updateValorEntradas = (obj) => {
      console.log(obj.tipo)
      if(obj.tipo === "Entrada") {
        const concluirTransacao = entradasOctober.map(x => {
          if(x.id === obj.id && x.tipo === "Entrada") {
            return {...x, titulo: titulo, valor: valor, categoria: categoria, tipo: x.tipo, status: status}
        } else {
          return x
        }
      })
      onClose();
      clearInputs();
      setEntradas(concluirTransacao)

      } else if(obj.tipo === "Saída"){
        const concluirTransacao = saidasOctober.map(x => {
                if(x.id === obj.id && x.tipo === "Saída") {
                  console.log('deu certo')
                  return {...x, titulo: titulo, valor: valor, categoria: categoria, tipo: x.tipo, status: status}
              } else {
                return x
              }
            })
            onClose();
            clearInputs();
            setSaidas(concluirTransacao)
          }
  }



    // Resetar todas tabelas
    const resetarDespesas = () => {
      localStorage.removeItem('entradasOctober');
      localStorage.removeItem('saidasOctober');

      toast.success('Transaçãoes removidas!')

      setTimeout(() => {
        window.location.reload();
      }, 1000)
    }

    // Atualiza o localStorage com as novas tarefas em tempo real
    useEffect(() => {
        localStorage.setItem('entradasOctober', JSON.stringify(entradasOctober))
        localStorage.setItem('saidasOctober', JSON.stringify(saidasOctober))
        console.log(edit)
    }, [entradasOctober, saidasOctober, edit])


    // Soma dos valores do tipo entrada
    const valueMetas = entradasOctober.length > 0 && entradasOctober.map(a => a.valor).reduce((a, b) => parseInt(a) + parseInt(b))
        
    // Soma dos valores do tipo saída
    const valueMetasReduce = saidasOctober.length > 0 && saidasOctober.map(a => a.valor).reduce((d, e) => parseInt(e) + parseInt(d))

    return (
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
    <Container>
      <div style={{display: "flex", justifyContent: "flex-end", marginLeft: "auto"}}>
      <Button className="btn-open" colorScheme='purple' onClick={openModal}>Nova Transação</Button>
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
        {entradasOctober.length > 0 || saidasOctober.length > 0 ?
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
        {entradasOctober.length > 0 && entradasOctober.map((res, index) => (
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
              <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}}>

          <FiEdit title="Editar" onClick={() => openToUpdate(index, res)} size={30} style={{position: "relative", left: "8.2rem", top: "-0.5rem", cursor: "pointer", color: "#fff"}} />

          { res.status === false ?
            <MdOutlineDownloadDone title="Concluir" size={30} onClick={() => concluirTaskEntrada(res)} style={{position: "relative", left: "7.2rem", top: "-0.5rem", cursor: "pointer", color: "#fff"}} />
            :
            <MdOutlineDownloadDone title="Concluída" size={30} style={{position: "relative", left: "7.2rem", top: "-0.5rem", cursor: "pointer", color: "green"}} />
          }


          
          </div>
          
            </tr>
              </>
            
        ))}

      {saidasOctober.length > 0 && saidasOctober.map((res, index) => (
        <>
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

                <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}}>

                <FiEdit title="Editar" onClick={() => openToUpdate(index, res)} size={30} style={{position: "relative", left: "8.2rem", top: "-0.5rem", cursor: "pointer", color: "#fff"}} />

                { res.status === false ?
                <MdOutlineDownloadDone title="Concluir" size={30} onClick={() => concluirTaskSaida(res)} style={{position: "relative", left: "7rem", top: "-0.5rem", cursor: "pointer", color: "#fff"}} />
                 :
                <MdOutlineDownloadDone title="Concluída" size={30} style={{position: "relative", left: "7rem", top: "-0.5rem", cursor: "pointer", color: "green"}} />
              }

          </div>
            </tr>
              </>
         
            
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
          <ModalHeader>{edit === false ? "Registar Entrada/Saída" : "Editar Registro/Saída"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

          <FormControl mt={4}>
              <FormLabel>Título</FormLabel>
              <Input bg='#f2f2f2' borderColor="gray" required ref={initialRef} placeholder='Título' type="text" value={titulo} onChange={e => setTitulo(e.target.value)}/>
            </FormControl>

        <br />
            <FormControl>
              <FormLabel>Valor</FormLabel>
              <Input bg='#f2f2f2' borderColor="gray" required placeholder='Ex: 5000' type="number" value={valor} onChange={e => setValor(e.target.value)} />
            </FormControl>

            <br />
            <FormControl>
              <FormLabel>Categoria</FormLabel>
              <Input bg='#f2f2f2' borderColor="gray" required  placeholder='Categoria' type="text" value={categoria} onChange={e => setCategoria(e.target.value)} />
            </FormControl>

            <br />

            {!edit &&
            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <Select bg='#f2f2f2' borderColor="gray" value={select} onChange={e => setSelect(e.target.value)}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
              ))}
          </Select>
            </FormControl>
            }
          </ModalBody>

        <br />
          <ModalFooter>
            {!edit && 
            <Button colorScheme='orange' mr={145} onClick={enviarValorEntrada}>Registrar</Button>
            }

            {edit &&
            <Button colorScheme='purple' style={{color: "#fff"}} mr={145} onClick={() => updateValorEntradas(id)}>Atualizar</Button>                  
            }
            </ModalFooter>
        </ModalContent>
      </Modal>
        </Container>
        </motion.div>
    )
}