const F1Select = ({ id, options }) => {
  return (
    <div className="px-5">
      <select className=" bg-red-700 text-white w-72 mb-6 text-sm rounded-lg focus:ring-white focus:border-white block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400">
        <option selected className="text-gray-700 bg-slate-100">
          Choose a {id}
        </option>
        {options?.map((element) => {
          return (
            <option
              className="text-gray-700 bg-slate-100"
              value={element.value}
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
