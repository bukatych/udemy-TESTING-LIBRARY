import {
    render,
    screen,
    waitFor,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import '@testing-library/jest-dom/extend-expect';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

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

test('update toppings subtotal when topping chosen', async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);

    // make sure total starts out $0.00
    const toppingsSubtotal = screen.getByText('Toppings total: $', {
        exact: false,
    });

    expect(toppingsSubtotal).toHaveTextContent('0.00');

    const cherryCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries',
    });

    await waitFor(async () => {
        await user.click(cherryCheckbox);
        expect(cherryCheckbox).toBeChecked();
        expect(toppingsSubtotal).toHaveTextContent('1.50');
    });

    const mAndMCheckbox = await screen.findByRole('checkbox', {
        name: 'M&Ms',
    });

    await waitFor(async () => {
        await user.click(mAndMCheckbox);
        expect(mAndMCheckbox).toBeChecked();
        expect(toppingsSubtotal).toHaveTextContent('3.00');
    });

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
        name: 'Hot fudge',
    });

    await waitFor(async () => {
        await user.click(hotFudgeCheckbox);
        expect(hotFudgeCheckbox).toBeChecked();
        expect(toppingsSubtotal).toHaveTextContent('4.50');
    });

    await waitFor(async () => {
        await user.click(cherryCheckbox);
        expect(cherryCheckbox).not.toBeChecked();
        expect(toppingsSubtotal).toHaveTextContent('3.00');
    });
});

describe('grand total', () => {
    test('grand total starts at $0.00', async () => {
        const { unmount } = render(<OrderEntry />);

        const grandTotal = screen.getByText('Grand total: $', {
            exact: false,
        });

        expect(grandTotal).toHaveTextContent('0.00');
        unmount();
    });

    test('grand total updates properly if scoop is added first', async () => {
        const user = userEvent.setup();

        render(<OrderEntry />);

        const grandTotal = screen.getByText('Grand total: $', {
            exact: false,
        });

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });

        const cherryCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        });

        await waitFor(async () => {
            await user.clear(vanillaInput);
            await user.type(vanillaInput, '2');
            expect(grandTotal).toHaveTextContent('4.00');
            await user.click(cherryCheckbox);
            expect(grandTotal).toHaveTextContent('5.50');
        });
    });

    test('grand total updates properly if toppings is added first', async () => {
        const user = userEvent.setup();

        render(<OrderEntry />);

        const grandTotal = screen.getByText('Grand total: $', {
            exact: false,
        });

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });

        const cherryCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        });

        await waitFor(async () => {
            await user.click(cherryCheckbox);
            expect(grandTotal).toHaveTextContent('1.50');
            await user.clear(vanillaInput);
            await user.type(vanillaInput, '3');
            expect(grandTotal).toHaveTextContent('7.50');
        });
    });

    test('grand total updates properly if item is removed', async () => {
        const user = userEvent.setup();

        render(<OrderEntry />);

        const grandTotal = screen.getByText('Grand total: $', {
            exact: false,
        });

        const cherryCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        });

        const hotFudgeCheckbox = await screen.findByRole('checkbox', {
            name: 'Hot fudge',
        });

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });

        const chocolateInput = await screen.findByRole('spinbutton', {
            name: 'Chocolate',
        });

        await waitFor(async () => {
            await user.clear(vanillaInput);
            await user.type(vanillaInput, '2');
            await user.clear(chocolateInput);
            await user.type(chocolateInput, '3');
            await user.click(cherryCheckbox);
            await user.click(hotFudgeCheckbox);
            expect(grandTotal).toHaveTextContent('13.00');
            await user.click(hotFudgeCheckbox);
            expect(grandTotal).toHaveTextContent('11.50');
            await user.clear(vanillaInput);
            await user.type(vanillaInput, '1');
            await user.clear(chocolateInput);
            await user.type(chocolateInput, '1');
            expect(grandTotal).toHaveTextContent('5.50');
        });
    });
});
