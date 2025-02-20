import React, { useEffect, useState } from "react";
import { Modal, DatePicker, Radio, Input, Form, message, Select } from "antd";
import { BsCash } from "react-icons/bs";
import api from "../../Api/Api";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [form] = Form.useForm();
  const [isMonthlyPayment, setIsMonthlyPayment] = useState(false);
  const { id } = useParams();
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [collectors, setCollectors] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedCollector, setSelectedCollector] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchZone = async () => {
      try {
        const res = await api.get(`/zone/${id}`);
        setSelectedZone(res.data.id);
      } catch (error) {
        console.error("Failed to fetch zone:", error);
      }
    };
    fetchZone();
  }, [id]);

  useEffect(() => {
    const fetchCollector = async () => {
      if (!selectedZone) return;

      try {
        const res = await api.post("/collector/filter", {
          zone_id: selectedZone,
          payment_status: true,
        });

        setCollectors(res.data);
      } catch (error) {
        console.error("Failed to fetch collectors:", error);
      }
    };

    fetchCollector();
  }, [selectedZone]);

  const handleSubmit = async (values: any) => {
    if (!selectedCollector) {
      message.error("Collectorni tanlang");
      return;
    }

    const paymentData = {
      amount: Number(values.amount),
      collector_id: selectedCollector,
      zone_id: selectedZone,
      payment_month: isMonthlyPayment
        ? values.paymentDate.format("MMMM")
        : undefined,
      payment_date: values.paymentDate.format("YYYY-MM-DD"),
      type: isMonthlyPayment,
      description: values.description,
    };

    try {
      const response = await fetch(`${BASE_URL}/payment/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      message.success("Payment added successfully");
      onClose();
      form.resetFields();
      setSelectedCollector(null);
    } catch (error) {
      message.error("Failed to add payment");
    }
  };

  return (
    <Modal
      style={{ top: 30 }}
      // title="To'lo'v qo'shish"
      title={<h2 className="text-2xl font-bold mb-4">To'lo'v qo'shish</h2>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="max-w-md relative top-5"
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="amount"
          label="To'lo'v miqdori"
          rules={[{ required: true }]}
        >
          <Input prefix={<BsCash className="text-gray-400" />} type="number" />
        </Form.Item>
        <Form.Item name="paymentDate" label="Sana" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item name="isMonthly" label="Bu oy uchunmi?">
          <Radio.Group onChange={(e) => setIsMonthlyPayment(e.target.value)}>
            <Radio value={true}>Ha</Radio>
            <Radio value={false}>Yo'q</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="collector"
          label="Yig'uvchini"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Yig'uvchini tanlang"
            onChange={(value) => setSelectedCollector(value)}
          >
            {collectors.map((collector) => (
              <Select.Option key={collector.id} value={collector.id}>
                {collector.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Izoh">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit Payment
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PaymentModal;
