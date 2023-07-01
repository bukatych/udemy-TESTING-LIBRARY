import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
    const user = userEvent.setup();

    const { unmount } = render(<App />);

    const vanillaInput = await screen.findByRole('spinbutton', {
        name: /vanilla/i,
    });

    const cherryCheckbox = await screen.findByRole('checkbox', {
        name: /cherries/i,
    });

    const orderBtn = await screen.findByRole('button', {
        name: /order sundae/i,
    });

    await waitFor(async () => {
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');
        await user.click(cherryCheckbox);
        await user.click(orderBtn);
    });

    const agreeTermsCheckbox = await screen.findByRole('checkbox', {
        name: /terms and conditions/i,
    });

    const confirmBtn = await screen.findByRole('button', {
        name: /confirm order/i,
    });

    const scoopsSummary = screen.getByText('Scoops', {
        exact: false,
    });

    const toppingsSummary = screen.getByText('Toppings', {
        exact: false,
    });

    expect(scoopsSummary).toHaveTextContent('4.00');
    expect(toppingsSummary).toHaveTextContent('1.50');

    await waitFor(async () => {
        await user.click(agreeTermsCheckbox);
        expect(agreeTermsCheckbox).toBeChecked();
        await user.click(confirmBtn);
    });

    const newOrderBtn = await screen.getByRole('button', {
        name: /create new order/i,
    });

    const thanksHeader = await screen.getByRole('heading', {
        name: /thank you/i,
    });

    expect(thanksHeader).toBeInTheDocument();

    await waitFor(async () => {
        await user.click(newOrderBtn);
    });

    const scoopsTotal = await screen.findByText('Scoops total: $0.00', {});
    const toppingsTotal = await screen.findByText('Toppings total: $0.00', {});
    expect(scoopsTotal).toBeInTheDocument();
    expect(toppingsTotal).toBeInTheDocument();

    unmount();
});
