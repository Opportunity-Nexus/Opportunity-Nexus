import { FiTrash2 } from "react-icons/fi";
import { deleteProfile } from "../../../Services/Operations/SettingAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE ", error.message);
    }
  }
  return (
    <>
      <div className=" flex flex-col gap-x-5  rounded-md border-[1px]  border-pink-700 bg-pink-800 dark:bg-pink-900 p-8 px-6 sm:flex-row justify-center gap-y-2 ">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700  ">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2 w-[90%]  ">
          <h2 className="text-lg  font-bold text-richblack-5">
            Delete Account{" "}
          </h2>
          <div className="w-4/5 text-pink-25 text-sm">
            <p>Would you like to delete account?</p>
            <p>
              {" "}
              Deleting your account is permanent and will remove all the contain
              associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  );
}
