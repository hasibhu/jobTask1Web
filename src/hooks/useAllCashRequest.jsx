import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllCashRequest = () => {
    const axiosPublic = useAxiosPublic();

    // using tanstack query 
    const { data: requests = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const { data } = await axiosPublic.get('/cashRequests');
            console.log(data);
            return data;
        },
        staleTime: 1000 * 60 * 5, // Optional: Holds Cache data for 5 minutes
    });

    return [requests, refetch];
}

export default useAllCashRequest;