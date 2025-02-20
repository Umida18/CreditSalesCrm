// import { useCallback, useEffect, useState } from "react";
// import { Table, Button, Modal, Form, Input, notification } from "antd";
// import { MdEditSquare } from "react-icons/md";
// import { BASE_URL } from "../../config";
import { MainLayout } from "../mainlayout";

const Collector = () => {
  // const [data, setData] = useState<any>([]);
  // const [modalVisible, setModalVisible] = useState<any>(false);
  // const [form] = Form.useForm();
  // const [editingCollector, setEditingCollector] = useState<any>(null);

  // const fetchCollectors = useCallback(async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/collector`);
  //     const result = await response.json();
  //     setData(result);
  //   } catch (error) {
  //     console.error("Error fetching collectors:", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchCollectors();
  // }, [fetchCollectors]);

  // const handleOpenModal = (collector: any = null) => {
  //   setEditingCollector(collector);
  //   form.setFieldsValue(
  //     collector
  //       ? { name: collector.collector_name, description: collector.description }
  //       : { name: "", description: "" }
  //   );
  //   setModalVisible(true);
  // };

  // const handleCloseModal = () => {
  //   setModalVisible(false);
  //   form.resetFields();
  // };

  // const handleSubmit = async (values: any) => {
  //   try {
  //     const method = editingCollector ? "PUT" : "POST";
  //     const url = editingCollector
  //       ? `${BASE_URL}/collector/update/${editingCollector.id}`
  //       : `${BASE_URL}/collector/add`;

  //     const response = await fetch(url, {
  //       method,
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         collector_name: values.name,
  //         description: values.description,
  //       }),
  //     });

  //     if (response.ok) {
  //       fetchCollectors();
  //       handleCloseModal();
  //       notification.success({
  //         message: editingCollector
  //           ? "Yig'uvchi muvaffaqiyatli yangilandi!"
  //           : "Yig'uvchi muvaffaqiyatli qo'shildi!",
  //         placement: "topRight",
  //       });
  //     } else {
  //       throw new Error("Error saving collector");
  //     }
  //   } catch (error) {
  //     console.error("Error saving collector:", error);
  //     //   openNotification("error", "Something went wrong!");
  //   }
  // };

  // const columns = [
  //   { title: "ID", dataIndex: "id", key: "id" },
  //   { title: "Name", dataIndex: "collector_name", key: "collector_name" },
  //   {
  //     title: "Created At",
  //     dataIndex: "createdat",
  //     key: "createdat",
  //     render: (date: any) => new Date(date).toLocaleString("en-GB"),
  //   },
  //   { title: "Description", dataIndex: "description", key: "description" },
  //   {
  //     title: "Actions",
  //     key: "actions",
  //     render: (_: any, record: any) => (
  //       <Button type="link" onClick={() => handleOpenModal(record)}>
  //         <MdEditSquare className="text-blue-500 text-xl" />
  //       </Button>
  //     ),
  //   },
  // ];

  return (
    <MainLayout>
      <div className="">
        {/* <Button
          type="primary"
          onClick={() => handleOpenModal()}
          className="mb-3"
        >
          Add Collector
        </Button> */}
        <p>ggggggggggg</p>
        {/* <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        /> */}

        {/* <Modal
          title={editingCollector ? "Edit Collector" : "Add Collector"}
          visible={modalVisible}
          onCancel={handleCloseModal}
          onOk={() => form.submit()}
          okText={editingCollector ? "Save Changes" : "Add"}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter collector name" },
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input placeholder="Enter description" />
            </Form.Item>
          </Form>
        </Modal> */}
      </div>
    </MainLayout>
  );
};

export default Collector;
