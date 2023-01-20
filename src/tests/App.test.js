import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole('link');

    expect(links[0].innerHTML).toEqual('Home');
    expect(links[1].innerHTML).toEqual('About');
    expect(links[2].innerHTML).toEqual('Favorite Pokémon');
  });

  it(`Teste se a aplicação é redirecionada para a 
    página inicial, na URL / ao clicar no link Home da barra de navegação;`, () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /Home/i }));

    expect(pathname).toEqual('/');
  });

  it(`Teste se a aplicação é redirecionada para a página
    de About, na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /About/i }));
    const { location: { pathname } } = history;
    expect(pathname).toEqual('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de 
    Pokémon Favoritados, na URL /favorites, ao clicar no 
    link Favorite Pokémon da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémon/i }));
    const { location: { pathname } } = history;
    expect(pathname).toEqual('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a 
    página Not Found ao entrar em uma URL desconhecida.`, async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/a');

    expect(await screen.findByRole('heading', { name: /page requested not found/i })).toBeInTheDocument();
  });
});
