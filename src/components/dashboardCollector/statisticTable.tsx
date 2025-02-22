import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface CollectorData {
  id: number;
  name: string;
  product_name: string;
  cost: number;
  phone_number: string;
  phone_number2: string;
  time: number;
  seller: string;
  zone_name: string;
  workplace_name: string;
  payment_status: boolean;
  monthly_income: number;
  payment: number;
  passport_series: string;
  description: string;
  given_day: string;
  updatedat: string;
}

interface CollectorTableProps {
  data: CollectorData[];
}

export default function CollectorTable({ data }: CollectorTableProps) {
  const columns: ColumnsType<CollectorData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mahsulot",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Narx",
      dataIndex: "cost",
      key: "cost",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: "Hudud",
      dataIndex: "zone_name",
      key: "zone_name",
    },
    {
      title: "Ish joyi",
      dataIndex: "workplace_name",
      key: "workplace_name",
    },
    {
      title: "To'lo'v Statusi",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (value) => (value ? "Paid" : "Unpaid"),
    },
    {
      title: "Oylik daromad",
      dataIndex: "monthly_income",
      key: "monthly_income",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: "To'lo'v",
      dataIndex: "payment",
      key: "payment",
      render: (value) => `$${value.toFixed(2)}`,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      scroll={{ x: true }}
    />
  );
}
