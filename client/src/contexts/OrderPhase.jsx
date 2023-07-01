import { createContext, useContext, useState } from 'react';

export const OrderPhase = createContext();

export const useOrderPhase = () => {
    const contextValue = useContext(OrderPhase);

    if (!contextValue) {
        throw new Error(
            'useOrderPhase must be called from within an OrderPhaseProvider'
        );
    }

    return contextValue;
};
