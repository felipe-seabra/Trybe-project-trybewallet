import React from 'react';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Tela de Wallet', () => {
  it('Verifica se a imagem é renderizada no header', () => {
    renderWithRouterAndRedux(<Wallet />);
    const imaTitle = screen.getByRole('img', {
      name: /logo trybe wallet/i,
    });

    expect(imaTitle).toBeInTheDocument();
  });

  it('Verifica se o total aparece', () => {
    renderWithRouterAndRedux(<Wallet />);
    const total = screen.getByText(/total de despesas:/i);

    expect(total).toBeInTheDocument();
  });

  it('Verifica se o botão "Adicionar despesa" é renderizado', () => {
    renderWithRouterAndRedux(<Wallet />);
    const btn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(btn).toBeInTheDocument();
  });

  it('Verifica se a tabela é renderizada', () => {
    renderWithRouterAndRedux(<Wallet />);
    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  });

  it('Verifica se a API é chamada', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });

    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
