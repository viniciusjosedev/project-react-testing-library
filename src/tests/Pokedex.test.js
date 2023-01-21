import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  const pokemonName = 'pokemon-name';
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
    // renderWithRouter(<Pokedex pokemonList={ pokemonList } isPokemonFavoriteById={ [] } />);
		renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: /encountered pokémon/i })).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    pokemonList.forEach(async (elemento) => {
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
      expect(await screen.findByText(elemento.name).innerText)
        .toEqual(screen.getByTestId(pokemonName).innerText);
    });
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por ve', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro:', async () => {
    renderWithRouter(<App />);

    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(7);

    const eletric = screen.getByRole('button', { name: /electric/i });
    const fire = screen.getByRole('button', { name: /fire/i });
    const bug = screen.getByRole('button', { name: /bug/i });
    const poison = screen.getByRole('button', { name: /poison/i });
    const psychic = screen.getByRole('button', { name: /psychic/i });
    const normal = screen.getByRole('button', { name: /normal/i });
    const dragon = screen.getByRole('button', { name: /dragon/i });

    const eletricFilter = pokemonList.filter((elemento) => elemento.type === 'Electric');
    const fireFilter = pokemonList.filter((elemento) => elemento.type === 'Fire');
    const bugFilter = pokemonList.filter((elemento) => elemento.type === 'Bug');
    const poisonFilter = pokemonList.filter((elemento) => elemento.type === 'Poison');
    const psychicFilter = pokemonList.filter((elemento) => elemento.type === 'Psychic');
    const normalFilter = pokemonList.filter((elemento) => elemento.type === 'Normal');
    const dragonFilter = pokemonList.filter((elemento) => elemento.type === 'Dragon');

    userEvent.click(eletric);
    eletricFilter.forEach((elemento) => {
      expect(screen.getByTestId(pokemonName).innerHTML).toBe(elemento.name);
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });

    userEvent.click(fire);
    fireFilter.forEach((elemento) => {
      expect(screen.getByTestId(pokemonName).innerHTML).toBe(elemento.name);
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });

    userEvent.click(bug);
    bugFilter.forEach((elemento) => {
      expect(screen.getByTestId(pokemonName).innerHTML).toBe(elemento.name);
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });

    userEvent.click(poison);
    poisonFilter.forEach((elemento) => {
      expect(screen.getByTestId(pokemonName).innerHTML).toBe(elemento.name);
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });

    userEvent.click(psychic);
    psychicFilter.forEach((elemento) => {
      expect(screen.getByTestId(pokemonName).innerHTML).toBe(elemento.name);
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });

    userEvent.click(normal);
    normalFilter.forEach((elemento) => {
      expect(screen.getByTestId(pokemonName).innerHTML).toBe(elemento.name);
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });

    userEvent.click(dragon);
    dragonFilter.forEach((elemento) => {
      expect(screen.getByTestId(pokemonName).innerHTML).toBe(elemento.name);
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });
});
