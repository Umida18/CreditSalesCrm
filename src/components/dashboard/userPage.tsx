"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Table,
  Alert,
  Select,
  Button,
  Input,
  Modal,
  Form,
  DatePicker,
  message,
} from "antd";
import { MainLayout } from "../../components/mainlayout";
import { BASE_URL } from "../../config";
import {
  User,
  Building2,
  Phone,
  DollarSign,
  Search,
  Pen,
  Trash,
} from "lucide-react";
import { ProductFilled } from "@ant-design/icons";
import { PiUniteSquare } from "react-icons/pi";
import { BsCash, BsCashCoin } from "react-icons/bs";
import PaymentModal from "./paymenModal";
import UserDetailsModal from "./userDetails";
import UserHistoryPaymentModal from "./userHistoryPaymentModal";
import moment from "moment";
import api from "../../Api/Api";

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
  zone_id: number;
  workplace_id: number;
  given_day: string;
  phone_number2: string;
  time: number;
  seller: string;
  passport_series: string;
  description: string;
  last_payment_amount: any;
}

interface Workplace {
  id: number;
  workplace_name: string;
}

export default function UsersPage() {
  const { id } = useParams();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [isOpenUserHistoryModalOpen, setIsOpenUserHistoryModal] =
    useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [userDetailsLoading, setUserDetailsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");

  const [workplaceId, setWorkplaceId] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<boolean | null>(null);
  const [workplaces, setWorkplaces] = useState<Workplace[]>([]);
  const [workplaceError, setWorkplaceError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [form] = Form.useForm();

  console.log("users", users);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/users/filter/${id}?page=${1}`);

      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchWorkplaces = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/workplace`);
      if (!response.ok)
        throw new Error("Ish joylarini yuklashda xatolik yuz berdi");
      const data = await response.json();
      setWorkplaces(data);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchWorkplaces();
  }, [fetchUsers, fetchWorkplaces]);

  const handleFilterWorkplace = async (selectedWorkplaceId?: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/users/filter-workplace?page=1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            zone_id: Number(id),
            workplace_id: selectedWorkplaceId ?? workplaceId,
          }),
        }
      );
      if (!response.ok) throw new Error("Filtrlashda xatolik yuz berdi");
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterUsers = async () => {
    if (!workplaceId) {
      setWorkplaceError("Ish joyini ham tanlang");
      return;
    }
    setWorkplaceError(null);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/users/filter?page=${1}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          zone_id: Number(id),
          payment_status: paymentStatus,
        }),
      });
      if (!response.ok) throw new Error("Filtrlashda xatolik yuz berdi");
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleOpenPaymentModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedUserId(null);
  };

  const handleOpenUserDetailsModal = async (userId: number) => {
    setUserDetailsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`);
      if (!response.ok)
        throw new Error(
          "Foydalanuvchi ma'lumotlarini yuklashda xatolik yuz berdi"
        );
      const data = await response.json();
      setSelectedUserDetails(data);
      setIsUserDetailsModalOpen(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUserDetailsLoading(false);
    }
  };

  // const handleOpenUserHistoryModal = async (userId: number) => {
  //   setUserDetailsLoading(true);
  //   try {
  //     const response = await fetch(`${BASE_URL}/users/${userId}`);
  //     if (!response.ok)
  //       throw new Error(
  //         "Foydalanuvchi ma'lumotlarini yuklashda xatolik yuz berdi"
  //       );
  //     const data = await response.json();
  //     setSelectedUserDetails(data);
  //     setIsOpenUserHistoryModal(true);
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setUserDetailsLoading(false);
  //   }
  // };

  const handleCloseUserDetailsModal = () => {
    setIsUserDetailsModalOpen(false);
    setSelectedUserDetails(null);
  };
  const handleCloseUserHistoryModal = () => {
    setIsOpenUserHistoryModal(false);
    setSelectedUserDetails(null);
  };

  const handleEditUser = async (userId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`);
      if (!response.ok)
        throw new Error(
          "Foydalanuvchi ma'lumotlarini yuklashda xatolik yuz berdi"
        );
      const userData = await response.json();

      setEditingUser(userData);
      form.setFieldsValue({
        ...userData,
        // workplace_name: work,
        given_day: moment(userData.given_day),
      });
      setIsEditModalOpen(true);
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditSubmit = async (values: any) => {
    try {
      const work = workplaces?.find(
        (w: any) => w?.workplace_name === editingUser?.workplace_name
      )?.id;

      await fetch(`${BASE_URL}/users/update/${editingUser?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...values,
          workplace_id: work,
          zone_id: id,
          given_day: values.given_day.toISOString(),
        }),
      });

      setIsEditModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bu foydalanuvchini oʻchirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo‘lmaydi."
    );

    if (confirmDelete) {
      try {
        await api.delete(`/users/delete/${id}`);
        message.success("Muvaffaqiyatli ochirildi");
        fetchUsers();
      } catch (error) {
        console.log(error);
        message.error("An error occurred while deleting the user");
      }
    }
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
      render: (text: any) => Number(text).toLocaleString() + " UZS",
    },
    {
      title: "Raqam 1",
      dataIndex: "phone_number",
      key: "phone",
      render: (text: any) => <a href={`tel:${text}`}>{text}</a>,
    },
    {
      title: "So'nggi to'lov miqdori",
      dataIndex: "last_payment_amount",
      key: "last_payment_amount",
      render: (amount: string, record: { payment_status: boolean }) => (
        <span
          className={`font-medium ${
            record.payment_status ? "text-green-500" : "text-red-500"
          }`}
        >
          {amount ? Number(amount).toLocaleString() + " UZS" : "0 UZS"}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (_: any, record: UserData) => (
        <div className="flex gap-2 justify-between   items-center">
          <button
            className=" cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenPaymentModal(record.id);
            }}
          >
            <span
              className={`text-2xl ${
                record.payment_status ? "text-green-800" : "text-red-800"
              }`}
            >
              <BsCash />
            </span>
          </button>
          <button
            className="bg-green-600 py-1 px-1 text-[12px] text-white rounded-md cursor-pointer"
            onClick={() => handleEditUser(record.id)}
          >
            <Pen className="text-[8px] size-5" />
          </button>
          <button
            className="bg-red-600 py-1 px-1 text-[15px] text-white rounded-md cursor-pointer"
            onClick={() => handleDeleteUser(record.id)}
          >
            <Trash className="text-[8px] size-5" />
          </button>
          <button
            className="bg-blue-600 py-1 px-3 text-white rounded-md cursor-pointer"
            onClick={() => handleOpenUserDetailsModal(record.id)}
          >
            Batafsil
          </button>
          {/* <button
            className="bg-blue-600 py-1 px-3 text-white rounded-md cursor-pointer"
            onClick={() => handleOpenUserHistoryModal(record.id)}
          >
            To'lov tarixi
          </button> */}
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <MainLayout>
        <Alert message="Xatolik" description={error} type="error" showIcon />
      </MainLayout>
    );
  }

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      fetchUsers();
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${BASE_URL}/users/search/${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Foydalanuvchilar ro'yxati</h1>
        <p className="text-gray-600">
          <span className="capitalize font-bold">{title}</span> tanlangan hudud
          bo'yicha foydalanuvchilar
        </p>
      </div>

      <div className="flex justify-between xl:flex-row flex-col xl:items-center items-start">
        <div className="mb-4 space-x-4 flex items-center gap-1">
          <Input
            placeholder="Qidirish (telefon, ism yoki ID)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 180 }}
          />
          <Button type="primary" onClick={handleSearch} loading={isSearching}>
            <Search className="size-4" />
          </Button>
        </div>

        <div className="flex gap-2 xl:flex-row flex-col xl:items-center items-start">
          <div className="mb-4 space-x-4 flex items-center flex-col gap-1">
            <Select
              placeholder="Workplace"
              value={workplaceId}
              onChange={(value) => {
                setWorkplaceId(value);
                handleFilterWorkplace(value);
              }}
              style={{ width: 180 }}
            >
              {workplaces.map((workplace) => (
                <Select.Option key={workplace.id} value={workplace.id}>
                  {workplace.workplace_name}
                </Select.Option>
              ))}
            </Select>
            {workplaceError && (
              <p className="text-red-500 text-sm mt-1">{workplaceError}</p>
            )}
          </div>

          <div className="mb-4 space-x-4 flex items-center gap-1">
            <Select
              placeholder="To'lov holati"
              onChange={(value) => setPaymentStatus(value)}
              style={{ width: 180 }}
            >
              <Select.Option value={true}>To'langan</Select.Option>
              <Select.Option value={false}>To'lanmagan</Select.Option>
            </Select>
            <Button
              type="primary"
              onClick={() => {
                setWorkplaceError(null);
                handleFilterUsers();
              }}
            >
              <Search className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          className="shadow-sm"
          loading={loading}
        />
      </div>

      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div className="bg-white flex flex-col rounded-lg shadow-md p-4 h-full">
            <div key={user.id} className="  space-y-3 min-h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <h3 className="font-medium">
                    Ism:{" "}
                    <span
                      className="font-bold cursor-pointer text-blue-600 underline"
                      onClick={() => handleOpenUserDetailsModal(user.id)}
                    >
                      {user.name}
                    </span>
                  </h3>
                </div>
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
                    Raqam:{" "}
                    <a
                      href={`tel:${user.phone_number}`}
                      className="text-blue-500 !underline font-bold"
                    >
                      {user.phone_number}
                    </a>
                    {/* <span className="font-bold">{user.phone_number}</span> */}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ProductFilled className="w-4 h-4" />
                  <span>
                    Maxsulot nomi:{" "}
                    <span className="font-bold">{user.product_name}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>
                    Narxi:{" "}
                    <span className="font-bold">
                      {Number(user.cost).toLocaleString()}
                    </span>
                  </span>
                </div>
                <span
                  className={` py-1 rounded-full flex items-center gap-2 font-bold ${
                    user.payment_status ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <BsCashCoin className="w-4 h-4 mt-1 text-black" />
                  <span>
                    <span className="font-medium text-black mr-1">
                      So'ngi To'lov:
                    </span>{" "}
                    {Number(user.last_payment_amount).toLocaleString()}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between min-h-full mt-3 w-full">
              <div className="flex justify-between w-full  items-center">
                <button
                  className=" cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPaymentModal(user.id);
                  }}
                >
                  <span
                    className={`text-2xl ${
                      user.payment_status ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    <BsCash />
                  </span>
                </button>
                <button
                  className="bg-green-600 py-1 px-1 text-[12px] text-white rounded-md cursor-pointer"
                  onClick={() => handleEditUser(user.id)}
                >
                  <Pen className="text-[8px] size-5" />
                </button>
                <button
                  className="bg-red-600 py-1 px-1 text-[15px] text-white rounded-md cursor-pointer"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash className="text-[8px] size-5" />
                </button>
                <button
                  className="bg-blue-600 py-1 px-3 text-white rounded-md cursor-pointer"
                  onClick={() => handleOpenUserDetailsModal(user.id)}
                >
                  Batafsil
                </button>
                {/* <button
                  className="bg-blue-600 py-1 px-3 text-white rounded-md cursor-pointer"
                  onClick={() => handleOpenUserHistoryModal(user.id)}
                >
                  To'lov tarixi
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedUserId && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
          userId={selectedUserId}
          fetchUsers={fetchUsers}
        />
      )}
      <UserHistoryPaymentModal
        isOpen={isOpenUserHistoryModalOpen}
        onClose={handleCloseUserHistoryModal}
        userData={selectedUserDetails}
      />

      <UserDetailsModal
        isOpen={isUserDetailsModalOpen}
        onClose={handleCloseUserDetailsModal}
        userData={selectedUserDetails}
        loading={userDetailsLoading}
      />
      <Modal
        title="Foydalanuvchi ma'lumotlarini tahrirlash"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        className="max-h-[600px]"
      >
        <div className="max-h-[500px] overflow-y-auto px-2 mt-4">
          <Form
            className=""
            form={form}
            onFinish={handleEditSubmit}
            layout="vertical"
          >
            <Form.Item name="name" label="Ism" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="product_name"
              label="Mahsulot nomi"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="cost" label="Narxi" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="phone_number"
              label="Telefon raqami"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="phone_number2" label="Qo'shimcha telefon raqami">
              <Input />
            </Form.Item>
            {/* <Form.Item
              name="workplace_id"
              label="Ish joyi ID"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Workplace"
                value={"workplace_name"}
                style={{ width: 180 }}
              >
                {workplaces.map((workplace) => (
                  <Select.Option key={workplace.id} value={workplace.id}>
                    {workplace.workplace_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item name="time" label="Vaqt" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            {/* <Form.Item
              name="zone_id"
              label="Hudud ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item name="seller" label="Sotuvchi">
              <Input />
            </Form.Item>
            <Form.Item name="passport_series" label="Passport seriyasi">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Tavsif">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="given_day"
              label="Berilgan sana"
              rules={[{ required: true }]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Saqlash
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </MainLayout>
  );
}
