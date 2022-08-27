import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import MySelectionRoot from "components/MKSelection/MySelectionRoot"
import MKTypography from "components/MKTypography"
import Select from "@mui/material/Select"

function MKSelection({ label, name, formik, items }) {
  const handleChange = (event) => {
    formik.setFieldValue(name, event.target.value, false)
  }
  return (
    <MySelectionRoot sx={{ width: "100%" }}>
      <InputLabel id={`${label}-select`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select`}
        id={`${label}-select`}
        value={formik.values[name]}
        label={label}
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {Boolean(formik.errors[name]) && (
        <MKTypography
          color="error"
          sx={{
            margin: "3px 14px",
            marginBottom: "0px",
            position: "absolute",
            top: "100%",
            fontSize: "0.75rem",
            fontWeight: "300",
            lineHeight: "1.25",
          }}
        >
          {formik.errors[name]}
        </MKTypography>
      )}
    </MySelectionRoot>
  )
}

export default MKSelection
