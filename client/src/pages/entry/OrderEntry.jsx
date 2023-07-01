import Button from 'react-bootstrap/Button';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import { useOrderPhase } from '../../contexts/OrderPhase';
import { ORDER_PHASE } from '../../constants';

export default function OrderEntry() {
    const {
        totals: { grandTotal },
    } = useOrderDetails();

    const { setOrderPhase } = useOrderPhase();
    return (
        <div>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>Grand total: {formatCurrency(grandTotal)}</h2>
            <Button onClick={() => setOrderPhase(ORDER_PHASE.SUMMARY)}>
                Order Sundae!
            </Button>
        </div>
    );
}
