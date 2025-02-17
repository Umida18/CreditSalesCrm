import { Button, Table, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MainLayout } from "../../components/mainlayout";
import { BsCashCoin } from "react-icons/bs";
import CardsStatistic from "../../components/dashboard/cardsStatistic";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Ismi",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Manzili",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Narxi",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Telefon",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status: string) => (
      <Tag color={status === "To'landi" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <button className=" cursor-pointer">
        <BsCashCoin className="text-green-600 text-2xl" />
      </button>
    ),
  },
];

const data = [
  {
    id: 1,
    name: "Dilafruz Anvarova",
    address: "salom",
    price: "234,124",
    phone: "8903334455",
    status: "To'landi",
  },
  {
    id: 2,
    name: "Kamronjon",
    address: "bog'i eram",
    price: "3,000,000",
    phone: "+998908901234",
    status: "To'landi",
  },
  {
    id: 3,
    name: "Ruzimuhammad Isomiddin",
    address: "toshkent",
    price: "1,500,000",
    phone: "8940118375",
    status: "To'lanmadi",
  },
  {
    id: 4,
    name: "yulduz",
    address: "chirchiq",
    price: "1,500,000",
    phone: "8903334455",
    status: "To'lanmadi",
  },
  {
    id: 5,
    name: "Shoxrux Ganiyev",
    address: "yunusobod",
    price: "15,000,000",
    phone: "+998909990011",
    status: "To'landi",
  },
];

export default function Zone() {
  return (
    <MainLayout>
      <h1 style={{ fontSize: "24px", marginBottom: "24px" }}>Dashboard</h1>

      <CardsStatistic />
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "16px", display: "flex", gap: "16px" }}
      >
        <div>
          <Button type="primary" icon={<PlusOutlined />}>
            Klient qo'shish
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </MainLayout>
  );
}
