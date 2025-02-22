import { Button } from "antd";
import type React from "react";
import { BsPeople } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  item: any;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/usersCollector/${item.id}?title=${item.zone_name}`)
      }
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
      <div className="mt-3">
        <Button
          type="primary"
          icon={<BsPeople size={16} />}
          onClick={() =>
            navigate(`/usersCollector/${item.id}?title=${item.zone_name}`)
          }
        >
          Foydalanuvchilar
        </Button>
      </div>
    </div>
  );
};

export default DashboardCard;
