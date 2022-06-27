import CheckIcon from 'icons/CheckIcon';
import { FC } from 'react';

type Props = {
  iconType?: ['alert', 'error', 'success'];
  text?: string;
  children?: JSX.Element | JSX.Element[];
};

const SuccessIcon = <CheckIcon />;

const TooltipIcon = ({ iconType }) => {};

const TooltipNotification: FC<Props> = (props) => {
  return <></>;
};

export default TooltipNotification;
