import type React from "react";

import { useState, useEffect } from "react";
import { Modal, Spin, Table, message } from "antd";
// import {
//   User,
//   Package,
//   DollarSign,
//   Phone,
//   Briefcase,
//   MapPin,
//   UserCheck,
//   CreditCard,
//   FileText,
//   Calendar,
// } from "lucide-react";
import { BASE_URL } from "../../config";

interface UserDetails {
  id: number;
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
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

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
  console.log("userData", userData);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const paymentColumns = [
    {
      title: "Sana",
      dataIndex: "payment_date",
      key: "payment_date",
      render: formatDate,
    },
    {
      title: "Manzili",
      dataIndex: "zone_name",
      key: "zone_name",
    },
    { title: "Oy", dataIndex: "payment_month", key: "payment_month" },
    { title: "To'lov haqida", dataIndex: "description", key: "description" },
    { title: "Yig'uvchi", dataIndex: "login", key: "login" },
  ];

  const userInfoColumns = [
    { title: "Ma'lumot", dataIndex: "label", key: "label" },
    { title: "Qiymat", dataIndex: "value", key: "value" },
  ];

  const getUserInfo = (user: any) => {
    const paymentStatus = user.payment_status ? "To'landi" : "Qarz";
    const paymentStatusColor = user.payment_status ? "green" : "red";

    return [
      { label: "Ismi", value: user.name },
      { label: "Telefon raqami", value: user.phone_number },
      { label: "Qo'shimcha telefon raqami", value: user.phone_number2 },
      { label: "Mahsulot nomi", value: user.product_name },
      { label: "Narxi", value: `${Number(user.cost).toLocaleString()} USZ` },
      {
        label: "Oylik to'lov",
        value: `${Number(user.monthly_income).toLocaleString()} UZS`,
      },
      { label: "Manzili", value: user.zone_name },
      { label: "Berilgan vaqti", value: formatDate(user.given_day) },
      { label: "Ish joyi", value: user.workplace_name },
      { label: "Olingan muddati", value: `${user.time} oyga` },
      { label: "Malumot", value: user.description },
      {
        label: "O'tgan oylik tolov holati",
        value: (
          <span style={{ color: paymentStatusColor }}>{paymentStatus}</span>
        ),
      },
    ];
  };

  // const renderDetailItem = (
  //   icon: React.ReactNode,
  //   label: string,
  //   value: string | number
  // ) => (
  //   <div className="mb-4 p-4 bg-gray-50 rounded-lg">
  //     <div className="flex items-center mb-2 text-gray-600">
  //       {icon}
  //       <span className="ml-2 font-medium">{label}</span>
  //     </div>
  //     <div className="text-lg">{value}</div>
  //   </div>
  // );
  console.log("userData?.id4444444", userData?.id);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/payment/history/${userData?.id}`
        );
        console.log("responsehistory", response);

        const data = await response.json();
        setPaymentHistory(data.result || []);
      } catch (err) {
        // setError("To'lov tarixini olishda xatolik yuz berdi");
        message.error("To'lov tarixini olishda xatolik yuz berdi");
      }
    };
    fetchPaymentHistory();
  }, [userData?.id]);

  return (
    <Modal
      className="xl:min-w-[600px]"
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
        // <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        //   {renderDetailItem(<User className="w-5 h-5" />, "Ism", userData.name)}
        //   {renderDetailItem(
        //     <Package className="w-5 h-5" />,
        //     "Maxsulot nomi",
        //     userData.product_name
        //   )}
        //   {renderDetailItem(
        //     <DollarSign className="w-5 h-5" />,
        //     "Narxi",
        //     userData.cost
        //   )}
        //   {renderDetailItem(
        //     <Phone className="w-5 h-5" />,
        //     "Telefon raqam 1",
        //     userData.phone_number
        //   )}
        //   {renderDetailItem(
        //     <Phone className="w-5 h-5" />,
        //     "Telefon raqam 2",
        //     userData.phone_number2
        //   )}
        //   {renderDetailItem(
        //     <Briefcase className="w-5 h-5" />,
        //     "Ish joyi ID",
        //     userData.workplace_name
        //   )}
        //   {renderDetailItem(
        //     <Calendar className="w-5 h-5" />,
        //     "Vaqt",
        //     userData.time
        //   )}
        //   {renderDetailItem(
        //     <MapPin className="w-5 h-5" />,
        //     "Zona ID",
        //     userData.zone_name
        //   )}
        //   {renderDetailItem(
        //     <UserCheck className="w-5 h-5" />,
        //     "Sotuvchi",
        //     userData.seller
        //   )}
        //   {renderDetailItem(
        //     <CreditCard className="w-5 h-5" />,
        //     "Passport seriyasi",
        //     userData.passport_series
        //   )}
        //   {renderDetailItem(
        //     <FileText className="w-5 h-5" />,
        //     "Tavsif",
        //     userData.description
        //   )}
        //   {renderDetailItem(
        //     <Calendar className="w-5 h-5" />,
        //     "Berilgan sana",
        //     new Date(userData.given_day).toLocaleString()
        //   )}
        // </div>
        <div className="">
          {/* <Button
            onClick={closeUserDetails}
            style={{ marginBottom: 16, marginTop: 20 }}
          >
            <IoMdArrowRoundBack className="mt-1" /> Orqaga
          </Button> */}
          <h3 className="font-bold text-[20px] my-5" style={{ marginTop: 20 }}>
            To'liq malumot
          </h3>
          <Table
            dataSource={getUserInfo(userData)}
            columns={userInfoColumns}
            showHeader={false}
            pagination={false}
            bordered
            loading={loading}
          />
          <h3 className="font-bold text-[20px] my-5" style={{ marginTop: 20 }}>
            To'lov Tarixi
          </h3>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          <Table
            dataSource={paymentHistory}
            columns={paymentColumns}
            pagination={{ pageSize: 5 }}
            bordered
            loading={loading}
          />
        </div>
      ) : (
        <p className="text-center text-lg">Ma'lumot topilmadi</p>
      )}
    </Modal>
  );
};

export default UserDetailsModal;
