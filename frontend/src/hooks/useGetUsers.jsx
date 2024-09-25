import axios from "axios";
import { useEffect,useState } from "react";
import toast from 'react-hot-toast';

const useGetUsers = (props) => {
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
	useEffect(() => {
		const getUsers = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`/api/user/findUsers/${props}`);
				const data = await res.data;
				if (data.error) {
					throw new Error(data.error);
				}
				setUsers(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getUsers();
	}, [props]);

	return { loading, users };
}

export default useGetUsers
