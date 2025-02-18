import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MainLayout } from "../mainlayout";
import api from "../../Api/Api";

interface Workplace {
  id: number;
  workplace_name: string;
  description: string;
  createdat: string;
}

const Workplace: React.FC = () => {
  const [data, setData] = useState<Workplace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoneName, setZoneName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch workplaces
  const fetchWorkplaces = async () => {
    setLoading(true);
    try {
      const response = await api.get("/workplace");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching workplace data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWorkplaces();
  }, []);

  // Handle adding new workplace
  const handleAddZone = async () => {
    if (!zoneName || !description) {
      message.error("Please fill in both fields");
      return;
    }

    try {
      await api.post("/workplace/add", {
        workplace_name: zoneName,
        description,
      });
      message.success("Workplace added successfully!");
      setModalVisible(false);
      fetchWorkplaces();
    } catch (error) {
      console.error("Error adding workplace:", error);
      message.error("Failed to add workplace");
    }
  };

  // Handle updating workplace
  const handleUpdateZone = async () => {
    if (!zoneName || !description) {
      message.error("Please fill in both fields");
      return;
    }

    try {
      await api.put(`/workplace/update/${editId}`, {
        workplace_name: zoneName,
        description,
      });
      message.success("Workplace updated successfully!");
      setModalVisible(false);
      fetchWorkplaces();
    } catch (error) {
      console.error("Error updating workplace:", error);
      message.error("Failed to update workplace");
    }
  };

  // Columns for the table
  const columns: ColumnsType<Workplace> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Zone Name",
      dataIndex: "workplace_name",
      key: "workplace_name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      dataIndex: "createdat",
      key: "createdat",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Workplace) => (
        <Button
          type="primary"
          onClick={() => {
            setEditId(record.id);
            setZoneName(record.workplace_name);
            setDescription(record.description);
            setModalVisible(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <Button
        className="mb-3"
        type="primary"
        onClick={() => {
          setModalVisible(true);
          setEditId(null);
          setZoneName("");
          setDescription("");
        }}
      >
        Add Zone
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editId ? "Update Workplace" : "Add Workplace"}
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
    </MainLayout>
  );
};

export default Workplace;
