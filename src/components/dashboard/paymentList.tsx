import { Modal, Table } from "antd";
import { useState } from "react";
import UserModal from "./useModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const titles = {
    notPaid: "To'lamaganlar Ro'yxati",
    todayPaid: "Bugun To'laganlar Ro'yxati",
    monthPaid: "Bu Oy To'laganlar Ro'yxati",
  };

  const openModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Ismi", dataIndex: "name", key: "name" },
    { title: "Manzili", dataIndex: "zone", key: "zone" },
    { title: "Narxi", dataIndex: "cost", key: "cost" },
    {
      title: "Berilgan vaqti",
      dataIndex: "given_day",
      key: "given_day",
      render: (text: any) =>
        text ? new Date(text).toLocaleString("en-GB") : "Noma'lum",
    },
    { title: "Muddati", dataIndex: "time", key: "time" },
    { title: "Tel nomer", dataIndex: "phone_number", key: "phone_number" },
    { title: "Yig'uvchi", dataIndex: "collector", key: "collector" },
  ];

  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={null}
      title={<span style={{ color: "#1890ff" }}>{titles[type]}</span>}
      className=" overflow-y-auto h-[600px] sticky xl:min-w-[900px] "
      style={{ borderRadius: "12px" }}
    >
      <Table
        dataSource={Array.isArray(users) ? users.flat() : []}
        columns={columns}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => openModal(record),
          style: { cursor: "pointer" },
        })}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        bordered
      />
      {isModalOpen && <UserModal user={selectedUser} closeModal={closeModal} />}
    </Modal>
  );
};

export default PaymentList;
