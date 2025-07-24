import { useState } from 'react';
import api from "../../api";
import { logout } from '../../Service/auth';
import { useNavigate } from 'react-router-dom';
import useIsAuthenticated from '../../MyContext/IsAuth';
import toast from 'react-hot-toast';

const ProfileCard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const { setLoggedIn } = useIsAuthenticated()
    const [visible, setVisible] = useState(false);
    const[id , setId] = useState()

    
    
    const fetchUser = async () => {
        setLoading(true);
        try {
            
            const response = await api.get(`${localStorage.getItem("role")}/getDetail`);  

            if(localStorage.getItem("role") == "/teacher") setId(response.data.teacherId)

            if(localStorage.getItem("role") == "/student") setId(response.data.enrollment)

            setUserData(response.data);
            

        } catch (error) {
            toast.error('Error fetching user data:');
        } finally {
            setLoading(false);
        }
    }


    const handleLogout = async () => {
        await logout()
        setLoggedIn(false)
        navigate("/getoption")
    };

    const toggleProfile = () => {
        if (!visible) {
            fetchUser();
        }
        setVisible(!visible);
    };

    return (
        <div className="relative inline-block mr-10">
            <div
                className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-400"
                onClick={toggleProfile}

            >
                <span><img src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png"
                    className='w-full h-fit object-cover overflow-hidden' />
                </span> {/* Placeholder for profile picture */}
            </div>

            {
                visible && userData && (
                    <div className="absolute right-0.5 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 ">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className='flex flex-col gap-2'>
                                <h3 className="font-bold">{userData.name}</h3>
                                <p>{userData.email}</p>
                                <p>userId :- {id}</p>
                                <p> {userData.phoneNo}</p>
                                <button
                                    className="mt-2 text-red-500 hover:underline"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )
            }
        </div >
    );
};

export default ProfileCard;
