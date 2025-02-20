import { useEffect, useState } from "react";
// import { MdAdd } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { Modal, Input, Form, message } from "antd";

const Header = ({
  searchTerm,
  setSearchTerm,
  selectedZone,
  setSelectedZone,
  zones,
  setData,
}: any) => {
  // const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // const handleAddUser = () => {
  //   setIsModalVisible(true);
  // };

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch(`${BASE_URL}/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          given_day: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        message.success("Foydalanuvchi muvaffaqiyatli qo'shildi!");
        setIsModalVisible(false);
        form.resetFields(); // Formani tozalash
      } else {
        message.error(
          `Foydalanuvchini qo'shishda xatolik: ${
            result.message || "Nomalum xatolik"
          }`
        );
      }
    } catch (error) {
      message.error("Foydalanuvchini qo'shishda xatolik yuz berdi.");
      console.error("Xatolik:", error);
    }
  };

  useEffect(() => {
    if (!BASE_URL) return;

    const fetchData = async (zoneName: any) => {
      try {
        let url = `${BASE_URL}/zones/filter`;
        if (zoneName) {
          url += `?zone_name=${encodeURIComponent(zoneName)}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (result?.data && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Hududlarni olishda xatolik:", error);
        setData([]);
      }
    };

    if (selectedZone !== null) fetchData(selectedZone);
  }, [selectedZone, setData]);

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        {/* <button
          className="flex gap-4 px-4 py-2 rounded-lg bg-[#0042fd] text-white cursor-pointer"
          onClick={handleAddUser}
        >
          <MdAdd className="text-2xl" />
          <p>Klient qo'shish</p>
        </button> */}

        <div className="flex xl:items-center xl:flex-row flex-col  gap-4">
          <div className="w-80 px-4 py-1 flex gap-4 bg-white rounded-md items-center text-gray-400 border border-gray-300">
            <IoSearchOutline className="text-2xl" />
            <input
              type="text"
              placeholder="Qidirish..."
              className="px-2 py-1 outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-600"
            value={selectedZone || ""}
            onChange={(e) => setSelectedZone(e.target.value.trim() || null)}
          >
            <option value="">Barcha hududlar</option>
            {zones.map((zone: any) => (
              <option key={zone.id} value={zone.zone_name}>
                {zone.zone_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Modal
        title="Foydalanuvchi qo'shish"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Yuborish"
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            cost: 0,
            time: 0,
            phone_number2: "",
          }}
        >
          <Form.Item
            label="Ism"
            name="name"
            rules={[{ required: true, message: "Ismni kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mahsulot nomi"
            name="product_name"
            rules={[{ required: true, message: "Mahsulot nomini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Narx"
            name="cost"
            rules={[{ required: true, message: "Narxni kiriting!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Telefon raqami"
            name="phone_number"
            rules={[{ required: true, message: "Telefon raqamini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Telefon raqami 2" name="phone_number2">
            <Input />
          </Form.Item>
          <Form.Item
            label="Ish joyi ID"
            name="workplace_id"
            rules={[{ required: true, message: "Ish joyi ID sini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vaqt"
            name="time"
            rules={[{ required: true, message: "Vaqtni kiriting!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Hudud ID"
            name="zone_id"
            rules={[{ required: true, message: "Hudud ID sini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sotuvchi"
            name="seller"
            rules={[{ required: true, message: "Sotuvchini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Pasport seriyasi"
            name="passport_series"
            rules={[
              { required: true, message: "Pasport seriyasini kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tavsif" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Header;
