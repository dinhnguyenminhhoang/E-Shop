import { productVersion } from "@/common/product";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
interface TableVersionProps {
    data: productVersion[];
    handleDelete: (id: number) => void;
    handleEdit: (item: any) => void;
}
const TableVersion: React.FC<TableVersionProps> = ({
    data,
    handleDelete,
    handleEdit,
}) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <thead className="text-xs font-semibold tracking-wide text-left  uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                    <tr>
                        <td className="px-4 py-2">ID</td>
                        <td className="px-4 py-2">NAME</td>
                        <td className="px-4 py-2">IMAGE</td>
                        <td className="px-4 py-2">COLOR</td>
                        <td className="px-4 py-2">PRICE</td>
                        <td className="px-4 py-2">INVENTORY</td>
                        <td className="px-4 py-2">SPECIFICATION</td>
                        <td className="px-4 py-2 text-right">ACTION</td>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800  text-gray-400">
                    {data.length &&
                        data.map((item) => {
                            interface SpecificationsType {
                                [key: string]: string | null;
                            }
                            const itemSpecifications =
                                item.specifications as SpecificationsType;

                            const specsArray: JSX.Element[] = [];
                            for (const key in itemSpecifications) {
                                if (
                                    Object.prototype.hasOwnProperty.call(
                                        itemSpecifications,
                                        key
                                    )
                                ) {
                                    const value = itemSpecifications[key];
                                    if (value !== null) {
                                        specsArray.push(
                                            <div key={key}>
                                                <span className="font-semibold">
                                                    {key}:{" "}
                                                </span>
                                                <span className="text-sm">
                                                    {value}
                                                </span>
                                            </div>
                                        );
                                    }
                                }
                            }
                            return (
                                <tr key={item.id}>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">
                                            {item.id}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {item.name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <img
                                            src={item.imageUrl}
                                            alt=""
                                            className="h-14 object-contain"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {item.color}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {item.originPrice}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {item?.inventory || 1}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 capitalize">
                                        {specsArray}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-end text-right">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                            >
                                                <CiEdit size={22} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        Number(item.id)
                                                    )
                                                }
                                                className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                            >
                                                <AiOutlineDelete size={22} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default TableVersion;
