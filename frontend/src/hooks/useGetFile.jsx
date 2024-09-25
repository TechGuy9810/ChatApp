import axios from "axios";
import { useEffect,useState } from "react";
import toast from 'react-hot-toast';
import useConversation from '../../zustand/useConversation';

const useGetFile = () => {
	const {selectedConversation} = useConversation();
    const [files,setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
	useEffect(() => {
		const getFiles = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`/api/messages/files/${selectedConversation._id}`);
				const data = await res.data;
				if (data.error) {
					throw new Error(data.error);
				}
				setFiles(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getFiles();
	}, [selectedConversation]);

	return { loading, files };
}

export default useGetFile;
