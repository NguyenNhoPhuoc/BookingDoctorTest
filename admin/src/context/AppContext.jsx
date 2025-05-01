import { createContext } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currency = '₫';
    const backendUrl = import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://bookingdoctortest.onrender.com";
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const value = {
        calculateAge,
        currency,
        backendUrl
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
