import {getByRole, render, screen, within} from "@testing-library/react";
import store from "../../../store.ts";
import Game from "../Game.tsx"

import {Provider} from "react-redux";
import userEvent from "@testing-library/user-event";
import {expect} from "vitest";
import {createStore} from "../../../store.ts";

describe('clicker game', () => {
    it('increments score on button click', async () => {
      render(
          <Provider store={createStore()}>
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

    it('increments disables items i cannot afford', async () => {
        render(
            <Provider store={createStore()}>
                <Game />
            </Provider>
        )

        const button = screen.getByRole('button', {
            name: 'Vim',
        })

        expect(button).toBeDisabled()
    })

    it('decrements money on item buy', async () => {
        render(
            <Provider store={createStore()}>
                <Game />
            </Provider>
        )

        expect(screen.getByText(/You generated 30/)).toBeInTheDocument()

        const button = screen.getByRole('button', {
            name: 'Bash',
        })
        await userEvent.click(button)

        expect(screen.getByText(/You generated 20/)).toBeInTheDocument()
    })

    it('shows bought items', async () => {
        render(
            <Provider store={createStore()}>
                <Game />
            </Provider>
        )

        const button = screen.getByRole('button', {
            name: 'Bash',
        })
        await userEvent.click(button)

        const boughtItemsContainer = screen.getByTestId('boughtItems')
        expect(within(boughtItemsContainer).getByText(/Bash/)).toBeInTheDocument()
    })
})