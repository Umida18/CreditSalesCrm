import type React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  item: any;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/users/${item.id}`)}
      className="bg-white shadow-lg rounded-xl p-6 mb-4 border border-gray-200 cursor-pointer transition-transform transform hover:scale-105"
    >
      <div className=" flex justify-between items-center">
        <p className="text-sm text-gray-500">Hudud nomi:</p>
        <h3 className="text-xl font-bold text-gray-800">{item.zone_name}</h3>
      </div>
      <div className=" flex justify-between items-center">
        <p className="text-sm text-gray-500">Tavsif</p>
        <p className="text-gray-600 text-base">{item.description}</p>
      </div>
      {/* Agar tugma kerak bo'lsa, izohdan chiqarib qo'ying */}
      {/* <button onClick={onActionClick} className="text-green-600 hover:text-green-700 transition-all duration-200 flex items-center gap-2">
      <BsCashCoin className="text-2xl" />
      <span className="text-sm font-medium">Harakat</span>
    </button> */}
    </div>
  );
};

export default DashboardCard;
