import * as React from 'react';

interface Props {
  message: string;
}

class Error extends React.Component<Readonly<Props>, {}>{
  render() {
    return (
      <div>error {this.props.message}</div>
    );
  }
}

export default Error;
