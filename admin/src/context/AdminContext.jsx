import axios from 'axios';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken,setAtoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const [doctors,setdoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/all-doctors', {headers: {aToken} });
            if(data.success) {
                setdoctors(data.doctors);
                console.log(data.doctors);
                
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    }

    const changeAlvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers: {aToken} });
            if(data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error changing availability:', error);
        }
    }

    const value = {
        aToken,setAtoken,
        backendUrl,
        doctors,getAllDoctors, changeAlvailability
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;