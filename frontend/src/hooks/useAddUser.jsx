import axios from "axios";
import toast from 'react-hot-toast';
import useConversation from '../../zustand/useConversation';
const useAddUser = () => {
	const {setUpdateConversation} = useConversation();
		const AddUser= async ({userId,friendId}) => {
			try {
			  const res = await axios.post(`/api/user/addUser`,{userId,friendId});
			  const data = await res.data;
			  setUpdateConversation(prev=>prev+1);
			  toast.success(data);
			  if (data.error) {
				throw new Error(data.error);
			  }
			} catch (error) {
			  toast.error(error.message);
			}
		};

	return { AddUser};
}

export default useAddUser;
