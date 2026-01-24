import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Form, Card , Table, Popconfirm } from "antd";
import api from "../api/axios";
import toast from 'react-hot-toast'
import { Trash } from "lucide-react";
import EditCategoryModal from "../components/EditCategoryModal";

const Categories = () => {
  const [isShow, setIsShow] = useState(false);
  const [categories , setCategories] = useState([])

  const [isEditOpen , setIsEditOpen] = useState(false)
  const [selectedCategory , setSelectedCategory] = useState(null)

  const openModal = () => {
    setIsShow(true);
  };

  const handleOk = () => {
    setIsShow(false);
  };
  const handleCancel = () => {
    setIsShow(false);
  };

  // Add Category
  const onFinish = async (values) => {
    try {
        const response = await api.post("/category/add-category" , {name : values.name})
        if(response?.data.success){
            toast.success(response?.data.message)
            setIsShow(false)
            getCategories()
        }
    } catch (error) {
        toast.error("Error occurred . Please try again .")
    }
  };

  // Get Categories list 

  const getCategories = async () => {
    try {
        const res = await api.get("/category/categories")
        setCategories(res?.data)
    } catch (error) {
        toast.error("Error occurred . Please try again .")
    }
  }




  // Delete Categories

  const deleteCategory = async (id) => {
      try {
        const res = await api.delete(`/category/delete-category/${id}`)
        if(res.data.success) {
          toast.success("Deleted successfully")
          getCategories()
        }
      } catch (error) {
        toast.error("Error occurred . Please try again .")
        console.log(error)
      }
  }


  const confirm = (categoryId) => {
    console.log(categoryId)
    deleteCategory(categoryId)
  }

  const cancel = (e) => {
    console.log(e)
  }

  useEffect(() => {
    getCategories()
  },[])


  // Edit Categories

  const openEditModal = (category) => {
    setSelectedCategory(category)
    setIsEditOpen(true)
  }

  const closeEditModal = () => {
    setIsEditOpen(false)
  }



const columns = [
    {
    title: '#',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title : "Actions",
    key : "action",
    render : (record) => (
         <div className="space-x-2">
          <Button onClick={() => openEditModal(record)} type="primary">Edit</Button>
          <Popconfirm
              title="Delete the category"
              description="Are you sure to delete this category?"
              onConfirm={() => confirm(record._id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
          </Popconfirm>
        </div>
    
    )
       
  }
];





  return (
    <>
      <Card className="min-h-screen p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Categories Management</h1>
          <Button onClick={openModal} type="primary">
            Add Category
          </Button>
        </div>
        <div className="mt-10">

            <Table dataSource={categories} columns={columns} />
        </div>
      </Card>



      <Modal
        title="Add Category"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isShow}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="category"
          size="large"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter a valid category name!",
              },
            ]}
          >
            <Input placeholder="Enter a category name" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 rounded font-semibold text-lg"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {isEditOpen && (
        <EditCategoryModal
          category={selectedCategory}
          isEditOpen={isEditOpen}
          onCancel={closeEditModal}  
          getCategories={getCategories} 
        />
      )}      
    </>
  );
};

export default Categories;
