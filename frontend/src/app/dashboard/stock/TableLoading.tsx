import { Icon } from "@/components/Icons";

export function TableLoading() {
  return (
    <>
      <tr className="odd:bg-gray-50 ">
        <td className=" rounded-s-lg px-6 py-4">
          <div className="h-2 w-7 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className=" px-6 py-4">
          <div className="w-13 h-2 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className="  px-6 py-4">
          <div className="h-2 w-12 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className="  px-6 py-4">
          <div className="h-2 w-12 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className="  rounded-e-lg px-6 py-4">
          <div className="flex justify-center gap-5 text-gray-400 ">
            <button className="animate-pulse " disabled>

              <Icon icon="Pencil" />
            </button>
            <button className="animate-pulse " disabled>
              <Icon icon="Trash" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="odd:bg-gray-50 ">
        <td className=" rounded-s-lg px-6 py-4">
          <div className="h-2 w-7 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className=" px-6 py-4">
          <div className="w-13 h-2 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className="  px-6 py-4">
          <div className="h-2 w-12 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className="  px-6 py-4">
          <div className="h-2 w-12 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className="  rounded-e-lg px-6 py-4">
          <div className="flex justify-center gap-5 text-gray-400 ">
            <button className="animate-pulse " disabled>
              <Icon icon="Pencil" />
            </button>
            <button className="animate-pulse " disabled>
              <Icon icon="Trash" />
            </button>
          </div>
        </td>
      </tr>
      <tr className="odd:bg-gray-50 ">
        <td className=" rounded-s-lg px-6 py-4">
          <div className="h-2 w-7 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className=" px-6 py-4">
          <div className="w-13 h-2 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className="  px-6 py-4">
          <div className="h-2 w-12 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className="  px-6 py-4">
          <div className="h-2 w-12 animate-pulse rounded-xl bg-gray-200"></div>
        </td>
        <td className="  rounded-e-lg px-6 py-4">
          <div className="flex justify-center gap-5 text-gray-400 ">
            <button className="animate-pulse " disabled>
              <Icon icon="Pencil" />
            </button>
            <button className="animate-pulse " disabled>
              <Icon icon="Trash" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
