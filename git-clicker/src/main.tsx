import {createRoot} from 'react-dom/client'
import {useEffect} from "react";

import items from "./items.json";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {RootState} from "./store.ts";
import {buyItem, incrementScore, Item} from "./modules/game";

let rootElement = document.getElementById("root")
if (!rootElement) throw new Error('Root not found');

const root = createRoot(rootElement)

function Game() {
    const gameState = useSelector((globalState: RootState) => globalState.game);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            // Compute scoreupdate and update score once accordingly
            let scoreUpdate = 0;
            gameState.ownedItems.forEach((item) => {
                scoreUpdate += item.linesPerMilliseconds;
            });

            dispatchIncrementScore(scoreUpdate)
        }, 100);

        return () => clearInterval(interval);
    }, [gameState]);

    const dispatchBuyItem = (item: Item) => {
        dispatch(buyItem(item));
    }

    const dispatchIncrementScore = (incr = 1) => {
        dispatch(incrementScore(incr));
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
            <button onClick={() => dispatchIncrementScore()}>Code !</button>
            <div>
                {items.map((item) => (
                        <div key={item.name}>
                            {item.name} {item.price}
                            <button
                                disabled={item.price > gameState.currentScore}
                                onClick={() => dispatchBuyItem(item)}
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