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
  Upload,
  Popconfirm,
  Drawer
} from "antd";
import api from "../api/axios";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import toast from 'react-hot-toast'

const AllProducts = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [loading , setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const [fileList , setFileList] = useState([])

  const [isEdit , setIsEdit] = useState(false)
  const [editingProduct , setEditingProduct] = useState(null)


  const [viewProduct , setViewProduct] = useState(null)


  const openDrawer = (product) => {
    setViewProduct(product)
  }



  const [form] = Form.useForm()


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

      setLoading(true)
      const formData = new FormData()

      formData.append("name" , values.name)
      formData.append("description" , values.description)
      formData.append("price" , values.price)
      formData.append("stock" , values.stock)
      formData.append("category" , values.category)
      
      // New images only (originFileObj exists for new uploads)
      fileList.forEach(file => {
        if(file.originFileObj){
          formData.append("image" , file.originFileObj)
        }
      })

      if(isEdit){
        // send old images array of URL's
        const oldImages = fileList.filter(file => !file.originFileObj).map(file => file.url.replace(import.meta.env.VITE_BASE_URL , ""))

        formData.append("oldImages" , JSON.stringify(oldImages))


        await api.put(`/product/update-product/${editingProduct._id}`,
                      formData ,
                      { headers : { "Content-Type" : "multipart/form-data"}})
        toast.success("Product updated successfully")              
      }else {
        await api.post("/product/add-product" , formData , {
                headers : {
                  "Content-Type" : "multipart/form-data"
                }
              })
      
        toast.success("Product created successfully")
      }


      setIsOpen(false)
      setIsEdit(false)
      setFileList([])
      setEditingProduct(null)
      form.resetFields()
      getAllProducts()


    } catch (error) {
        toast.error("Operation failed")
        console.log(error)
    } finally {
      setLoading(false)
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


  // Delete Product 

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/product/delete-product/${id}`)
      toast.success("Product deleted successfully")
      getAllProducts()
    } catch (error) {
      toast.error("Failed to delete product")
    }
  }
 

  // Edit Product

  const openEditModal = (product) => {
    setIsEdit(true)
    setEditingProduct(product)
    setIsOpen(true)

    form.setFieldsValue({
      name : product.name,
      description : product.description,
      price : product.price,
      category : product.category._id,
      stock : product.stock
    })
    console.log(product.image)
    setFileList(
      product.image.map((img , indx) => ({
        uid : indx,
        name :`image-${indx}`,
        status : "done",
        url : `${import.meta.env.VITE_BASE_URL}${img}`
      }))
    )
  }
  
  
  
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
                    src={`${import.meta.env.VITE_BASE_URL}${product.image[0]}`}
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
                  <Button onClick={() => openDrawer(product)} icon={<Eye key="eye" className="text-gray-700" size={18} />} />
                  <Button onClick={() => openEditModal(product)} icon={<Pencil key="pencil" className="text-gray-700" size={18} />}/>
                  <Popconfirm
                      title="Delete this product ?"
                      description="This action cannot be undone"
                      onConfirm={() => deleteProduct(product._id)}
                    >

                    <Button danger icon={<Trash key="trash" className="text-red-700" size={18} />} />
                    
                  </Popconfirm>
                
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
      <Modal
        title={ isEdit ? "Edit Product" : "Add Product"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        centered
        onOk={() => setIsOpen(false)}
        onCancel={() => {
               setIsOpen(false)
               setIsEdit(false)
               setEditingProduct(null)
               setFileList([])
               form.resetFields()
          }

        }
        width={1000}
        footer={null}
      >
        <Form form={form} layout="vertical" size="large" name="product" onFinish={onFinish}>
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
                <Upload {...uploadProps} fileList={fileList}>
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

            <Button loading={loading} disabled={loading} type="primary" htmlType="submit">
                 { isEdit ? "Update Product" : "Create Product" }
            </Button>
          </div>
        </Form>
      </Modal>

      <Drawer
        title="Product Details"
        open={!!viewProduct}
        onClose={() => setViewProduct(null)}
        size="large"
      >
        {
          viewProduct && (
            <>
                <Row gutter={16}>
                  <Col span={12}>
                    <img 
                      src={`${import.meta.env.VITE_BASE_URL}${viewProduct.image[0]}`}
                      alt={viewProduct.name}
                      className="w-full object-cover h-64 rounded-lg"
                    />
                  </Col>

                  <Col span={12}>
                    <h2 className="text-xl font-semibold mb-2">{viewProduct.name}</h2>
                    <p className="text-gray-600 mb-2">{viewProduct.description}</p>
                    <p className="font-semibold mb-2">Price : ${viewProduct.price}</p>
                    <p className="mb-2">
                      Category : {viewProduct.category.name}
                    </p>
                    <p>Stock : {viewProduct.stock}</p>
                    <p>Status : {viewProduct.isActive ? "Active" : "Inactive"}</p>
                  </Col>
                </Row>

                <Divider />
            
                <Row gutter={16}>
                  {
                    viewProduct.image.map((img , index) => (
                      <Col span={6} key={index} className="my-2">
                      
                        <img 
                          src={`${import.meta.env.VITE_BASE_URL}${img}`} 
                          alt={`photo-${index}`} 
                          className="w-full h-32 rounded-md object-cover"
                          />
                      
                      </Col>
                    ))
                  }
                </Row>
            
            </>
          )
        }
      </Drawer>
    </>
  );
};

export default AllProducts;
