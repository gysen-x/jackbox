import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomButton from '../CustomButton/CustomButton';

// client/node_modules/@mui/x-data-grid/models/colDef/gridColDef.d.ts  пропсы для columns
// client/node_modules/@mui/x-data-grid/models/props/DataGridProps.d.ts пропсы для DataGrid
// import '@mui/x-data-grid/models/props/DataGridProps';
// import '@mui/x-data-grid/models/colDef/gridColDef';

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
      field: 'name', headerName: 'Room', cellClassName: 'name-column--cell',
    }, // column will grow
    {
      field: 'gameName', headerName: 'Game', flex: 1, maxWidth: 150,
    }, // column will grow
    {
      field: 'members',
      headerName: '',
      renderHeader: (() => (<GroupIcon />)),
      width: 30,
      renderCell: ({ row: { members, maxPlayers } }) => (
        `${members}/${maxPlayers}`
      ),
    },
    {
      field: 'viewers',
      headerName: '',
      sortable: false,
      renderHeader: (() => (<VisibilityIcon />)),
      width: 30,
    },
    {
      field: 'isPassword',
      headerName: '',
      width: 20,
      sortable: false,
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
        { row: { isPassword, id } },
      ) => (
        <CustomButton
          id={id}
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
          '.MuiDataGrid-columnHeaderTitle': {
            fontSize: '17px',
            fontWeight: 'bold',
          },
          // '& .name-column--cell': {
          //   color: 'white',
          //   fontSize: '17px',
          // },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f7e7be',
            borderBottom: 'none',
            width: 'auto',
            fontSize: '17px',
            fontWeight: 'bold',
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
          '& .MuiDataGrid-cell': {
            padding: '0px !important',
            fontSize: '17px',
          },

        }}
      >
        <DataGrid
          rows={changedRooms}
          columns={columns}
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
