import React , { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import toast from "react-hot-toast";
import api from "../api/axios";

const EditCategoryModal = ({ isEditOpen, onCancel, category , getCategories }) => {

  


//   console.log(categoryName)

    const [form] = Form.useForm()
    
    useEffect(() => {
        if(category){
            form.setFieldsValue({
                name : category.name
            })
        }
    },[category , form])


const handleSubmit = async (values) => {
    try {
        const response = await api.put(`/category/update-category/${category._id}`, {name : values.name})
        if(response.status === 200){
            toast.success("Category successfully updated")
            onCancel()
            getCategories()
        }
    } catch (error) {
        toast.error("Update failed")
    }
};
  return (
    <div>
      <Modal
        title="Edit Category"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isEditOpen}
        // onOk={handleSubmit}
        onCancel={onCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Category Name is required !" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 rounded font-semibold text-lg"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditCategoryModal;
