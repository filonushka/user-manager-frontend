import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

export const Home = ({
  setChecked,
  rows,
  isAuth,
  isBlock,
  token,
  logout,
  rerender,
}) => {
  const columns = [
    { field: '_id', headerName: 'ID', sortable: false, width: 250 },
    {
      field: 'fullName',
      headerName: 'Full name',
      sortable: false,
      width: 150,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      sortable: false,
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Registered',
      sortable: false,
      width: 160,
    },
    {
      field: 'authAt',
      headerName: 'Authorized',
      sortable: false,
      width: 160,
    },
    {
      field: 'block',
      headerName: 'Status',
      sortable: false,
      width: 160,
    },
  ]
  const dispatch = useDispatch()

  useEffect(() => {
    rerender()
  }, [])

  if (!token && !isAuth) {
    return <Navigate to="/login" />
  }

  if (token && isAuth) {
    if (isBlock.block) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(rows) => rows._id}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={(params) => setChecked(params)}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  )
}
