import { Modal, Table, Button, message } from "antd";
import { useState } from "react";
import { BASE_URL } from "../../config";
import { IoMdArrowRoundBack } from "react-icons/io";
import api from "../../Api/Api";

const PaymentList = ({
  type,
  users,
  onClose,
}: {
  type: "notPaid" | "todayPaid" | "monthPaid";
  users: any[];
  onClose: () => void;
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("paymentHistory", paymentHistory);

  const titles = {
    notPaid: "To'lamaganlar Ro'yxati",
    todayPaid: "Bugun To'laganlar Ro'yxati",
    monthPaid: "Bu Oy To'laganlar Ro'yxati",
  };

  const openUserDetails = async (userId: string) => {
    setLoading(true);
    try {
      const userResponse = await fetch(`${BASE_URL}/users/${userId}`);
      if (!userResponse.ok) {
        throw new Error(
          "Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi"
        );
      }
      const userData = await userResponse.json();
      setSelectedUser(userData);
      await fetchPaymentHistory(userId);
    } catch (err) {
      setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi");
      message.error("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const closeUserDetails = () => {
    setSelectedUser(null);
    setPaymentHistory([]);
    setError("");
  };

  const fetchPaymentHistory = async (userId: string) => {
    try {
      console.log("userId123456", userId);
      const response = await api.get(`/payment/history/${userId}`);
      console.log("responsehistory", response.data);
      console.log("response", response);

      setPaymentHistory(response.data || []);
    } catch (err) {
      setError("To'lov tarixini olishda xatolik yuz berdi");
      message.error("To'lov tarixini olishda xatolik yuz berdi");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Ismi", dataIndex: "name", key: "name" },
    { title: "Maxsulot nomi", dataIndex: "product_name", key: "product_name" },
    { title: "Manzili", dataIndex: "zone_name", key: "zone_name" },
    { title: "Narxi", dataIndex: "cost", key: "cost" },
    {
      title: "Berilgan vaqti",
      dataIndex: "given_day",
      key: "given_day",
      render: (text: string) =>
        text ? new Date(text).toLocaleString("en-GB") : "Noma'lum",
    },
    { title: "Muddati", dataIndex: "time", key: "time" },
    { title: "Tel nomer", dataIndex: "phone_number", key: "phone_number" },
    { title: "Sotuvchi", dataIndex: "seller", key: "seller" },
  ];

  const userInfoColumns = [
    { title: "Ma'lumot", dataIndex: "label", key: "label" },
    { title: "Qiymat", dataIndex: "value", key: "value" },
  ];

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

  // console.log("paymentHistory34567", paymentHistory);

  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={null}
      title={
        selectedUser ? (
          <div>
            <Button onClick={closeUserDetails} style={{ marginBottom: 20 }}>
              <IoMdArrowRoundBack className="mt-1" />
            </Button>{" "}
            <span className="ml-4" style={{ fontWeight: 700, fontSize: 24 }}>
              {titles[type]}
            </span>
          </div>
        ) : (
          <span style={{ fontWeight: 700, fontSize: 24 }}>{titles[type]}</span>
        )
      }
      className="overflow-y-auto !min-h-[600px] sticky xl:min-w-[1000px]"
      style={{ borderRadius: "12px", top: 20 }}
    >
      {selectedUser ? (
        <div className="max-h-[600px] overflow-y-auto">
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
            dataSource={getUserInfo(selectedUser)}
            columns={userInfoColumns}
            showHeader={false}
            pagination={false}
            bordered
            loading={loading}
          />
          <h3 className="font-bold text-[20px] my-5" style={{ marginTop: 20 }}>
            To'lov Tarixi
          </h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Table
            dataSource={paymentHistory}
            columns={paymentColumns}
            pagination={{ pageSize: 5 }}
            bordered
            loading={loading}
          />
        </div>
      ) : (
        <Table
          className="!min-h-[500px]"
          dataSource={Array.isArray(users) ? users.flat() : []}
          columns={columns}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => openUserDetails(record.id),
            style: { cursor: "pointer" },
          })}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
          bordered
        />
      )}
    </Modal>
  );
};

export default PaymentList;
