import { EthTokenEnum, NotificationType } from 'helpers/types';

export interface IProps {
	token: EthTokenEnum;
	setResponse: (response: NotificationType) => void;
	handleClose: () => void;
}
