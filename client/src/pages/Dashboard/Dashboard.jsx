import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3001/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUsers(data.data);
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "userName",
      headerName: "User name",
      width: 110,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const id = params.row._id;
        return (
          <div>
            <Link to={`/user/${id}`}>
              <button>Edit</button>
            </Link>

            <button onClick={() => handleDelete(id)}>Delete</button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userData"));
    console.log(userdata);
    setData(userdata);

    fetch("http://localhost:3001/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setUsers(data.data);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data.email}</p>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Dashboard;
