import { useParams } from 'react-router-dom';

const Doctors = () => {
    const { speciality } = useParams();

    return (
        <div>
            <h1>Doctors {speciality ? `- ${speciality}` : ''}</h1>
        </div>
    );
};

export default Doctors;
