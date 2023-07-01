import { logRoles, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
    const user = userEvent.setup();

    render(<App />);

    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });

    const cherryCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries',
    });

    const orderButton = await screen.findByRole('button', {
        name: 'Order Sundae!',
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    await user.click(cherryCheckbox);
    await user.click(orderButton);
});