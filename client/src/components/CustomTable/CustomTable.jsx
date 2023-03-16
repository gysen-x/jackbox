import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomButton from '../CustomButton/CustomButton';

export const mockDataInvoices = [
  {
    id: 1,
    roomName: 'Game1',
    gameName: 'Рифмы и панчи',
    members: '0/8',
    isPassword: true,
  },
];

export default function CustomTable() {
  // const [allRooms, setAllRooms] = useState([]);
  // const [filtredRooms, setFiltredRooms] = useState([]);

  // useEffect(() => {
  //   const response = fetch('/rooms');
  //   response
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllRooms(data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const columns = [
    {
      field: 'id', headerName: 'ID',
    }, // column won't grow
    {
      field: 'roomName', headerName: 'Room Name', flex: 1, cellClassName: 'name-column--cell',
    }, // column will grow
    {
      field: 'gameName', headerName: 'Game Name', flex: 1,
    }, // column will grow
    {
      field: 'members', headerName: 'Members', flex: 1,
    }, // column will grow
    {
      field: 'isPassword',
      headerName: '',
      flex: 1,
      renderCell: (
        { row: { isPassword } },
      ) => (
        <CustomButton
          title="Button"
          fontSize="13px"
          className={isPassword}
          size={['70px', '10px']}
        />
      ),
    }, // custom cell
  ];

  return (
    <Box m="20px">
      <h1>Table title</h1>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            borderRadius: '20px',
            border: '4px solid #333',
            boxShadow: '0px 5px #333',
            overflow: 'hidden',
          },
          // '& .MuiDataGrid-cell': {
          //   borderBottom: 'none',
          // },
          '& .name-column--cell': {
            color: 'white',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f7e7be',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: '#009f92',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: '#f7e7be',
          },
          '& .MuiCheckbox-root': {
            color: `${'#f7e7be'} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataInvoices}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
