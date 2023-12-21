import { brandType, categoryType, needType } from "@/common/catalog";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

interface TableProps {
    data: categoryType[] | needType[] | brandType[];
    handleDelete: (id: number) => void;
    handleEdit: (item: any) => void;
}
const Table: React.FC<TableProps> = ({ data, handleDelete, handleEdit }) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                    <tr>
                        <td className="px-4 py-2">ID</td>
                        <td className="px-4 py-2">NAME</td>
                        <td className="px-4 py-2">DESCRIPTION</td>
                        <td className="px-4 py-2 text-right">ACTIONS</td>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800 text-gray-400">
                    {data.length &&
                        data.map((item: any) => (
                            <tr key={item.id}>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{item.id}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">
                                        {item.name || item.title}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">
                                        {item.description}
                                    </span>
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
                                                handleDelete(item.id)
                                            }
                                            className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                        >
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
