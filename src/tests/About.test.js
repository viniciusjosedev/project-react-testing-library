import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('heading', { name: /about pokédex/i })).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    ))
      .toBeInTheDocument();

    expect(screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    )).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('img', { name: /pokédex/i }).src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
