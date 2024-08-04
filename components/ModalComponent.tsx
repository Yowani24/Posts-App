import React, { Children, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import UpdatePostForm from "./Posts/UpdatePostForm";
import { IoIosClose } from "react-icons/io";

interface Props {
  modalTitle: string;
  buttonProps: any;
  children: React.ReactNode;
}

const ModalComponent = ({ buttonProps, children, modalTitle }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative">
      <div onClick={openModal}>{buttonProps}</div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000054] bg-opacity-50 px-4">
          <div className="bg-white p-4 rounded flex flex-col justify-between items-start sm:w-[400px] min-h-44 w-full">
            <div className="flex items-center justify-between w-full">
              <span>{modalTitle}</span>
              <div
                className="self-end bg-gray-200 rounded-full"
                onClick={closeModal}
              >
                <IoIosClose size={30} className="text-gray-600" />
              </div>
            </div>

            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
