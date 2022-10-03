import { Container, ContainerMonth } from "./styles"
import { useHistory, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

export const Header = () => {

    
    const history = useHistory();
    const { pathname } = useLocation();

    const [locationInfoOctober, SetLocationInfoOctober] = useState(false);
    const [locationInfoNovember, SetLocationInfoNovember] = useState(false);
    const [locationInfoDecember, SetLocationInfoDecember] = useState(false);


    useEffect(() => {
        if (pathname === '/') {
            SetLocationInfoOctober(true)
            SetLocationInfoNovember(false)
            SetLocationInfoDecember(false)

        } 
        
       else  if (pathname === '/dashboardNovember') {
            SetLocationInfoNovember(true)
            SetLocationInfoOctober(false)
            SetLocationInfoDecember(false)

        }
        
       else  if (pathname === '/dashboardDecember') {
            SetLocationInfoDecember(true)
            SetLocationInfoNovember(false)
            SetLocationInfoOctober(false)
        }
        
    }, [pathname])
    

    return (
        <Container>
            <h1>$VMONEY</h1>
            <ContainerMonth>

        {locationInfoOctober ?
        <div>
            <p className="active" onClick={() => history.push('/')}>Outubro</p>
        </div>
        :
        <div>
            <p className="disabled" onClick={() => history.push('/')}>Outubro</p>
        </div>
        }

    {locationInfoNovember ?
        <div>
            <p className="active" onClick={() => history.push('/dashboardNovember')}>Novembro</p>
        </div>
        :
        <div>
            <p className="disabled" onClick={() => history.push('/dashboardNovember')}>Novembro</p>
        </div>
        }


    {locationInfoDecember ?
        <div>
            <p className="active" onClick={() => history.push('/dashboardDecember')}>Dezembro</p>
        </div>
        :
        <div>
            <p className="disabled" onClick={() => history.push('/dashboardDecember')}>Dezembro</p>
        </div>
        }

        </ContainerMonth>
        </Container>
    )
}

