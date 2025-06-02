import { EthExchangeType, EthTokenEnum, NotificationType } from 'helpers/types';

export interface IProps {
	token: EthTokenEnum;
	setResponse: (response: NotificationType) => void;
	open: boolean;
	handleClose: () => void;
	defaultTab?: EthExchangeType;
}
