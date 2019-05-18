import { ReactComponent } from '../../utils/interfaces';

export default (component: ReactComponent, pureComponent: ReactComponent): ReactComponent => {
  return process.env.MODE === 'storybook'
    ? pureComponent
    : component;
};
