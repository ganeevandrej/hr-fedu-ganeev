declare module '@mui/material/styles' {
	interface Palette {
		status: Partial<Record<import('./models/tasks').TasksStatuses, string>>;
		appHeader: string;
		button: { delete: string };
		type: {
			standard: string;
			premium: string;
			expiring: string;
		};
	}
	interface PaletteOptions {
		status: Partial<Record<import('./models/tasks').TasksStatuses, string>>;
		appHeader: string;
		button: { delete: string };
		type: {
			standard: string;
			premium: string;
			expiring: string;
		};
	}
	interface TypographyVariants {
		tableHeader: React.CSSProperties;
		expiring: React.CSSProperties;
	}
	interface TypographyVariantsOptions {
		tableHeader?: React.CSSProperties;
		expiring?: React.CSSProperties;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		tableHeader: true;
		expiring: true;
	}
}

export default createTheme;
