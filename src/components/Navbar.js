// material
import { alpha, styled } from '@mui/material/styles';
import {Box, Stack, AppBar, Toolbar, IconButton, Button} from '@mui/material';
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.grey.A200, 0.90)
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

// ----------------------------------------------------------------------

export default function Navbar() {
    return (
        <RootStyle>
            <ToolbarStyle>
                <Typography variant="h4" color='dimgray' sx={{ my: 2}}>
                    Testing Platform
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                    <Button size='large'>Log out</Button>
                </Stack>
            </ToolbarStyle>
        </RootStyle>
    );
}
