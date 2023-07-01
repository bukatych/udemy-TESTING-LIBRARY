import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { OrderPhase } from './contexts/OrderPhase';
import OrderSummary from './pages/summary/OrderSummary';
import { useState } from 'react';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import { ORDER_PHASE } from './constants';
import { debug } from 'prettier/doc';

function App() {
    const [orderPhase, setOrderPhase] = useState('entry');

    const orderPhaseContext = {
        orderPhase,
        setOrderPhase,
    };

    const renderPhase = (orderPhase) => {
        switch (orderPhase) {
            case ORDER_PHASE.ENTRY:
                return <OrderEntry />;
            case ORDER_PHASE.SUMMARY:
                return <OrderSummary />;
            case ORDER_PHASE.CONFIRMATION:
                return <OrderConfirmation />;
            default:
                return <div>Something</div>;
        }
    };

    return (
        <Container>
            <OrderDetailsProvider>
                <OrderPhase.Provider value={orderPhaseContext}>
                    {/* Summary page and entry page need provider */}
                    {renderPhase(orderPhase)}
                </OrderPhase.Provider>
            </OrderDetailsProvider>
            {/* Confirmation page does not need provider */}
        </Container>
    );
}

export default App;
