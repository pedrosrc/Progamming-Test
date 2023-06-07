import styles from './dashboard.module.css'
import {Link} from 'react-router-dom'
export default function Dashboard(){
    return(
        <div className={styles.container_home}>
            <h1>Olá, seja bem-vindo</h1>
            <h3>Selecione a tarefa que deseja visualizar!</h3>
            <div className={styles.section_links}>
                <Link to='/conversor-de-números-romanos'>Tarefa 1: Conversor de números romanos</Link>
                <Link to='/jogo-da-vida'>Tarefa 2: Jogo da vida</Link>
                <Link to='/divisor-de-conta'>Tarefa 3: Divisor de conta de restaurante</Link>

            </div>
            <footer>Created by <a href="https://www.linkedin.com/in/pedroleodev/" target='_blank'>Pedro Leonardo</a> </footer>
        </div>
    )
}