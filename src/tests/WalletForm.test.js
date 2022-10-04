import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('WalletForm', () => {
  it('Verifica se os iputs existem', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const descriptionInput = screen.getByTestId('description-input');
    const tagInput = screen.getByTestId('tag-input');
    const valueInput = screen.getByTestId('value-input');
    const methodInput = screen.getByTestId('method-input');
    const currencyInput = screen.getByTestId('currency-input');

    expect(descriptionInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();

    expect(descriptionInput).toHaveValue('');
    expect(tagInput).toHaveValue('Alimentação');
    expect(methodInput).toHaveValue('Dinheiro');
  });

  it('Verifica se é possível digitar no campo valor', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const valueInput = screen.getByTestId('value-input');

    userEvent.type(valueInput, '120');
    expect(valueInput).toHaveValue(120);
  });

  it('Verifica se o botão existe e se está desabilitado', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const adcBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(adcBtn).toBeInTheDocument();
    expect(adcBtn).toHaveProperty('disabled', true);
  });

  it('Verifica se é possível digitar no campo descrição', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const descriptionInput = screen.getByTestId('description-input');

    userEvent.type(descriptionInput, 'Teste');
    expect(descriptionInput).toHaveValue('Teste');
  });
});
