import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CustomButton from '../CustomButton/CustomButton';
import style from './style.module.css';

// client/node_modules/@mui/x-data-grid/models/colDef/gridColDef.d.ts  пропсы для columns
// client/node_modules/@mui/x-data-grid/models/props/DataGridProps.d.ts пропсы для DataGrid
// import '@mui/x-data-grid/models/props/DataGridProps';
// import '@mui/x-data-grid/models/colDef/gridColDef';

export default function CustomTable({
  allRooms, filtredRooms, handlePrivate, handleClick,
}) {
  const [changedRooms, setChangedRooms] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  let columns = [];
  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (filtredRooms.join()) {
      setChangedRooms(filtredRooms);
    } else {
      setChangedRooms(allRooms);
    }
  }, [allRooms, filtredRooms]);

  if (width < 520) {
    columns = [
      {
        field: 'name',
        headerName: 'Room',
        cellClassName: 'name-column--cell',
        align: 'center',
      }, // column will grow
      {
        field: 'gameName',
        headerName: 'Game',
        flex: 1,
        maxWidth: 150,
        align: 'center',
      }, // column will grow
      {
        field: 'members',
        headerName: '',
        renderHeader: (() => (<GroupIcon />)),
        width: 30,
        align: 'center',
        renderCell: ({ row: { members, maxPlayers } }) => (
          `${members}/${maxPlayers}/0`
        ),
      },
      {
        field: 'button',
        headerName: '',
        width: 60,
        sortable: false,
        align: 'center',
        renderCell: (
          { row: { isPassword, id } },
        ) => (
          <CustomButton
            id={id}
            className={style.tableButton}
            title={isPassword ? 'Join 🔒' : 'Join'}
            disabled={allRooms.members === allRooms.maxPlayers}
            fontSize="13px"
            width="50px"
            height="30px"
            handleOnClick={isPassword ? handlePrivate : handleClick}
          />
        ),
      }, // custom cell
    ];
  } else {
    columns = [
      {
        field: 'id',
        headerName: '#',
        width: 30,
        align: 'center',
      }, // column will grow
      {
        field: 'name',
        headerName: 'Room',
        cellClassName: 'name-column--cell',
        align: 'center',
      }, // column will grow
      {
        field: 'gameName',
        headerName: 'Game',
        flex: 1,
        maxWidth: 150,
        align: 'center',
      }, // column will grow
      {
        field: 'members',
        headerName: '',
        renderHeader: (() => (<GroupIcon />)),
        width: 30,
        align: 'center',
        renderCell: ({ row: { members, maxPlayers } }) => (
          `${members}/${maxPlayers}`
        ),
      },
      {
        field: 'viewers',
        headerName: '',
        sortable: false,
        align: 'center',
        renderHeader: (() => (<VisibilityIcon />)),
        width: 30,
      },
      {
        field: 'isPassword',
        headerName: '',
        width: 20,
        sortable: false,
        renderHeader: (() => (<LockIcon />)),
        align: 'center',
        renderCell: (
          { row: { isPassword } },
        ) => (
          isPassword && <VpnKeyIcon />
        ),
      },
      {
        field: 'button',
        headerName: '',
        width: 60,
        sortable: false,
        align: 'center',
        renderCell: (
          { row: { isPassword, id } },
        ) => (
          <CustomButton
            id={id}
            className={style.tableButton}
            title="Join"
            fontSize="13px"
            width="50px"
            height="30px"
            handleOnClick={isPassword ? handlePrivate : handleClick}
          />
        ),
      }, // custom cell
    ];
  }

  return (
    <Box
      height="50vh"
      minHeight="300px"
      maxHeight="600px"
      width="100%"
      minWidth="300px"
      maxWidth="500px"
      sx={{
        '& .MuiDataGrid-root': {
          borderRadius: '20px',
          border: '4px solid #333',
          boxShadow: '0px 5px #333',
          overflow: 'hidden',
          minWidth: '300px',
          align: 'center',
          width: '100%',
          maxWidth: '500px',

        },
        '.MuiDataGrid-columnHeader': {
          padding: '0px !important',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          justifyContent: 'center',
        },
        '.MuiDataGrid-columnHeaderTitle': {
          fontSize: '17px',
          fontWeight: 'bold',
          padding: '0px !important',
          justifyContent: 'center',
        },
        // '& .name-column--cell': {
        //   color: 'white',
        //   fontSize: '17px',
        // },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'rgb(247 231 190 / 80%)',
          // color: 'black',
          borderBottom: 'none',
          width: 'auto',
          fontSize: '17px',
          fontWeight: 'bold',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: '#009f92',
          width: 'auto',
        },
        '& .MuiCheckbox-root': {
          color: `${'#f7e7be'} !important`,
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: 'rgb(247 231 190 / 80%)',
        },
        '& .MuiDataGrid-cell': {
          padding: '0px !important',
          fontSize: '17px',
          whiteSpace: 'normal !important',
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
  );
}
