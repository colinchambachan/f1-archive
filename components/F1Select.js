import { useEffect } from "react";

const F1Select = ({ id, options, setValue = () => "" }) => {
  return (
    <div className="px-5">
      <select
        onClick={(e) => {
          setValue(e.target.value);
        }}
        className=" bg-red-700 text-white w-72 mb-6 text-sm rounded-lg focus:ring-white focus:border-white block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400"
      >
        <option defaultValue className="text-gray-700 bg-slate-100">
          Choose a {id}
        </option>
        {options?.map((element) => {
          return (
            <option
              key={element.value}
              className="text-gray-700 bg-slate-100"
              value={element.value}
              label={element.label}
            >
              {element.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default F1Select;
