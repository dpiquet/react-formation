import {createRoot} from 'react-dom/client'
import {useEffect, useState} from "react";

import items from "./items.json";
import {Provider} from "react-redux";
import store from "./store.ts";

let rootElement = document.getElementById("root")
if (!rootElement) {
    throw new Error('Root not found');
}

const root = createRoot(rootElement)

type Item = {
    name: string
    price: number,
    linesPerMilliseconds: number,
}

type GameState = {
    currentScore: number,
    ownedItems: Item[],
}

function Game() {
    // FIXME: Question: 1 game state with everything in it ? or 2 states (score and ownedItems )?
    const [gameState, setGameState] = useState({
        ownedItems: [] as Item[],
        currentScore: 20,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // Compute scoreupdate and update score once accordingly
            let scoreUpdate = 0;
            gameState.ownedItems.forEach((item) => {
                scoreUpdate += item.linesPerMilliseconds;
            });

            incrementScore(scoreUpdate)
        }, 100);

        return () => clearInterval(interval);
    }, [gameState]);

    const buyItem = (item: Item) => {
        if (item.price > gameState.currentScore) return;

        setGameState((gameState: GameState): GameState => {
            return {
                ...gameState,
                currentScore: gameState.currentScore - item.price,
                ownedItems: [
                    ...gameState.ownedItems,
                    item
                ],
            }
        });
    }

    const incrementScore = (incr = 1) => {
        setGameState((state) => {
            return {
                ...state,
                currentScore: state.currentScore + incr,
            }
        })
    }

    return (
        <div>
            <div>
                <h2>You generated {Math.round(gameState.currentScore)} lines of code</h2>
            </div>
            <h3>Your items: </h3>
            <ul>
                {gameState.ownedItems.map((oi: Item, index) => (
                    <li key={index}>{oi.name}</li>
                ))}
            </ul>
            <div>

            </div>
            <button onClick={() => incrementScore()}>Code !</button>
            <div>
                {items.map((item) => (
                        <div key={item.name}>
                            {item.name} {item.price}
                            <button
                                disabled={item.price > gameState.currentScore}
                                onClick={() => buyItem(item)}
                            >
                                {item.name}
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

const element = (
    <>
        <Provider store={store}>
            <h1>Welcome to git-clicker game</h1>
            <Game></Game>
        </Provider>
    </>
);

root.render(element);