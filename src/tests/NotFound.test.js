import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('heading', { name: /page requested not found/i })).toBeInTheDocument();
    expect(screen.getByRole(
      'img',
      { name: /pikachu crying because the page requested was not found/i },
    ).src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
