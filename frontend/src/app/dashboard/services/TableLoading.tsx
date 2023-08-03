import { Icon } from "@/components/Icons";


export function TableLoading() {
  return (
    <>
      <div className="table-row odd:bg-gray-50 ">
        <div className="table-cell rounded-s-lg px-6 py-4">
          <div className="h-2 w-15 animate-pulse rounded-xl bg-gray-200"></div>
        </div>
        <div className="table-cell px-6 py-4">
          <div className="w-13 h-2 animate-pulse rounded-xl bg-gray-200"></div>
        </div>
        <div className="table-cell  rounded-e-lg px-6 py-4">
          <div className="flex justify-center gap-5 text-gray-400 ">
            <button className="animate-pulse " disabled>
              <Icon icon="Pencil" />
            </button>
            <button className="animate-pulse " disabled>
              <Icon icon="Trash" />
            </button>
          </div>
        </div>
      </div>
      <div className="table-row odd:bg-gray-50 ">
        <div className="table-cell rounded-s-lg px-6 py-4">
          <div className="h-2 w-15 animate-pulse rounded-xl bg-gray-200"></div>
        </div>
        <div className="table-cell  px-6 py-4">
          <div className="h-2 w-13 animate-pulse rounded-xl bg-gray-200"></div>
        </div>
        <div className="table-cell  rounded-e-lg px-6 py-4">
          <div className="flex justify-center gap-5 text-gray-400 ">
            <button className="animate-pulse " disabled>
              <Icon icon="Pencil" />
            </button>
            <button className="animate-pulse " disabled>
              <Icon icon="Trash" />
            </button>
          </div>
        </div>
      </div>
      <div className="table-row odd:bg-gray-50 ">
        <div className="table-cell rounded-s-lg px-6 py-4">
          <div className="h-2 w-15 animate-pulse rounded-xl bg-gray-200"></div>
        </div>
        <div className="table-cell px-6 py-4">
          <div className="w-13 h-2 animate-pulse rounded-xl bg-gray-200"></div>
        </div>
        <div className="table-cell  rounded-e-lg px-6 py-4">
          <div className="flex justify-center gap-5 text-gray-400 ">
            <button className="animate-pulse " disabled>
              <Icon icon="Pencil" />
            </button>
            <button className="animate-pulse " disabled>
              <Icon icon="Trash" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
