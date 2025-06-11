import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { CustomButton } from "../../components/ui/Button"
import { useState } from "react"
import AddUser from "./AddUser"

const Users = () => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)


    }
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: '1rem', }}>
                <Typography>User Management</Typography>
                <CustomButton
                    label="Add User"
                    btnType="normal"
                    onClick={handleClick}
                />
            </Box>
            <Dialog open={open}
                onClose={() => setOpen(false)}>
                <DialogTitle>Add User</DialogTitle>
                <hr className="bg-stone-600" />
                <DialogContent sx={{ height: 500 }}>
                    <AddUser />
                </DialogContent>
                <DialogActions>
                    <CustomButton
                        label="Cancel"
                        btnType="cancel"
                        onClick={() => setOpen(false)}
                    // disabled={isSubmitting}
                    />
                    <CustomButton
                        label="Add"
                        btnType="normal"
                        onClick={() => setOpen(false)}
                    // label={isEditMode ? 'Update' : 'Submit'}
                    // btnType="normal"
                    // onClick={handleSubmit}
                    // disabled={isSubmitting}
                    // isLoading={isSubmitting}
                    />
                </DialogActions>

            </Dialog>

        </div>
    )
}

export default Users