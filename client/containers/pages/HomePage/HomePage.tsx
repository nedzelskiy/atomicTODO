import * as React from 'react';
import { ApplicationRoute } from '../../Router/routes';
import Header from '../../../components/atomes/Header/Header';
import PageTemplate from '../../../components/templates/PageTemplate/PageTemplate';
import TodoListWithControls
  from '../../../containers/lists/TodoListWithControls/TodoListWithControls';

interface Props extends ApplicationRoute {}

class HomePage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
  }

  getHeader() {
    if (this.props.pageComponentProps && this.props.pageComponentProps.hasOwnProperty('header')) {
      return this.props.pageComponentProps.header;
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

export default HomePage;

export const meta = {
  title: 'This is an atomic TODO app',
};
