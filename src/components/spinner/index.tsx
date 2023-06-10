import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import classes from './spinner.module.scss';

interface ISpinProps {
  size?: number;
}

const Spinner = ({ size = 40 }: ISpinProps) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

  return <Spin className={classes.main__spin} indicator={antIcon} />;
};

export { Spinner };
