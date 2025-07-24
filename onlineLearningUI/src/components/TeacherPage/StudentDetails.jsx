import { useState } from 'react';
import api from "../../api";
import toast from 'react-hot-toast';

const StudentDetails = ({enroll}) => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    
    

    const fetchUser = async () => {
        setLoading(true);
        const role = localStorage.getItem("role")
        
        try {
            const response = await api.get(`${role}/getDetailOfStudent`,{
                params:{enroll}
            });
            
            setUserData(response.data);

        } catch (error) {
    
            toast.error('Error fetching user data:');
        } finally {
            setLoading(false);
        }
    }

    const toggleProfile = () => {
        if (!visible) {
            fetchUser();
        }
        setVisible(!visible);
    };

    return (
        <div className="relative inline-block mr-10">
            <button
                onClick={toggleProfile}
                className="text-blue-600 hover:underline"
            >
                View Details
            </button>
            {
                visible && userData && (
                    <div className="absolute left-1 bottom-full mb-1 w-48 bg-white shadow-lg rounded-lg p-3 z-50" onClick={toggleProfile}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className='flex flex-col gap-2'>
                                <h3 className="font-bold">{userData.name}</h3>
                                <p>{userData.email}</p>
                                <p>userId :- {userData.enrollment}</p>
                                <p> {userData.phoneNo}</p>
                            </div>
                        )}
                    </div>
                )
            }
        </div >
    );
};

export default StudentDetails;
