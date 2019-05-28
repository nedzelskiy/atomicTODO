import * as React from 'react';
import NotFound from '../NotFound/NotFound';

interface Props {
  code?: number;
  message: string;
}

class Error extends React.Component<Readonly<Props>, {}>{
  render() {
    console.log(this.props);
    if (this.props.code === 404) {
      return <NotFound />;
    }
    return (
      <div>error {this.props.message}</div>
    );
  }
}

export default Error;
