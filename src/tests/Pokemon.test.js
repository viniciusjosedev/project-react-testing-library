import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import pokemonList from '../data';
import App from '../App';

describe('Teste o componente /<Pokemon.js />/ ', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon:', async () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    userEvent.click(screen.getByRole('button', { name: /all/i }));

    expect(screen.getByText(/pikachu/i).innerHTML).toEqual('Pikachu');
    expect(screen.getByTestId('pokemon-type').innerHTML).toEqual('Electric');
    expect(screen.getByText(/average weight: 6\.0 kg/i).innerHTML).toEqual('Average weight: 6.0 kg');
    expect(screen.getByRole('img', { name: /pikachu sprite/i }).alt).toEqual('Pikachu sprite');
    expect(screen.getByRole('img', { name: /pikachu sprite/i }).src).toEqual('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');

    userEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de 
    navegação para exibir detalhes deste Pokémon. O link deve possuir a 
    URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;`, async () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(await screen.findByRole('link', { name: /more details/i }));

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/pokemon/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados:', async () => {
    renderWithRouter(<App />);

    userEvent.click(await screen.findByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByText(/pokémon favoritado\?/i));

    expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i }).alt).toEqual('Pikachu is marked as favorite');
    expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i }).src).toEqual('http://localhost/star-icon.svg');
  });
});
