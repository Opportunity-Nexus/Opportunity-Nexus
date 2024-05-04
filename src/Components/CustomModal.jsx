import { Dialog, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import { Fragment, useEffect } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

const CustomModal = ({
  children,
  closeModal,
  isOpen,
  className,
  initialFocusRef,
}) => {
  useEffect(() => {
    if (isOpen) {
      // When the dialog is open, do not apply overflow hidden
      document.documentElement.style.overflow = "visible";
      document.body.style.overflow = "visible";
    } else {
      // Reset overflow property when dialog is closed
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        unmount={isOpen}
        open={isOpen}
        as="div"
        className={clsx("z-[99999999] flex absolute inset-0", className)}
        onClose={closeModal}
        initialFocus={initialFocusRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25 bg-black blur-2xl" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={clsx(
              "fixed h-fit w-fit md:min-w-[500px] bottom-0 left-0 right-0 top-0 mx-auto my-auto"
            )}
          >
            <div
              className={clsx(
                "flex  p-4 text-center min-h-full items-center justify-center"
              )}
            >
              <Dialog.Panel
                className={clsx(
                  "relative flex w-full transform flex-col bg-white dark:bg-gray-950 rounded-2xl p-6 text-left align-middle shadow-2xl transition-all"
                )}
              >
                <div className="absolute right-4 pl-2 top-50%  my-auto flex items-start justify-end py-1">
                  <HiOutlineXMark
                    onClick={closeModal}
                    className="h-5 w-5 text-gray-500"
                  />
                </div>

                {children}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default CustomModal;
