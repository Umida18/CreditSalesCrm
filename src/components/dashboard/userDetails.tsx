import type React from "react";

import { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import {
  User,
  Package,
  DollarSign,
  Phone,
  Briefcase,
  MapPin,
  UserCheck,
  CreditCard,
  FileText,
  Calendar,
} from "lucide-react";

interface UserDetails {
  name: string;
  product_name: string;
  cost: number;
  phone_number: string;
  phone_number2: string;
  workplace_name: string;
  time: number;
  zone_name: string;
  seller: string;
  passport_series: string;
  description: string;
  given_day: string;
}

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserDetails | null;
  loading: boolean;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  userData,
  loading,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsFullScreen(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderDetailItem = (
    icon: React.ReactNode,
    label: string,
    value: string | number
  ) => (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center mb-2 text-gray-600">
        {icon}
        <span className="ml-2 font-medium">{label}</span>
      </div>
      <div className="text-lg">{value}</div>
    </div>
  );

  return (
    <Modal
      title={
        <h2 className="text-2xl font-bold mb-4">Foydalanuvchi ma'lumotlari</h2>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      style={{ top: isFullScreen ? "4px" : "24px", padding: 0 }}
      bodyStyle={{
        height: "80vh",
        overflowY: "auto",
        padding: isFullScreen ? "4px" : "24px",
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : userData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {renderDetailItem(<User className="w-5 h-5" />, "Ism", userData.name)}
          {renderDetailItem(
            <Package className="w-5 h-5" />,
            "Maxsulot nomi",
            userData.product_name
          )}
          {renderDetailItem(
            <DollarSign className="w-5 h-5" />,
            "Narxi",
            userData.cost
          )}
          {renderDetailItem(
            <Phone className="w-5 h-5" />,
            "Telefon raqam 1",
            userData.phone_number
          )}
          {renderDetailItem(
            <Phone className="w-5 h-5" />,
            "Telefon raqam 2",
            userData.phone_number2
          )}
          {renderDetailItem(
            <Briefcase className="w-5 h-5" />,
            "Ish joyi ID",
            userData.workplace_name
          )}
          {renderDetailItem(
            <Calendar className="w-5 h-5" />,
            "Vaqt",
            userData.time
          )}
          {renderDetailItem(
            <MapPin className="w-5 h-5" />,
            "Zona ID",
            userData.zone_name
          )}
          {renderDetailItem(
            <UserCheck className="w-5 h-5" />,
            "Sotuvchi",
            userData.seller
          )}
          {renderDetailItem(
            <CreditCard className="w-5 h-5" />,
            "Passport seriyasi",
            userData.passport_series
          )}
          {renderDetailItem(
            <FileText className="w-5 h-5" />,
            "Tavsif",
            userData.description
          )}
          {renderDetailItem(
            <Calendar className="w-5 h-5" />,
            "Berilgan sana",
            new Date(userData.given_day).toLocaleString()
          )}
        </div>
      ) : (
        <p className="text-center text-lg">Ma'lumot topilmadi</p>
      )}
    </Modal>
  );
};

export default UserDetailsModal;
