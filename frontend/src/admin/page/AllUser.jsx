import React, { useEffect, useState } from "react";
import { getAllUser, sendAllUserMail, sendUserMail } from "../../utils/api";
import { successfullyToast, warningToast } from "../../lib/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // loading for fetching users
  const [sendingMail, setSendingMail] = useState(false); // sending email

  const [msg, setMsg] = useState("");
  const [selMail, setSelMail] = useState("");
  const [selName, setSelName] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUser();
      if (res.data.success) {
        setUsers(res.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      warningToast("Failed to fetch users");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!msg) return warningToast("Please enter a message");
    if (!selMail) return warningToast("No email selected");

    try {
      setSendingMail(true);
      // call your send email API here
      // await sendEmailToUser(selMail, msg);
      await sendUserMail({
        email: selMail,
        name: selName,
        message: msg
      })
      successfullyToast("successfully", `Email sent to ${selMail}`);
      setMsg("");
      setSelMail("");
      setSelName("")
      setSendingMail(false);
    } catch (error) {
      console.error(error);
      warningToast("Failed", "Failed to send email");
      setSendingMail(false);
    }
  };


  const handleSubmitAllUser = async (e) => {
    e.preventDefault();
    if (!msg) return warningToast("Please enter a message");

    try {
      setSendingMail(true);
      // call your send email API here
      // await sendEmailToUser(selMail, msg);
      await sendAllUserMail({
        message: msg
      })
      successfullyToast("successfully", `Email sent to All User`);
      setMsg("");
      setSendingMail(false);
    } catch (error) {
      console.error(error);
      warningToast("Failed", "Failed to send email");
      setSendingMail(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Users Dashboard</h1>

      {/* User Table */}
      <div className="overflow-x-auto shadow rounded-lg max-w-6xl mx-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Membership</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.membershipType || "-"}</td>

                  <td className="py-3 px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-[#FA8C38] text-white dark:text-gray-100"
                          variant="outline"
                          onClick={() => {
                            setSelMail(user.email)
                            setSelName(user.name)
                          }} // set selected email on click
                        >
                          Send Mail
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <form onSubmit={handleSubmit}>
                          <DialogHeader>
                            <DialogTitle>Send Email</DialogTitle>
                            <DialogDescription>
                              Enter your message for <strong>{selMail}</strong>
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-2">
                            <div className="grid gap-2">
                              <Label htmlFor="msg">Message</Label>
                              <textarea
                                id="msg"
                                name="msg"
                                placeholder="Enter your message..."
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                className="bg-gray-100 min-h-[120px] max-h-[160px] p-2 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded"
                                required
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="dark:border-gray-600 dark:text-gray-100"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              type="submit"
                              disabled={sendingMail}
                              className="bg-[#FA8C38] text-white dark:text-gray-100"
                            >
                              {sendingMail ? "Sending..." : "Send Email"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* all user */}
      <div className="flex justify-center items-center mt-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-[#FA8C38] text-white dark:text-gray-100"
              variant="outline"
            >
              Send Mail to All Users
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <form onSubmit={handleSubmitAllUser}>
              <DialogHeader>
                <DialogTitle>Send Email</DialogTitle>
                <DialogDescription>
                  Enter your message for <strong>{"All Users"}</strong>
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="msg">Message</Label>
                  <textarea
                    id="msg"
                    name="msg"
                    placeholder="Enter your message..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="bg-gray-100 min-h-[120px] max-h-[160px] p-2 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="dark:border-gray-600 dark:text-gray-100"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={sendingMail}
                  className="bg-[#FA8C38] text-white dark:text-gray-100"
                >
                  {sendingMail ? "Sending..." : "Send Email"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AllUser;
