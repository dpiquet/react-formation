import {getByRole, render, screen} from "@testing-library/react";
import store from "../../../store.ts";
import Game from "../Game.tsx"

import {Provider} from "react-redux";
import userEvent from "@testing-library/user-event";
import {expect} from "vitest";

describe('clicker game', () => {
    it('increments score on button click', async () => {
      render(
          <Provider store={store}>
              <Game />
          </Provider>
      )

      const button = screen.getByRole('button', {
          name: 'Code !',
      })

        expect(screen.getByText(/You generated 30/)).toBeInTheDocument()
        await userEvent.click(button)
        expect(screen.getByText(/You generated 31/)).toBeInTheDocument()
    })
})