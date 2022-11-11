import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  searchInputField: string;
  setSearchInputField: (keyword: string) => void;
};

function SearchField({ searchInputField, setSearchInputField }: Props) {
  return (
    <div className="m-auto">
      <div className="flex h-12 items-center justify-between rounded-full border-2 border-gray-300">
        <div className="p-4 xl:p-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>

        <input
          className="w-10/12 bg-slate-200 py-0.5 px-6 pl-1 leading-tight text-gray-700 focus:outline-none xl:bg-white"
          id="search"
          type="text"
          placeholder="Search"
          autoComplete="off"
          value={searchInputField}
          onChange={(e) => setSearchInputField(e.target.value)}
        />

        <div className="p-4 xl:p-2">
          <XMarkIcon
            className="h-5 w-5 cursor-pointer text-gray-500"
            onClick={() => setSearchInputField("")}
          />
        </div>
      </div>
    </div>
  );
}
export default SearchField;
