import {Routes, Route} from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import Divider from '../../pages/Divider'
import Converter from '../../pages/Converter'
import LifeGame from '../../pages/LifeGame'
export default function Router(){
    return(
        <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/divisor-de-conta' element={<Divider/>} />
            <Route path='/jogo-da-vida' element={<LifeGame/>} />
            <Route path='/conversor-de-números-romanos' element={<Converter/>} />

        </Routes>
    )
}
