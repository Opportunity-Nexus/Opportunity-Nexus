import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../Services/Operations/SettingAPI";
import { useSelector, useDispatch } from "react-redux";
import IconBtn from "../../../Common/IconBtn";
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
        className="flex flex-col space-y-2 rounded-md border border-1 dark:border-richblack-700 
       dark:bg-richblack-900 p-2 mb-5"
      >
        <h1 className="ml-4 text-lg font-semibold dark:text-richblack-25 mt-8">
          Change Profile Picture
        </h1>
        <div className="flex  items-center sm:p-4 sm:px-6 ">
          <div className="flex   w-[100%]  flex-row">
            <div className="flex  gap-x-4 justify-between  sm:px-5 items-center w-full ">
              <img
                src={previewSource || user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[82px] rounded-full object-cover"
              />
              <div className="flex gap-x-4 items-center flex-wrap   gap-y-4">
                <div className=" flex    items-center h-7 px-5 py-5 border border-richblack-25 dark:border-richblack-800  dark:text-richblack-800 rounded-md dark:bg-yellow-400 ">
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
                    className="cursor-pointer  rounded-md  py-3 px-4 font-semibold  text-richblack-50"
                  >
                    Select
                  </button>
                </div>

                <IconBtn
                  text={loading ? "Uploading..." : "Upload"}
                  onclick={handleFileUpload}
                >
                  {!loading && <FiUpload className="text-lg text-white" />}
                </IconBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
