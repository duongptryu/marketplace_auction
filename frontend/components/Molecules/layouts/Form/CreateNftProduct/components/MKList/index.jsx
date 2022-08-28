import React from "react"

// Import Component Mui
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"

// Import Icon
import DeleteIcon from "@mui/icons-material/Delete"
import PhotoIcon from "@mui/icons-material/Photo"

import MyListRoot from "./MyListRoot"
import { verify } from "@dfinity/agent"
/*
  item = {
    id: v4(),
    file: File
  }
*/
function MKList({ items, handleOnClick, ...rest }) {
  return (
    <MyListRoot {...rest}>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemIcon>
            <PhotoIcon />
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            onClick={() => {
              handleOnClick({
                url: item.url,
                id: item.id,
              })
            }}
          />
        </ListItem>
      ))}
    </MyListRoot>
  )
}

export default MKList
