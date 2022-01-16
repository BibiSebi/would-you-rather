import { XIcon } from "@heroicons/react/outline";
import React from "react";
import { IPictureSelect } from "../interfaces/picture-select";

interface IPictureSelectComponent {
  assets: IPictureSelect[];
  groupName: string;
  label: string;
  onChange?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const PictureSelect = ({
  assets,
  groupName,
  label,
  onChange,
}: IPictureSelectComponent) => {
  return (
    <div
      role="radiogroup"
      className="w-full flex flex-col text-gray-500"
      aria-labelledby={groupName}
    >
      <span id={groupName}>{label}</span>

      <div className="flex flex-row flex-wrap">
        {assets.map((asset, idx: number) => (
          <button
            key={idx}
            className={`rounded-full m-2 w-16 h-16  overflow-hidden border ${
              asset.selected ? " border-blue-700" : " border-gray-300"
            }`}
            aria-label={asset.title}
          >
            {asset.src ? (
              <img src={asset.src} alt="" />
            ) : (
              <XIcon className="w-full h-full text-gray-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PictureSelect;
