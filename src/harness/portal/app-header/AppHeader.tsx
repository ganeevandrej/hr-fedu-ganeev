import React, { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppBar as MuiAppBar,
	Avatar as MuiAvatar,
	Box as MuiBox,
	styled,
	Tab as MuiTab,
	Tabs as MuiTabs,
	Toolbar as MuiToolbar,
} from '@mui/material';
import Logo from './Logo';

const AppAvatar = styled(MuiAvatar)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	width: 28,
	marginLeft: 'auto',
	height: 28,
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
	zIndex: 100,
	boxShadow: 'none',
	backgroundColor: theme.palette.appHeader,
	height: 46,
}));

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	padding: theme.spacing(3),
}));

const Tabs = styled(MuiTabs)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingLeft: 8,
	['.MuiTabs-indicator']: {
		height: 4,
	},
});

const Box = styled(MuiBox)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	width: '70%',
	height: 46,
	gap: theme.spacing(3),
}));

const Tab = styled(MuiTab)(({ theme }) => ({
	padding: 0,
	color: theme.palette.common.white,
	fontWeight: theme.typography.fontWeightMedium,
	minHeight: 46,
}));

const AppHeader = () => {
	const [, startTransition] = useTransition();
	const [tab, setTab] = useState('/tasks');
	const navigate = useNavigate();

	const handleChange = (event: React.SyntheticEvent, nextTab: string) => {
		startTransition(() => {
			setTab(nextTab);
			navigate(nextTab);
		});
	};

	return (
		<AppBar>
			<Toolbar disableGutters variant="dense">
				<Logo />
				<Box>
					<Tabs value={tab} onChange={handleChange} textColor="primary">
						<Tab disableRipple label="Заявки" value={'/tasks'} />
					</Tabs>
				</Box>
				<AppAvatar />
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
