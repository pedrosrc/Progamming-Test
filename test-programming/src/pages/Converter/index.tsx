import { useState } from "react"
import styles from './converter.module.css'
import BackButton from "../../components/BackButton"

export default function Converter(){

    const [numberArabic, setNumberArabic] = useState<any>(null)
    const [numberRoman, setNumberRoman] = useState<string>('')


    const romanToArabic = (romanNumber: string): number => {
        const romanNumerals: { [key: string]: number } = {
          I: 1,
          V: 5,
          X: 10,
          L: 50,
          C: 100,
          D: 500,
          M: 1000,
        };
      
        let arabicNumber = 0;
        let prevValue = 0;
      
        for (let i = romanNumber.length - 1; i >= 0; i--) {
          const currentValue = romanNumerals[romanNumber[i]];
      
          if (currentValue >= prevValue) {
            arabicNumber += currentValue;
          } else {
            arabicNumber -= currentValue;
          }
      
          prevValue = currentValue;
        }
      
        return arabicNumber;
      };

    const convert = () => { 
        const arabic = romanToArabic(numberRoman.toUpperCase())
        if(arabic <= 0 && arabic > 3999){
            alert('Somente permitido números entre 1 e 3999')
        }else{
            setNumberArabic(arabic)
        }
        
    }


    return(
        <div className={styles.container_roman}>
            <h1>Conversor de números romanos</h1>
            <h4>Coloque o número romano que deseja para que seja convertido para número arábe</h4>
            <div className={styles.section_converter}>
                <input type="text" placeholder="Digite o número em romano" value={numberRoman} onChange={(e) => setNumberRoman(e.target.value)} />
                <button onClick={convert}>Converter</button>
            </div>
            <h3>{numberArabic}</h3>
            <BackButton/>
        </div>
    )
}