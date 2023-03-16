import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LockIcon from '@mui/icons-material/Lock';
import CustomButton from '../CustomButton/CustomButton';

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
      field: 'id', headerName: '#', flex: 1,
    }, // column won't grow
    {
      field: 'name', headerName: 'Room', flex: 1, cellClassName: 'name-column--cell',
    }, // column will grow
    {
      field: 'gameName', headerName: 'Game', flex: 1,
    }, // column will grow
    {
      field: 'members',
      headerName: 'Members',
      flex: 1,
      renderCell: ({ row: { members, maxPlayers } }) => (
        `${members}/${maxPlayers}`
      ),
    },
    {
      field: 'isPassword',
      headerName: 'Private',
      flex: 1,
      renderCell: (
        { row: { isPassword } },
      ) => (
        isPassword && <LockIcon />
      ),
    },
    {
      field: 'button',
      headerName: '',
      flex: 1,
      renderCell: (
        { row: { isPassword } },
      ) => (
        <CustomButton
          title="Button"
          fontSize="13px"
          size={['70px', '10px']}
          handleOnClick={isPassword ? handlePrivate : handleClick}
        />
      ),
    }, // custom cell
  ];

  return (
    <Box m="20px">
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
          rows={changedRooms}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
