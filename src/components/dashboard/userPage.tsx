"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Spin, Alert } from "antd";
import { MainLayout } from "../../components/mainlayout";
import { BASE_URL } from "../../config";
import { User, Building2, Phone, DollarSign } from "lucide-react";
import { ProductFilled } from "@ant-design/icons";
import { PiUniteSquare } from "react-icons/pi";
import { BsCash } from "react-icons/bs";
import PaymentModal from "./paymenModal";

interface UserData {
  id: number;
  name: string;
  product_name: string;
  phone_number: string;
  address: string;
  payment_status: boolean;
  created_at: string;
  workplace_name: string;
  cost: any;
}

export default function UsersPage() {
  const { id } = useParams();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/users/filter/${id}?page=${1}`
        );
        if (!response.ok)
          throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  const handleOpenModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ism",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ish joyi",
      dataIndex: "workplace_name",
      key: "workplace",
    },
    {
      title: "Maxsulot nomi",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Narxi",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Raqam 1",
      dataIndex: "phone_number",
      key: "phone",
    },
    {
      title: "Raqam 2",
      dataIndex: "phone_number2",
      key: "phone2",
    },

    {
      title: "To'lov holati",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (status: boolean) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {status ? "To'langan" : "To'lanmagan"}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (_: any, record: UserData) => (
        <button
          onClick={() => handleOpenModal(record.id)}
          className={`text-2xl ${
            record.payment_status ? "text-green-800" : "text-red-800"
          }`}
        >
          <BsCash />
        </button>
      ),
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert message="Xatolik" description={error} type="error" showIcon />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Foydalanuvchilar ro'yxati</h1>
        <p className="text-gray-600">
          Tanlangan hudud bo'yicha foydalanuvchilar
        </p>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          className="shadow-sm"
        />
      </div>

      {/* Mobile and Tablet view */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium">
                  Ism <span className="font-bold">{user.name}</span>
                </h3>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.payment_status
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.payment_status ? "To'langan" : "To'lanmagan"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm ">
              <div className="flex items-center space-x-2">
                <PiUniteSquare className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium">
                  ID: <span className="font-bold">{user.id}</span>
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>
                  Ish joyi{" "}
                  <span className="font-bold">{user.workplace_name}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>
                  Raqam: <span className="font-bold">{user.phone_number}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ProductFilled className="w-4 h-4" />
                <span>
                  Maxsulot nomi:{" "}
                  <span className="font-bold">{user.product_name}</span>
                </span>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>
                    Narxi <span className="font-bold">{user.cost}</span>
                  </span>
                </div>
                <button onClick={() => handleOpenModal(user.id)}>
                  <span
                    className={`text-2xl ${
                      user.payment_status ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    <BsCash />
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedUserId && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userId={selectedUserId}
        />
      )}
    </MainLayout>
  );
}
