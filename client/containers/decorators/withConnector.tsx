import * as React from 'react';
import { ReactComponent } from '../../utils/interfaces';

export default (
  component: ReactComponent,
  pureComponent: ReactComponent,
  pureComponentProps? : object,
): ReactComponent => {
  return process.env.MODE === 'storybook'
    ? getPureComponent(pureComponent, pureComponentProps)
    : component;
};

const getPureComponent = (Component: ReactComponent, props: object | undefined): ReactComponent => {
  return props
    ? p => (<Component {...p} {...props} />)
    : Component;
};
