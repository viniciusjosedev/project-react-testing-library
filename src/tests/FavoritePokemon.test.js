import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it(`Teste se é exibida na tela a mensagem No 
  favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;`, () => {
    renderWithRouter(<FavoritePokemon />);

    expect(screen.getByText(/no favorite pokémon found/i)).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados.', async () => {
    renderWithRouter(<App />);

    userEvent.click(await screen.findByRole('link', { name: /more details/i }));
    userEvent.click(await screen.findByRole('checkbox', { name: /pokémon favoritado\?/i }));
    userEvent.click(await screen.findByRole('link', { name: /favorite pokémon/i }));

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
