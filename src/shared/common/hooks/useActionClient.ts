import { useState } from 'react';
import { ClientPreviewDto } from '@models/clients';

const useActionClient = () => {
	const [client, setClient] = useState<ClientPreviewDto>();
	const [openModalActionClient, setOpenModalActionClient] = useState(false);

	const openActionClient = (client?: ClientPreviewDto) => {
		if (client) {
			setClient(client);
		}
		setOpenModalActionClient(true);
	};

	const closeActionClient = () => {
		setOpenModalActionClient(false);
		setClient(undefined);
	};

	return { client, openModalActionClient, openActionClient, closeActionClient };
};

export { useActionClient };
