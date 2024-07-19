import useAllCashRequest from '../../hooks/useAllCashRequest';
import { MdCancel } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ReturnButton from '../../components/ReturnButton'

const AgentTransactionManagement = () => {
    const [requests, refetch] = useAllCashRequest();
    const axiosPublic = useAxiosPublic();


    const handleAccept = async (request) => {
        try {
            const agentId = localStorage.getItem('userID');
            const agentResponse = await axiosPublic.get(`/api/user/${agentId}`);
            const agent = agentResponse.data;
            const agentBalance = parseInt(agent.currentBalance);

            const userResponse = await axiosPublic.get(`/users/phone/${request.userPhoneNumber}`);
            const user = userResponse.data;
          
            const userBalance = parseInt(user.currentBalance);
      



            console.log("Agent current balance:", agentBalance);
            console.log("User current balance:", userBalance);
            console.log("Request amount:", request.amount);

            if (request.type === 'CashIn') {
                if (agentBalance < parseInt(request.amount)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Insufficient Balance',
                        text: 'Agent does not have enough balance.',
                    });
                    return;
                }

                // Update balances
                await axiosPublic.patch(`/users/${agent._id}/balance`, { balance: agentBalance - parseInt(request.amount) });
                await axiosPublic.patch(`/users/${user._id}/balance`, { balance: userBalance + parseInt(request.amount) });

                // Add transaction records
                const transactionData = {
                    date: new Date().toISOString(),
                    type: 'CashIn',
                    direction: 'incoming',
                    senderName: agent.name,
                    amount: request.amount
                };
                await axiosPublic.post('/transactions', { ...transactionData, userId: user._id });
                await axiosPublic.post('/transactions', { ...transactionData, userId: agent._id, direction: 'outgoing' });

                Swal.fire({
                    icon: 'success',
                    title: 'Transaction Successful',
                    text: 'CashIn transaction completed successfully.',
                });
            } else if (request.type === 'CashOut') {
                if (agentBalance < parseInt(request.amount) || userBalance < parseInt(request.amount)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Insufficient Balance',
                        text: 'Either agent or user does not have enough balance.',
                    });
                    return;
                }

                // Update balances
                await axiosPublic.patch(`/users/${agent._id}/balance`, { balance: agentBalance + parseInt(request.amount) });
                await axiosPublic.patch(`/users/${user._id}/balance`, { balance: userBalance - parseInt(request.amount) });

                // Add transaction records
                const transactionData = {
                    date: new Date().toISOString(),
                    type: 'CashOut',
                    direction: 'outgoing',
                    senderName: agent.name,
                    amount: parseInt (request.amount)
                };
                await axiosPublic.post('/transactions', { ...transactionData, userId: user._id });
                await axiosPublic.post('/transactions', { ...transactionData, userId: agent._id, direction: 'incoming' });

                Swal.fire({
                    icon: 'success',
                    title: 'Transaction Successful',
                    text: 'CashOut transaction completed successfully.',
                });
            }

            // Delete request
            await axiosPublic.delete(`/requests/${request._id}`);
            refetch();
        } catch (error) {
            console.error('Transaction failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Transaction Failed',
                text: 'An error occurred during the transaction.',
            });
        }
    };



    const handleReject = async (requestId) => {
        try {
            await axiosPublic.delete(`/requests/${requestId}`);
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Request Rejected',
                text: 'The request has been rejected.',
            });
        } catch (error) {
            console.error('Failed to reject request:', error);
            Swal.fire({
                icon: 'error',
                title: 'Rejection Failed',
                text: 'An error occurred while rejecting the request.',
            });
        }
    };

    return (
        <div className='bg-gradient-to-b from-fuchsia-900 to-slate-800 lg:w-[576px] mx-auto rounded-xl text-white '>
            <div className='flex flex-initial'>
                <ReturnButton ></ReturnButton>
            </div>
            <h1 className='text-center mb-4'>Transaction Requests ({requests.length})</h1>
            <div className="overflow-x-auto">
                <table className="table  w-full">
                    <thead className=' w-full'>
                        <tr className='text-center text-white'>
                            <th className="px-2 py-1">Receiver</th>
                            <th className="px-2 py-1">Amount</th>
                            <th className="px-2 py-1">Date</th>
                            <th className="px-2 py-1">Type</th>
                            <th className="px-2 py-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody className=' w-full' >
                        {requests.map((request) => (
                            <tr key={request._id} className='text-center'>
                                <td className="px-2 py-1">{request.userPhoneNumber}</td>
                                <td className="px-2 py-1">{request.amount}</td>
                                <td className="px-2 py-1">{request.date}</td>
                                <td className="px-2 py-1">{request.type}</td>
                                <td className="px-2 py-1 flex justify-center gap-1">
                                    <button
                                        className='flex flex-col justify-center items-center'
                                        onClick={() => handleAccept(request)}
                                    >
                                        <FaCheckSquare className='text-green-500' /> Accept
                                    </button>
                                    <button
                                        className='flex flex-col justify-center items-center'
                                        onClick={() => handleReject(request._id)}
                                    >
                                        <MdCancel className='text-red-500' /> Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentTransactionManagement;
