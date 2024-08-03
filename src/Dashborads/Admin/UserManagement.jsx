import useAllUsers from "../../hooks/useAllUsers";

import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UserManagement = () => {
  const [users, refetch] = useAllUsers();
  const axiosPublic = useAxiosPublic();

  const handleUserStatusChange = async (user) => {
    if (user.role === "admin") {
      return;
    }

    const newStatus = user.status === "active" ? "pending" : "active";
    const updateData = { status: newStatus };

    try {
      const { data } = await axiosPublic.patch(
        `/users/status/${user._id}`,
        updateData
      );

      if (data.modifiedCount > 0) {
        refetch(); // Update data without useEffect

        Swal.fire({
          title: "Status Changed!",
          text: `User status has been changed to ${newStatus}.`,
          icon: "success",
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
      console.error("Error changing the status:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center">Welcome to User Management</h1>
      <div className="overflow-x-auto lg:w-[576px] mx-auto">
        <table className="table table-zebra">
          {/* Table Head */}
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              // <UserTableRow key={user._id} data={user} index={index + 1} />
              <tr key={user._id} className="text-center">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleUserStatusChange(user)}
                    className={`w-[66px] rounded-2xl h-5 ${
                      user.status === "active"
                        ? "bg-green-500"
                        : "bg-yellow-600"
                    }`}
                  >
                    {user.status === "active" ? "Active" : "Pending"}
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

export default UserManagement;
