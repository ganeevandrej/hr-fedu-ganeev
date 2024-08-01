import React from 'react';
import BreadCrumbs from '@common/atoms/BreadCrumbs';
import { Breadcrumb } from '@models/breadCrumbs';
import { Box as MuiBox, Button, styled, Typography as MuiTypography } from '@mui/material';

const PageTitle = styled(MuiTypography)(({ theme }) => ({
	color: theme.palette.common.black,
	fontFamily: 'InterBold',
	padding: theme.spacing(4, 0, 3.5, 1),
}));

const PageContainer = styled(MuiBox)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	padding: theme.spacing(0, 5),
}));

const BodyTemplate = styled(MuiBox)({
	flexGrow: 1,
});

const FooterTemplate = styled(MuiBox)(({ theme }) => ({
	paddingBottom: theme.spacing(8),
	marginLeft: 'auto',
	marginTop: theme.spacing(4),
}));

interface PageTemplateProps {
	title: string;
	breadcrumbsData?: Breadcrumb[];
	isFormDirty?: boolean;
	children: React.ReactNode;
	submitFormName?: string;
	submitButtonLabel: string;
	rejectButtonLabel?: string;
	submitButtonHandler?: () => void;
	rejectButtonHandler?: () => void;
}

const PageTemplate = ({
	title,
	breadcrumbsData,
	isFormDirty,
	children,
	submitFormName,
	submitButtonLabel,
	rejectButtonLabel,
	submitButtonHandler,
	rejectButtonHandler,
}: PageTemplateProps) => {
	return (
		<PageContainer>
			{Array.isArray(breadcrumbsData) && <BreadCrumbs title={title} items={breadcrumbsData} />}
			<BodyTemplate>
				<PageTitle variant="h1">{title}</PageTitle>
				{children}
			</BodyTemplate>
			<FooterTemplate>
				{rejectButtonHandler && rejectButtonLabel && (
					<Button
						sx={{
							marginRight: 9,
						}}
						onClick={rejectButtonHandler}
						variant="outlined"
						color="secondary"
						name={rejectButtonLabel}
					>
						{rejectButtonLabel}
					</Button>
				)}
				<Button
					type={submitButtonHandler ? undefined : 'submit'}
					onClick={submitButtonHandler}
					disabled={!isFormDirty}
					variant="contained"
					color="secondary"
					form={submitFormName}
					name={submitFormName}
				>
					{submitButtonLabel}
				</Button>
			</FooterTemplate>
		</PageContainer>
	);
};

export default PageTemplate;
