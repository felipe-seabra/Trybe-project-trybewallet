import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste App', () => {
  it('Verifica se está na rota certa', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
});
