import React, { useState, useEffect } from 'react'
import axios from '../api/axios'

const Protected = () => {
  const [resource, setResource] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProtectedResource = async () => {
      // try {
      //   const token = localStorage.getItem('token')
      //   const response = await axios.get('/api/users/protected', {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      //   setResource(response.data)
      // } catch (err) {
      //   setError('Failed to fetch protected resource')
      //   console.error('Error fetching protected resource:', err)
      // }
      try {
        // const response = await axios.get('/api/users/protected');
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get('/api/users/protected', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
        setResource(response.data);
        console.log(response.data)
      } catch (err) {
        setError('Failed to fetch protected resource')
        console.error('Error fetching protected resource:', err)
      }
    }

    fetchProtectedResource()
  }, [])

  return (
    <div>
      <h2>Protected Resource</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{resource || 'Loading...'}</p>
      )}
    </div>
  )
}

export default Protected
