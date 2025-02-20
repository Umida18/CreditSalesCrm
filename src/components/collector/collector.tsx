import { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import { BASE_URL } from "../../config";
import { MainLayout } from "../mainlayout";

const Collector = () => {
  const [data, setData] = useState<any>([]);

  const fetchCollectors = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/collector`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching collectors:", error);
    }
  }, []);

  useEffect(() => {
    fetchCollectors();
  }, [fetchCollectors]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "login", dataIndex: "login", key: "login" },
    {
      title: "Created At",
      dataIndex: "createdat",
      key: "createdat",
      render: (date: any) => new Date(date).toLocaleString("en-GB"),
    },
  ];

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-5">Yig'uvchilar ro'yxati</h1>
      <div className="">
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </MainLayout>
  );
};

export default Collector;
