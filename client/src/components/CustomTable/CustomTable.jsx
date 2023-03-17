import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LockIcon from '@mui/icons-material/Lock';
import CustomButton from '../CustomButton/CustomButton';

// client/node_modules/@mui/x-data-grid/models/colDef/gridColDef.d.ts  пропсы для columns
// client/node_modules/@mui/x-data-grid/models/props/DataGridProps.d.ts пропсы для DataGrid

export default function CustomTable({
  allRooms, filtredRooms, handlePrivate, handleClick,
}) {
  const [changedRooms, setChangedRooms] = useState([]);

  useEffect(() => {
    if (filtredRooms.join()) {
      setChangedRooms(filtredRooms);
    } else {
      setChangedRooms(allRooms);
    }
  }, [allRooms, filtredRooms]);

  const columns = [
    {
      field: 'id', headerName: '#', width: 20, sortable: false, disableColumnMenu: true,
    }, // column won't grow
    {
      field: 'name', headerName: 'Room', cellClassName: 'name-column--cell',
    }, // column will grow
    {
      field: 'gameName', headerName: 'Game', width: 120,
    }, // column will grow
    {
      field: 'members',
      headerName: 'Members',
      width: 20,
      disableColumnMenu: true,
      renderCell: ({ row: { members, maxPlayers } }) => (
        `${members}/${maxPlayers}`
      ),
    },
    {
      field: 'isPassword',
      headerName: '',
      width: 20,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (
        { row: { isPassword } },
      ) => (
        isPassword && <LockIcon />
      ),
    },
    {
      field: 'button',
      headerName: '',
      width: 70,
      sortable: false,
      renderCell: (
        { row: { isPassword } },
      ) => (
        <CustomButton
          title="Join"
          fontSize="13px"
          width="50px"
          height="30px"
          handleOnClick={isPassword ? handlePrivate : handleClick}
        />
      ),
    }, // custom cell
  ];

  return (
    <Box>
      <Box
        height="500px"
        width="auto"
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
            width: 'auto',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: '#009f92',
            width: 'auto',
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
          rows={changedRooms}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
