import {createRoot} from 'react-dom/client'

import {Provider} from "react-redux";
import store from "./store.ts";
import Game from "./modules/game/Game.tsx";

let rootElement = document.getElementById("root")
if (!rootElement) throw new Error('Root not found');

const root = createRoot(rootElement)

const App = () => (
    <>
        <Provider store={store}>
            <h1>Welcome to git-clicker game</h1>
            <Game></Game>
        </Provider>
    </>
);

root.render(<App />);