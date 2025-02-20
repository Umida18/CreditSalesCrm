import { Button, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import PaymentModal from "../dashboard/paymentModal";
import TableHeader from "../dashboard/header";
import DashboardCard from "../dashboard/cardResponsiv";
import { useNavigate } from "react-router-dom";
import { BsPeople } from "react-icons/bs";
import { CollectorLayout } from "../collectorLayout";

export default function DashboardCollector() {
  const [data, setData] = useState<any[]>([]);
  const [zones, setZones] = useState([]);
  // const [_____, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, ____] = useState(1);
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [___, setError] = useState("");
  const [selectPayUser] = useState("");
  const [_, setTotalPages] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const token = localStorage.getItem("tokenCollector");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!BASE_URL) {
      setError("API URL aniqlanmagan! Iltimos, .env faylni tekshiring.");
      return;
    }

    const fetchUserCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/count`);
        if (!response.ok) {
          throw new Error("Foydalanuvchilar sonini olishda xatolik yuz berdi");
        }
        const { count } = await response.json();
        setTotalPages(Math.ceil(count / itemsPerPage));
      } catch (error: any) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        await fetchUserCount();

        let url = `${BASE_URL}/zone`;
        if (selectedZone) {
          url += `&zone=${selectedZone}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
        }
        const responseData = await response.json();
        setData(responseData.data || responseData);

        // Zonalar ma'lumotlarini olish
        const zonesResponse = await fetch(`${BASE_URL}/zone`);
        if (!zonesResponse.ok) {
          throw new Error("Zonelarni yuklashda xatolik yuz berdi");
        }
        const zonesData = await zonesResponse.json();
        setZones(zonesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedZone]);

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedUser(null);
  };

  const handlePayment = async (paymentData: any) => {
    try {
      const response = await fetch(
        `${BASE_URL}/payment/add/${selectedUser?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (response.ok) {
        notification.success({
          message: "To'lov muvaffaqiyatli amalga oshirildi!",
          placement: "topRight",
        });

        closePaymentModal();
        const updatedData = data.map((user: any) =>
          user.id === selectedUser?.id
            ? { ...user, payment_status: true }
            : user
        );
        setData(updatedData);
      } else {
        throw new Error("Xatolik");
      }
    } catch (error: any) {
      setError(error.message);
      notification.error({
        message: "To'lovda xatolik yuz berdi!",
        description: error.message,
        placement: "topRight",
      });
    }
  };

  const filteredData = data.filter((item: any) => {
    const matchesSearch =
      searchTerm.length >= 2
        ? (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.product_name &&
            item.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
    const matchesZone = selectedZone
      ? item.zone === selectedZone.toString()
      : true;

    return matchesSearch && matchesZone;
  });

  const columns = [
    {
      title: "Id",
      key: "id",
      render: (_: any, __: any, index: any) =>
        index + 1 + (currentPage - 1) * itemsPerPage,
    },
    {
      title: "Hudud nomi",
      dataIndex: "zone_name",
      key: "zone_name",
    },
    {
      title: "Tavsif",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (_: any, record: any) => (
        <Button
          type="primary"
          icon={<BsPeople size={16} />}
          onClick={() => handleRowClick(record)}
        >
          Foydalanuvchilar
        </Button>
      ),
    },

    // {
    //   title: "Ismi",
    //   dataIndex: "name",
    //   key: "name",
    //   render: (text: any, record: any) => (
    //     <a
    //       onClick={() => {
    //         setSelectedUser(record);
    //         setIsModalOpen(true);
    //       }}
    //     >
    //       {text}
    //     </a>
    //   ),
    // },
  ];

  const handleRowClick = (record: any) => {
    navigate(`/usersCollector/${record.id}`);
  };

  return (
    <CollectorLayout>
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

      {/* <CardsStatistic /> */}
      <TableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        zones={zones}
        setData={setData}
      />

      {/* Desktop view */}
      <div className="hidden md:block">
        <Table
          columns={columns}
          loading={loading}
          dataSource={filteredData ? filteredData : data}
          rowClassName="cursor-pointer hover:bg-gray-50"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>

      {/* Mobile and Tablet view */}
      <div className="md:hidden">
        {(filteredData ? filteredData : data).map((item: any) => (
          <DashboardCard
            key={item.id}
            item={item}
            // onActionClick={() => {
            //   setSelectedUser(item);
            //   setIsPaymentModalOpen(true);
            // }}
          />
        ))}
      </div>

      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          closeModal={closePaymentModal}
          handlePayment={handlePayment}
          userName={selectPayUser}
        />
      )}
    </CollectorLayout>
  );
}
