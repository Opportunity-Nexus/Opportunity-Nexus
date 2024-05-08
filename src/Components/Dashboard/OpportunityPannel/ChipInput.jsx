import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ChipInput({
  label,
  id,
  placeholder,
  register,
  errors,
  setValue,
  // getValues,
}) {
  const { editOpportunity, opportunity } = useSelector(
    (state) => state.opportunity
  );
  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editOpportunity) {
      setChips(opportunity?.opportunityTags);
    }
    register(id, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setValue(id, chips);
    // eslint-disable-next-line
  }, [chips]);

  // Function to handle user input when chips are added
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue];
        setChips(newChips);
        event.target.value = "";
      } else {
        toast.error("ALREADY INCLUDED!");
      }
    }
  };

  // Function to handle deletion of a chip
  const handleDeleteChip = (chipIndex) => {
    // Filter the chips array to remove the chip with the given index
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  // Render the component
  return (
    <div className="flex flex-col space-y-2">
      <label className="label-style" htmlFor={id}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-lg bg-primary-700 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        <input
          id={id}
          name={id}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="input-style"
        />
      </div>
      {errors[id] && <span className="error-style">{label} is required</span>}
    </div>
  );
}
