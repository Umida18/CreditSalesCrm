import { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

const TableHeader = ({
  searchTerm,
  setSearchTerm,
  selectedZone,
  setSelectedZone,
  zones,
  setData,
}: any) => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/addUser");
  };

  useEffect(() => {
    if (!BASE_URL) return;

    const fetchData = async (zoneName: any) => {
      try {
        let url = `${BASE_URL}/zones/filter`;
        if (zoneName) {
          url += `?zone_name=${encodeURIComponent(zoneName)}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (result?.data && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        setData([]);
      }
    };

    if (selectedZone !== null) fetchData(selectedZone);
  }, [selectedZone, setData]);

  return (
    <div className="flex justify-between items-center mb-3">
      <button
        className="flex gap-4 px-4 py-2 rounded-lg bg-[#0042fd] text-white cursor-pointer"
        onClick={handleAddUser}
      >
        <MdAdd className="text-2xl" />
        <p>Klient qo'shish</p>
      </button>

      <div className="flex items-center gap-4">
        <div className="w-80 px-4 py-1 flex gap-4 bg-white rounded-md items-center text-gray-400 border border-gray-300">
          <IoSearchOutline className="text-2xl" />
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-600"
          value={selectedZone || ""}
          onChange={(e) => setSelectedZone(e.target.value.trim() || null)}
        >
          <option value="">Barcha hududlar</option>
          {zones.map((zone: any) => (
            <option key={zone.id} value={zone.zone_name}>
              {zone.zone_name}
            </option>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-600"
          value={selectedZone || ""}
          onChange={(e) => setSelectedZone(e.target.value.trim())}
        >
          <option value="">Barchasi tolangan/tolanmagan</option>
          {zones.map((zone: any, index: number) => (
            <option key={index} value={zone.zone_name}>
              {zone.zone_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableHeader;
