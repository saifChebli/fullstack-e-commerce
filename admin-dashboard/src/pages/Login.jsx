import React , { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Button, Card , Form, Input, Spin } from 'antd'
import { Lock, User } from 'lucide-react'
import { useNavigate , useLocation } from 'react-router-dom'

const Login = () => {


    const { isLogged } = useAuth()

    // const [email , setEmail] = useState("")
    // const [password , setPassword] = useState("")
 
    // const [user , setUser] = useState({
    //     email : "",
    //     password : ""
    // })

    const [form] = Form.useForm()

    const [error , setError] = useState("")
    const [loading , setLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()


    console.log(location)

    // const from = location.state.from.pathname || "/"

    const onFinish = async (values) => {
        console.log(values)
        setLoading(true)
        setError("")
        try {
            const result = await isLogged(values.email , values.password)
            if(result?.success){
                navigate("/dashboard" , { replace : true })
            }else {
                setError(result.error)
            }
        } catch (error) {
            setError("Error occurred . Please try again")
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='min-h-screen p-4 flex items-center justify-center bg-linear-to-br from-purple-50 to-blue-50'>
        <div className='max-w-md w-full mx-auto'>
            <Card className='shadow-lg'>
                <div className='text-center mb-8'>
                    <h1 className='font-bold text-3xl'>Welcome Back</h1>
                    <h3 className='font-semibold text-gray-700'>Sign in your admin dashboard</h3>
                 </div>
                <Form 
                    form={form}
                    name='login'
                    layout='vertical'
                    size='large'
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                            {required : true , message : 'Please input your email!'},
                            {type : 'email' , message : 'Please enter a valid email!'}
                        ]}
                        >
                        <Input 
                          prefix={<User className='text-gray-400'/>} 
                          placeholder='admin@example.com'
                          
                          />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {required : true , message : 'Please input your password!'},
                            {type : 'password' , message : 'Please enter a your password!'},
                            {min : 6 , message : 'Password must be at least 6 characters !'}
                        ]}
                        >
                        <Input.Password 
                          prefix={<Lock className='text-gray-400'/>} 
                          placeholder='Enter your password'
                          />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType='submit'
                            className='w-full h-12 rounded font-semibold text-lg'
                            loading={loading}
                            >
                           {loading ? <Spin /> : "Sign in"} 
                        </Button>
                    </Form.Item>
                </Form>
            
            
            </Card>
        </div>
    </div>
  )
}

export default Login