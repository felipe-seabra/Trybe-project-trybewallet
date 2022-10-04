import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Tela de login', () => {
  it('Verifica se os elementos são renderizados', () => {
    renderWithRouterAndRedux(<Login />);
    const imgTittle = screen.getByRole('img', {
      name: /logo trybe wallet/i,
    });
    const inputEmail = screen.getByRole('textbox');
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(imgTittle).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('Verifica se o botão está desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(btn).toHaveProperty('disabled', true);
  });

  it('Verifica se o botão é habilitado após digitar corretamente', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByRole('textbox');
    const inputPass = screen.getByTestId('password-input');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPass, 'abc1234');

    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(btn).toHaveProperty('disabled', false);
  });

  it('Verifica se a rota é a correta', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se é redirecionado para /carteira após logar', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByRole('textbox');
    const inputPass = screen.getByTestId('password-input');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPass, 'abc1234');

    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');
  });
});
