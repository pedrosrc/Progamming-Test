import { MdOutlineArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import styles from './backButton.module.css'

export default function BackButton(){
    return (
        <div className={styles.container_button}>
            <Link to={'/'} title='Voltar para Início'>
                <MdOutlineArrowBack />
            </Link>
        </div>
    )

}