import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    expect(screen.getByRole('heading', { name: /pikachu details/i }).innerHTML).toEqual('Pikachu Details');
    expect(screen.findByRole('link', { name: /more details/i }).innerHTML).toBeUndefined();
    expect(screen.getByRole('heading', { name: /summary/i }).innerHTML).toEqual('Summary');
    expect(screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    ).innerHTML).toEqual('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    expect(screen.getByRole('heading', { name: /game locations of pikachu/i }).innerHTML).toEqual('Game Locations of Pikachu');
    expect(screen.getAllByRole('img', { name: /Pikachu location/i })[0].alt).toEqual('Pikachu location');
    expect(screen.getAllByRole('img', { name: /Pikachu location/i })[0].src).toEqual('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getAllByRole('img', { name: /Pikachu location/i })[1].alt).toEqual('Pikachu location');
    expect(screen.getAllByRole('img', { name: /Pikachu location/i })[1].src).toEqual('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    expect(screen.getByText(/pokémon favoritado\?/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/pokémon favoritado\?/i));

    userEvent.click(screen.getByRole('link', { name: /favorite pokémon/i }));

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
