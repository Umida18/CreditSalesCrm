import { useState } from "react";
import { Modal, DatePicker, Radio, Input, Form, message } from "antd";
import { BsCash } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import moment from "moment";

const PaymentModal = ({ isOpen, onClose, userId, fetchUsers }: any) => {
  const [form] = Form.useForm();
  const [isMonthlyPayment, setIsMonthlyPayment] = useState(false);
  const { id } = useParams();
  //   const [selectedZone, setSelectedZone] = useState<
  //     { id: number; zone_name: string }[]
  //   >([]);

  const idCollector = localStorage.getItem("collectorId");
  console.log("idCollectorsdfgh", idCollector);

  //   useEffect(() => {
  //     const fetchZone = async () => {
  //       try {
  //         const res = await api.get(`/zone`);
  //         setSelectedZone(res.data);
  //       } catch (error) {
  //         console.error("Failed to fetch zone:", error);
  //       }
  //     };
  //     fetchZone();
  //   }, [id]);

  //   useEffect(() => {
  //     const fetchCollector = async () => {
  //       if (!selectedZone) return;

  //       try {
  //         const res = await api.get("/collector");

  //         setCollectors(res.data);
  //       } catch (error) {
  //         console.error("Failed to fetch collectors:", error);
  //       }
  //     };

  //     fetchCollector();
  //   }, [selectedZone]);

  const handleSubmit = async (values: any) => {
    console.log("values", values);

    const paymentData = {
      amount: Number(values.amount),
      collector_id: idCollector,
      zone_id: id,
      payment_month: isMonthlyPayment
        ? moment().format("MMMM")
        : values.paymentDate.format("MMMM"), // Hozirgi oy
      payment_date: isMonthlyPayment
        ? moment().format("YYYY-MM-DD") // Bugungi sana
        : values.paymentDate.format("YYYY-MM-DD"), // Tanlangan sana
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
      fetchUsers();
      form.resetFields();
    } catch (error) {
      console.log(error);

      message.error("Failed to add payment");
    }
  };

  return (
    <Modal
      style={{ top: 30 }}
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

        <Form.Item name="isMonthly" label="Bu oy uchunmi?">
          <Radio.Group onChange={(e) => setIsMonthlyPayment(e.target.value)}>
            <Radio value={true}>Ha</Radio>
            <Radio value={false}>Yo'q</Radio>
          </Radio.Group>
        </Form.Item>
        {!isMonthlyPayment && (
          <Form.Item
            name="paymentDate"
            label="Sana"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        )}
        {/* <Form.Item name="zone" label="Hudud" rules={[{ required: true }]}>
          <Select
            placeholder="Hududni tanlang"
            onChange={(value) => setSelectedCollector(value)}
          >
            {selectedZone?.map((collector) => (
              <Select.Option key={collector.id} value={collector.id}>
                {collector.zone_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}
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
