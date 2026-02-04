import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Divider,
  Modal,
  Form,
  Input,
  Select,
  Upload
} from "antd";
import api from "../api/axios";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import toast from 'react-hot-toast'

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [fileList , setFileList] = useState([])

  const getAllProducts = async () => {
    try {
      const response = await api.get("/product/all-products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Categories list

  const getCategories = async () => {
    try {
      const res = await api.get("/category/categories");
      setCategories(
        res?.data.map((category) => ({
          label: category.name,
          value: category._id,
        })),
      );
    } catch (error) {
      toast.error("Error occurred . Please try again .");
    }
  };


  useEffect(() => {
    getAllProducts();
    getCategories();
  }, []);


  // Add Product

  const onFinish = async (values) => {
    try {
      const formData = new FormData()

      formData.append("name" , values.name)
      formData.append("description" , values.description)
      formData.append("price" , values.price)
      formData.append("stock" , values.stock)
      formData.append("category" , values.category)

      fileList.forEach(file => {
        formData.append("image" , file.originFileObj)
      })

      await api.post("/product/add-product" , formData , {
        headers : {
          "Content-Type" : "multipart/form-data"
        }
      })
      
      toast.success("Product created successfully")
      setIsOpen(false)
      setFileList([])
      getAllProducts()


    } catch (error) {
        toast.error("Error creating product")
        console.log(error)
    }
  }


  const uploadProps = {
    multiple : true,
    maxCount : 8,
    fileList,
    listType : "picture-card",
    beforeUpload : () => false,
    onChange : ({fileList}) => setFileList(fileList)
  }

  console.log(fileList)
  
  return (
    <>
      <Card className="min-h-screen p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Products Management</h1>
          <Button onClick={() => setIsOpen(true)} type="primary">
            Add Product
          </Button>
        </div>

        <Row gutter={16} className="mt-10 p-4">
          {products.map((product) => (
            <Col className="gutter-row" span={6}>
              <Card
                hoverable
                cover={
                  <img
                    draggable={false}
                    alt={product.name}
                    src={product.image[0]}
                  />
                }
              >
                <div className="flex items-center justify-between my-3">
                  <p className="text-md font-semibold">{product.name}</p>
                  <span>${product.price}</span>
                </div>
                <p className="text-md font-semibold text-gray-700">
                  {product.description}
                </p>

                <Divider />

                <div className="my-3 flex items-center justify-between">
                  <Button>
                    <Eye key="eye" className="text-gray-700" size={18} />
                  </Button>
                  <Button>
                    <Pencil key="pencil" className="text-gray-700" size={18} />
                  </Button>
                  <Button danger>
                    <Trash key="trash" className="text-red-700" size={18} />
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
      <Modal
        title="Add a Product"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        centered
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        width={1000}
        footer={null}
      >
        <Form layout="vertical" size="large" name="product" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Product Title"
                name="name"
                rules={[
                  { required: true, message: "Product title is required" },
                ]}
              >
                <Input placeholder="Enter a product title" />
              </Form.Item>
              <Form.Item label="Product Description" name="description">
                <Input.TextArea placeholder="Product Description" />
              </Form.Item>

              <Form.Item label="Product Images" name="image">
                <Upload {...uploadProps}>
                  {
                    fileList.length < 8 && (
                      <div>
                        <PlusCircle />
                        <div className="mt-2">Upload</div>
                      </div>
                    )
                  }
                </Upload>
              </Form.Item>
              <small>
                Upload product images (max 8) , the first one be in the cover
              </small>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Product price is required" },
                ]}
              >
                <Input placeholder="$00" type="number" />
              </Form.Item>
              <Form.Item
                label="Stock"
                name="stock"
                rules={[
                  { required: true, message: "Stock is required" },
                ]}
              >
                <Input placeholder="00" type="number" />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Category type is required" },
                ]}
              >
                <Select options={categories} />
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          <div className="flex justify-end">

            <Button type="primary" htmlType="submit">
                  Create Product
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AllProducts;
