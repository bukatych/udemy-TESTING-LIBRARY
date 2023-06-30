import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

export default function OrderEntry() {
    const {
        totals: { grandTotal },
    } = useOrderDetails();
    return (
        <div>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>Grand total: {formatCurrency(grandTotal)}</h2>
        </div>
    );
}
