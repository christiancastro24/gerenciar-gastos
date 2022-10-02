import { Container } from "./styles"

export const Header = () => {

    const date = new Date()

    const day = date.getDate();
    const month = date.getMonth() + 1
    const year = date.getFullYear();

    const dateNow = `${day}/${month}/${year}`

    return (
        <Container>
            <h1>$VMONEY</h1>
            <h2>{dateNow}</h2>
        </Container>
    )
}