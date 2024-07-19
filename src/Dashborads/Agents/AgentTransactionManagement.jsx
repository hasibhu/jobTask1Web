import useAllCashRequest from '../../hooks/useAllCashRequest';
import { MdCancel } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AgentTransactionManagement = () => {
    const [requests, refetch] = useAllCashRequest();
    const axiosPublic = useAxiosPublic();

    // const handleAccept = async (request) => {
    //     try {
    //         const agentId = localStorage.getItem('userID');
    //         const agentResponse = await axiosPublic.get(`/api/user/${agentId}`);
    //         const agent = agentResponse.data;

    //         if (request.type === 'CashIn') {
    //             if (agent.balance < request.amount) {
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Insufficient Balance',
    //                     text: 'Agent does not have enough balance.',
    //                 });
    //                 return;
    //             }

    //             const userResponse = await axiosPublic.get(`/users/phone/${request.userPhoneNumber}`);
    //             const user = userResponse.data;

    //             // Update balances
    //             await axiosPublic.patch(`/users/${agent._id}/balance`, { balance: agent.balance - request.amount });
    //             await axiosPublic.patch(`/users/${user._id}/balance`, { balance: user.balance + request.amount });

    //             // Add transaction records
    //             const transactionData = {
    //                 date: new Date().toISOString(),
    //                 type: 'CashIn',
    //                 direction: 'incoming',
    //                 senderName: agent.name,
    //                 amount: request.amount
    //             };
    //             await axiosPublic.post('/transactions', { ...transactionData, userId: user._id });
    //             await axiosPublic.post('/transactions', { ...transactionData, userId: agent._id, direction: 'outgoing' });

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Transaction Successful',
    //                 text: 'CashIn transaction completed successfully.',
    //             });
    //         } else if (request.type === 'CashOut') {
    //             const userResponse = await axiosPublic.get(`/users/phone/${request.userPhoneNumber}`);
    //             const user = userResponse.data;

    //             if (agent.balance < request.amount || user.balance < request.amount) {
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Insufficient Balance',
    //                     text: 'Either agent or user does not have enough balance.',
    //                 });
    //                 return;
    //             }

    //             // Update balances
    //             await axiosPublic.patch(`/users/${agent._id}/balance`, { balance: agent.balance - request.amount });
    //             await axiosPublic.patch(`/users/${user._id}/balance`, { balance: user.balance - request.amount });

    //             // Add transaction records
    //             const transactionData = {
    //                 date: new Date().toISOString(),
    //                 type: 'CashOut',
    //                 direction: 'outgoing',
    //                 senderName: agent.name,
    //                 amount: request.amount
    //             };
    //             await axiosPublic.post('/transactions', { ...transactionData, userId: user._id });
    //             await axiosPublic.post('/transactions', { ...transactionData, userId: agent._id, direction: 'incoming' });

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Transaction Successful',
    //                 text: 'CashOut transaction completed successfully.',
    //             });
    //         }

    //         // Delete request
    //         await axiosPublic.delete(`/requests/${request._id}`);
    //         refetch();
    //     } catch (error) {
    //         console.error('Transaction failed:', error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Transaction Failed',
    //             text: 'An error occurred during the transaction.',
    //         });
    //     }
    // };


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
        <div>
            <h1 className='text-center'> Transaction Management will be here {requests.length} </h1>
            <div className="overflow-x-auto lg:w-[576px] mx-auto">
                <table className="table table-zebra lg:w-[576px]">
                    {/* Table Head */}
                    <thead>
                        <tr className='text-center'>
                            <th>Receiver Number</th>
                            <th>Amount</th>
                            <th>Request Date</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id} className='text-center'>
                                <td>{request.userPhoneNumber}</td>
                                <td>{request.amount}</td>
                                <td>{request.date}</td>
                                <td>{request.type}</td>
                                <td>{request.status}</td>
                                <td className='flex justify-center gap-2'>
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
