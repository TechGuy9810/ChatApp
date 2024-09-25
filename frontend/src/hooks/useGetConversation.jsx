import axios from "axios";
import { useEffect,useState } from "react";
import toast from 'react-hot-toast';
import useConversation from '../../zustand/useConversation';
const useGetConversation = (props) => {
	const {updateConversation} = useConversation();
    const [conversation,setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`/api/user/${props}`);
				const data = await res.data;
				if (data.error) {
					throw new Error(data.error);
				}
				setConversation(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, [props,updateConversation]);

	return { loading, conversation };
}

export default useGetConversation
