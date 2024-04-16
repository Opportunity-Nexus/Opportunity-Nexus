import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../Services/Operations/SettingAPI";
import { useSelector, useDispatch } from "react-redux";
export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.error("ERROR MESSAGE" + error.message);
    }
  };
  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  return (
    <>
      <div
        className="flex flex-col space-y-1 rounded-md border border-1 dark:border-richblack-700 
       dark:bg-richblack-800 mb-5"
      >
        <h1 className="ml-6 sm:text-2xl text-xl font-bold dark:text-richblack-25 mt-5 text-center sm:text-start">
          Change Profile Picture
        </h1>
        <div className="flex w-full items-center  sm:px-3 ">
          <div className="flex  gap-x-4 justify-between  px-3 items-center w-full py-5 ">
            <img
              src={previewSource || user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[82px] rounded-full object-cover"
            />
            <div className="flex gap-x-4 items-center flex-wrap   gap-y-4 justify-end">
              <div className=" flex items-center h-7 px-5 py-5 border border-richblack-25 dark:border-richblack-800  dark:text-richblack-800 rounded-md bg-red-500 text-white dark:bg-yellow-400  ">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png ,image/gig,image/jpeg"
                />
                <button
                  onClick={handleClick}
                  disabled={loading}
                  className="cursor-pointer rounded-md py-3 px-4 font-bold text-richblack-50"
                >
                  Select
                </button>
              </div>

              <button
                className="bg-primary-600 hover:bg-primary-700 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white"
                onClick={handleFileUpload}
              >
                <span className="flex flex-row gap-x-2 items-center">
                  {loading ? "Uploading..." : "Upload"}
                  {!loading && <FiUpload className="text-lg text-white" />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
