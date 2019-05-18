import { configure } from '@storybook/react';
import '../client/containers/App/app.styles.scss';

const req = require.context('../client', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
