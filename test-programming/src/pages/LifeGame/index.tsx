import { useState, useRef, useCallback } from 'react';
import { produce } from 'immer';
import BackButton from '../../components/BackButton';
import styles from './lifegame.module.css'

const cols = 70;
const rows = 30;

const positions = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
]

function generateEmptyGrid() {
    const Numrows = [];
    for (let i = 0; i < rows; i++) {
        Numrows.push(Array.from(Array(cols), () => 0))
    }
    return Numrows;
}

export default function LifeGame() {

    const [grid, setGrid] = useState<any>(() => {
        return generateEmptyGrid()
    })

    const [start, setStart] = useState<boolean>(false);
    const [color, setColor] = useState<string>('#fff');

    const startRef = useRef(start);
    startRef.current = start


    const runSimulation = useCallback(() => {
        if (!startRef.current) {
            return;
        }
        setGrid((g: any) => {
            return produce(g, (gridCopy: any) => {
                for (let i = 0; i < rows; i++) {
                    for (let k = 0; k < cols; k++) {
                        let neighbors = 0;
                        positions.forEach(([x, y]) => {
                            const newI = i + x
                            const newK = k + y

                            if (newI >= 0 && newI < rows && newK >= 0 && newK < cols) {
                                neighbors += g[newI][newK]
                            }
                        })

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0;
                        }
                        else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1;
                        }
                    }
                }
            })
        })
        setTimeout(runSimulation, 100)
    }, []);

    function handleStartGame() {
        setStart(!start);
        if (!start) {
            startRef.current = true
            runSimulation()
        }
    }

    const randomGrid = () => {
        const grid = []
        for (let i = 0; i < rows; i++) {
            const row = []
            for (let j = 0; j < cols; j++) {
                row.push(Math.floor(Math.random() * 2))
            }
            grid.push(row)
        }
        return grid;
    }

    function handleNodeClick(i: any, k: any) {
        const newGrid = produce(grid, (gridCopy: any) => {
            gridCopy[i][k] = !grid[i][k]
            setColor('purple')
        })
        setGrid(newGrid)
    }

    return (
        <div className={styles.container_lifegame}>
            <h1>Jogo da vida</h1>
            <h3>As regras do jogo são as seguintes:</h3>
            <ul>
                <li> 1-Qualquer espaço vazio com exatamente três vizinhos vivos se torna uma célula viva.</li>
                <li>2-Qualquer célula viva com menos de dois vizinhos vivos morre de solidão.</li>
                <li>3-Qualquer célula viva com mais de três vizinhos vivos morre de superpopulação.</li>
                <li>4-Qualquer célula viva com dois ou três vizinhos vivos continua viva para a próxima geração.</li>
            </ul>
            <div className={styles.section_buttons}>
                <button onClick={handleStartGame}>{start ? 'Parar' : 'Iniciar'}</button>
                <button onClick={() => setGrid(generateEmptyGrid())}>Reiniciar</button>
                <button onClick={() => setGrid(randomGrid())}>Aleatorio</button>
            </div>
        
            <div className={styles.section_lifegame} style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 20px)`
        }} >
                {grid.map((Numrows: any, i: any) =>
                    Numrows.map((_:any,k: any) =>
                        <div key={`${i}-${k}`}
                            onClick={() => handleNodeClick(i, k)}
                            style={{
                                width: 20,
                                height: 20,
                                border: "1px solid black",
                                backgroundColor: grid[i][k] ? color : undefined,
                                cursor: 'pointer'
                            }}
                        />
                    )
                )}

            </div>
            <BackButton/>
        </div >
    )
}