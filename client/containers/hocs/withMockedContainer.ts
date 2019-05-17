import { ReactComponent } from '../../utils/interfaces';

const withMockedContainer =
  (pureComponent: ReactComponent, component: ReactComponent): ReactComponent => {
    return process.env.MODE === 'storybook'
      ? pureComponent
      : component;
  };

export default withMockedContainer;
