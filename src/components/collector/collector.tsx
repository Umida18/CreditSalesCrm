import { useEffect, useState } from "react";
import { Table } from "antd";
import { MainLayout } from "../mainlayout";
import api from "../../Api/Api";

const Collector = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/collector/all-money");
      console.log("res", res);

      setData(res.data.result);
      return res.data;
    };
    fetch();
  }, []);

  console.log("data", data);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Hudud", dataIndex: "zone_name", key: "zone_name" },
    { title: "Yig'uvchi", dataIndex: "zone_name", key: "login" },
    { title: "Oy", dataIndex: "month", key: "month" },
    {
      title: "Jami yig'ilgan",
      dataIndex: "total_collected",
      key: "total_collected",
    },
    {
      title: "Jami to'lo'vlar",
      dataIndex: "total_payments",
      key: "total_payments",
    },
  ];

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-5">Yig'uvchilar ro'yxati</h1>
      <div className="">
        <Table dataSource={data} columns={columns} />
      </div>
    </MainLayout>
  );
};

export default Collector;
