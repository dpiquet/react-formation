import {useEffect} from "react";

import items from "./items.json";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store.ts";
import {buyItem, incrementScore, Item, loadState, saveState} from "./gameSlice.ts";


export default function Game() {
    const gameState = useSelector((globalState: RootState) => globalState.game);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            if (gameState.ownedItems.length === 0) return;

            // Compute scoreupdate and update score once accordingly
            let scoreUpdate = 0;
            gameState.ownedItems.forEach((item) => {
                scoreUpdate += item.linesPerMilliseconds;
            });

            dispatchIncrementScore(scoreUpdate)
        }, 100);

        return () => clearInterval(interval);
    }, [gameState]);

    useEffect(() => {
        dispatch(loadState())
    }, []);

    const dispatchBuyItem = (item: Item) => {
        dispatch(buyItem(item));
        dispatch(saveState())
    }

    const dispatchIncrementScore = (incr = 1) => {
        dispatch(incrementScore(incr));
        dispatch(saveState())
    }

    return (
        <div>
            <div>
                <h2>You generated {Math.round(gameState.currentScore)} lines of code</h2>
            </div>
            <h3>Your items: </h3>
            <ul data-testid="boughtItems">
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