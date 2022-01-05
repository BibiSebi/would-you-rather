import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

const ListBox = ({ onChange, isError }: any) => {
  const [selected, setSelected] = useState<any>(null);
  const users = useSelector((state: any) => state.users);

  const handleChange = (user: any) => {
    onChange(user);
    setSelected(user);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative w-full">
        <Listbox.Button
          className={`relative w-full h-12 text-gray-500 py-2 pr-10 text-left  bg-white rounded-lg cursor-default pl-3  focus:ring-violet-300 sm:text-sm ${
            isError ? "border-2 border-red-700" : "border border-gray-400"
          }`}
        >
          {selected && (
            <span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3 w-9">
              <img src={selected.avatarURL} alt="" />
            </span>
          )}

          <span className={`block truncate  ${!selected ? "" : "pl-7"}`}>
            {selected ? selected.name : "Choose an account"}
          </span>
          <span className="absolute inset-y-0  right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {Object.keys(users).length > 0 &&
              Object.keys(users).map((user, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4 `
                  }
                  value={users[user]}
                >
                  <span className="block truncate text-gray-500">
                    {users[user].name}
                  </span>
                  <span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3 w-9">
                    <img src={users[user].avatarURL} alt="" />
                  </span>
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListBox;
