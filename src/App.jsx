import { useEffect, useState } from 'react'

const baseApi = "http://localhost:3000/api"
function App() {
  const [count, setCount] = useState(0)
  //http://localhost:3000/api/posts giao thuc+ten mien+dia chi IP
  //khac 1 trong 3 => khac nguon goc
  //origin nguon goc 5173 goi sang 3000 => khac nguon goc
  //cors ngan lay du lieu o nguon goc khac
  //Access-Control-Allow-Origin nguon cho phep goi sang
  //la chinh sach cua trinh duyet, sd postman, app... van duoc
  //=> tao may chu trung gian frontend => api cua ban => api nguoi khac => goi thanh cong
  //ko cung goc => ko set cookie
  const [user, setUser] = useState(null)
  const [fields, setFields] = useState({
    email: 'levanlinh@gmail.com',
    password: 123456
  })
  const [error, setError] = useState("")
  const setFieldValue = ({ target: { name, value } }) => {
    setFields(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    fetch(`${baseApi}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(fields)
    })
      .then((res) => {
        if (res.ok) return res.json()
        throw res
      })
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error.status);
        if (error.status == 401) {
          setError("Email or password is not true")
        } else {
          setError("Ko xac dinh, lien he linh@gmail.com")
        }
      })
  }

  useEffect(() => {
    fetch(`${baseApi}/auth/me`, {
      credentials: "include"
    })
      .then((res) => {
        if (res.ok) return res.json()
        throw res
      })
      .then(me => {
        setUser(me)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      {user ? (
        <p>Hello, {user.name}</p>
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email"
              name='email'
              value={fields.email}
              onChange={setFieldValue}
              id='email'
            />

            <label htmlFor="Password">password</label>
            <input type="password"
              name='password'
              value={fields.password}
              onChange={setFieldValue}
              id='password'
            />
            <button type='submit'>Login</button>
          </form>
          {!!error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  )
}

export default App
