import { useCallback, useEffect, useState } from "react";
import { Table, Button, Modal, Input, notification } from "antd";
import axios from "axios";
import { MainLayout } from "../mainlayout";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit2 } from "lucide-react";

const Zone = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoneName, setZoneName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", message: string) => {
    notification[type]({
      message: message,
      placement: "topRight",
    });
  };

  const fetchZones = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/zone`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  }, []);

  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  const handleAddZone = async () => {
    const newZone = { zone_name: zoneName, description };
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/zone/add`, newZone, {
        headers: { "Content-Type": "application/json" },
      });
      setModalVisible(false);
      setZoneName("");
      setDescription("");
      fetchZones();
      openNotification("success", "Hudud muvaffaqiyatli qo‘shildi!");
    } catch (error) {
      console.error("Error adding zone:", error);
      openNotification("error", "Hudud qo‘shishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateZone = async () => {
    const updatedZone = { zone_name: zoneName, description };
    try {
      await axios.put(`${BASE_URL}/zone/update/${editId}`, updatedZone, {
        headers: { "Content-Type": "application/json" },
      });
      setModalVisible(false);
      setZoneName("");
      setDescription("");
      setEditId(null);
      fetchZones();
      toast.success("Hudud muvaffaqiyatli yangilandi!");
    } catch (error) {
      console.error("Error updating zone:", error);
      openNotification("error", "Hudud yangilashda xatolik yuz berdi! ");
    }
  };

  const handleDownload = async (zone: any) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/excel-download?zone_name=${zone}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${zone}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Joy nomi", dataIndex: "zone_name", key: "zone_name" },
    { title: "Ma'lumot", dataIndex: "description", key: "description" },
    {
      title: "Vaqti",
      dataIndex: "createdat",
      key: "createdat",
      render: (text: string) => new Date(text).toLocaleString("en-GB"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button
            type="primary"
            icon={<Edit2 size={16} />}
            onClick={() => {
              setEditId(record.id);
              setZoneName(record.zone_name);
              setDescription(record.description);
              setModalVisible(true);
            }}
          >
            Tahrirlash
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            type="dashed"
            onClick={() => handleDownload(record.zone_name)}
          >
            Exel
          </Button>
        </>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
            setEditId(null);
            setZoneName("");
            setDescription("");
          }}
        >
          Zona qo'shish
        </Button>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          style={{ marginTop: 20 }}
          loading={loading}
        />

        <Modal
          title={editId ? "Update Zone" : "Add Zone"}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={editId ? handleUpdateZone : handleAddZone}
        >
          <Input
            placeholder="Zone name"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Zone;
