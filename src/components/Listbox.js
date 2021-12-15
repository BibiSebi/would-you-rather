import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

const ListBox = () => {
  const [selected, setSelected] = useState();
  const users = useSelector((state) => state.users);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 w-full">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default  focus-visible:ring-2focus:ring-violet-300 sm:text-sm">
          {selected && (
            <span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3 w-9">
              <img src={selected.avatarURL} alt="" />
            </span>
          )}

          <span className="block truncate pl-7">
            {selected ? selected.name : "Choose a user"}
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
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={users[user]}
                >
                  <span className="block truncate">{users[user].name}</span>
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
