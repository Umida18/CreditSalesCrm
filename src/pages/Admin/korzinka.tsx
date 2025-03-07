import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Popconfirm,
  message,
  Card,
  List,
  Divider,
} from "antd";
import {
  Trash2,
  Copy,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Package,
  User,
  Info,
} from "lucide-react";
import api from "../../Api/Api";
import { MainLayout } from "../../components/mainlayout";
import dayjs from "dayjs";
// import { useMediaQuery } from "react-responsive";

// Define the type for our data
interface RecycleItem {
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
  recycle: boolean;
  updatedat: string;
  last_payment_amount: string;
  last_payment_date: string;
}

const { Title, Text } = Typography;

const Korzinka = () => {
  const [recycleItems, setRecycleItems] = useState<RecycleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if the screen is mobile size
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/recycle");
      setRecycleItems(res.data);
    } catch (error) {
      console.error("Error fetching recycle data:", error);
      message.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/recycle/out/${id}`);
      message.success("Muvaffaqiyatli oʻchirildi");

      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("O‘chirib bo‘lmadi");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Mijoz",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: RecycleItem) => (
        <Space direction="vertical" size="small">
          <Text strong>{text}</Text>
          <Text type="secondary">{record.passport_series}</Text>
        </Space>
      ),
    },
    {
      title: "Mahsulot",
      dataIndex: "product_name",
      key: "product_name",
      render: (text: string, record: RecycleItem) => (
        <Space direction="vertical" size="small">
          <Text>{text}</Text>
          <Text type="secondary">{record.description}</Text>
        </Space>
      ),
    },
    {
      title: "Narx",
      dataIndex: "cost",
      key: "cost",
      render: (cost: number) => `${cost.toLocaleString()} UZS`,
    },
    {
      title: "Contact",
      key: "contact",
      render: (record: RecycleItem) => (
        <Space direction="vertical" size="small">
          <div className="flex items-center">
            <Text className="mr-2">{record.phone_number}</Text>
            <Button
              type="text"
              className="p-0 flex items-center"
              onClick={() => copyToClipboard(record.phone_number)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          {record.phone_number2 && (
            <div className="flex items-center">
              <Text type="secondary" className="mr-2">
                {record.phone_number2}
              </Text>
              <Button
                type="text"
                className="p-0 flex items-center"
                onClick={() => copyToClipboard(record.phone_number2)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Space>
      ),
    },
    {
      title: "To'lov holati",
      key: "payment_status",
      render: (record: RecycleItem) => (
        <Space direction="vertical" size="small">
          <Tag color={record.payment_status ? "success" : "error"}>
            {record.payment_status ? "To'langan" : "To'lanmagan"}
          </Tag>
          <Text type="secondary">
            Oxirgi to'lov:{" "}
            {parseFloat(record.last_payment_amount).toLocaleString()} UZS
          </Text>
          <Text type="secondary">
            Sana: {dayjs(record.last_payment_date).format("DD/MM/YYYY")}
          </Text>
        </Space>
      ),
    },
    {
      title: "Location",
      key: "location",
      render: (record: RecycleItem) => (
        <Space direction="vertical" size="small">
          <Text>{record.zone_name}</Text>
          <Text type="secondary">{record.workplace_name}</Text>
        </Space>
      ),
    },
    {
      title: "Sana",
      key: "date",
      render: (record: RecycleItem) => (
        <Space direction="vertical" size="small">
          <Text>{dayjs(record.given_day).format("DD/MM/YYYY")}</Text>
          <Text type="secondary">
            Updated: {dayjs(record.updatedat).format("DD/MM/YYYY")}
          </Text>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: RecycleItem) => (
        <Popconfirm
          title="Bu foydalanuvchini oʻchirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo‘lmaydi."
          onConfirm={() => handleDelete(record.id)}
          okText="Ha"
          cancelText="Yo'q"
        >
          <Button danger className="flex items-center justify-center">
            <Trash2 className="w-4 h-4 mr-1" />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // Mobile card view rendering
  const renderMobileView = () => {
    return (
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={recycleItems}
        loading={loading}
        renderItem={(item) => (
          <List.Item>
            <Card
              className="w-full shadow-sm"
              title={
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-500" />
                    <span>{item.name}</span>
                  </div>
                  <Tag color={item.payment_status ? "success" : "error"}>
                    {item.payment_status ? "To'langan" : "To'lanmagan"}
                  </Tag>
                </div>
              }
              actions={[
                <Popconfirm
                  key="delete"
                  title="Are you sure you want to delete this item?"
                  onConfirm={() => handleDelete(item.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    danger
                    className="flex items-center justify-center mx-auto"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <div className="space-y-3">
                <div className="flex items-start">
                  <Package className="w-5 h-5 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <Text strong className="block">
                      {item.product_name}
                    </Text>
                    <Text type="secondary">{item.description}</Text>
                  </div>
                </div>

                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-purple-500" />
                  <Text strong>{item.cost.toLocaleString()} UZS</Text>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-2 text-blue-500 mt-0.5" />
                  <div>
                    <div className="flex items-center">
                      <Text className="mr-2">{item.phone_number}</Text>
                      <Button
                        type="text"
                        className="p-0 flex items-center"
                        onClick={() => copyToClipboard(item.phone_number)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    {item.phone_number2 && (
                      <div className="flex items-center mt-1">
                        <Text type="secondary" className="mr-2">
                          {item.phone_number2}
                        </Text>
                        <Button
                          type="text"
                          className="p-0 flex items-center"
                          onClick={() => copyToClipboard(item.phone_number2)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-red-500 mt-0.5" />
                  <div>
                    <Text className="block">{item.zone_name}</Text>
                    <Text type="secondary">{item.workplace_name}</Text>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-2 text-orange-500 mt-0.5" />
                  <div>
                    <Text className="block">
                      Created: {dayjs(item.given_day).format("DD/MM/YYYY")}
                    </Text>
                    <Text type="secondary">
                      Updated: {dayjs(item.updatedat).format("DD/MM/YYYY")}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start">
                  <Info className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <Text className="block">ID: {item.id}</Text>
                    <Text type="secondary">
                      Passport: {item.passport_series}
                    </Text>
                  </div>
                </div>

                <Divider className="my-3" />

                <div className="flex items-start">
                  <CreditCard className="w-5 h-5 mr-2 text-teal-500 mt-0.5" />
                  <div>
                    <Text className="block">
                      Last Payment:{" "}
                      {parseFloat(item.last_payment_amount).toLocaleString()}{" "}
                      UZS
                    </Text>
                    <Text type="secondary">
                      Date: {dayjs(item.last_payment_date).format("DD/MM/YYYY")}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
        pagination={{
          pageSize: 5,
          size: "small",
          showSizeChanger: false,
        }}
      />
    );
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-4">
          <Title level={isMobile ? 3 : 2} className="m-0">
            Recycled Items
          </Title>
        </div>

        {isMobile ? (
          renderMobileView()
        ) : (
          <Table
            columns={columns}
            dataSource={recycleItems}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1400 }}
            className="overflow-x-auto "
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Korzinka;
