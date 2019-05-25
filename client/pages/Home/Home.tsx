import * as React from 'react';
import { ApplicationRoute } from '../../containers/Router/interfaces';
import Header from '../../components/atomes/Header/Header';
import PageTemplate from '../../components/templates/PageTemplate/PageTemplate';
import TodoListWithControls
  from '../../components/organismes/TodoListWithControls/TodoListWithControls';

interface Props extends ApplicationRoute {}

class Home extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
  }

  getHeader() {
    if (this.props.templateProps && this.props.templateProps.hasOwnProperty('header')) {
      return this.props.templateProps.header;
    }
    return Header;
  }

  render() {
    return (
      <PageTemplate
        Header={this.getHeader()}
        pageName={this.props.pageName}
      >
        <TodoListWithControls />
      </PageTemplate>
    );
  }
}

export default Home;

export const meta = {
  title: 'This is an atomic TODO app',
};
