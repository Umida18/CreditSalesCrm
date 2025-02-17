import { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";
import { BASE_URL } from "../../config";
import { MainLayout } from "../mainlayout";

const CollectorMoney = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/collector/all-money`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Serverdan noto‘g‘ri javob keldi");
        }
        return response.json();
      })
      .then((result) => {
        setData(result?.result || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch xatosi:", err);
        setError("Ma'lumotlarni olishda xatolik yuz berdi");
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Yig'uvchi",
      dataIndex: "collector_name",
      key: "collector_name",
    },
    {
      title: "Miqdor",
      dataIndex: "total_collected",
      key: "total_collected",
      render: (amount: any) => `${Number(amount).toLocaleString()} so'm`,
    },
  ];

  if (loading)
    return <Spin tip="Yuklanmoqda..." className="flex justify-center mt-5" />;
  if (error)
    return <Alert message={error} type="error" showIcon className="mb-4" />;

  return (
    <MainLayout>
      <div className="">
        <h2 className="text-2xl font-semibold mb-4">
          Yig'uvchilar yig'gan To'lovlar
        </h2>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="collector_name"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </MainLayout>
  );
};

export default CollectorMoney;
