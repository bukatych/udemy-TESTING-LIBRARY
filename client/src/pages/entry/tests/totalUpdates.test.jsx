import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import '@testing-library/jest-dom/extend-expect';

test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', {
        exact: false,
    });

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });

    await waitFor(async () => {
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');
        expect(scoopsSubtotal).toHaveTextContent('2.00');
    });

    // update chocolate scoops to 2 and check the subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {
        name: 'Chocolate',
    });

    await waitFor(async () => {
        await user.clear(chocolateInput);
        await user.type(chocolateInput, '1');
        expect(scoopsSubtotal).toHaveTextContent('4.00');
    });
});
