
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getUser } from "../../redux/reducers/userSlice";
// import image from "../../assets/1946429.png"
import UpdateUserForm from './UpdateUserForm';
import { useParams } from 'react-router-dom';


export default function UserProfile(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser(id))
    }, [dispatch])

    const user = useSelector((state) => state.user.user);
    return (
        <div className="m-8 pr-[200px]">
            <div className="inline-flex">
                <div className="w-[300px]">
                    {/* <img className="w-[180px] h-[180px] rounded-s-full" src={image} alt="Profile Image" /> */}
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-semibold uppercase">{user?.last_name + " " + user?.first_name}</h1>
                    <p className="text-slate-500">
                        <a href="" className="text-blue-600/75">{user?.email}</a>
                        {" "}- {user?.role}
                    </p>
                </div>
            </div>            
            <UpdateUserForm user={user}/>
            {/* <UserForm user={user}/> */}

        </div>
    )
}