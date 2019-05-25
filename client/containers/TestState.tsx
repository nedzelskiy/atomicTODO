import * as React from 'react';

interface Props {
  name: string;
}

interface State {
  counter: number;
}

class TestState extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0,
    };

    this.onClickHandle = this.onClickHandle.bind(this);
  }

  onClickHandle() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  render() {
    console.log('rerender ', this.props.name);
    return (
      <button style={{
        color: 'black',
        backgroundBlendMode: 'white',
      }}
        onClick={this.onClickHandle}
      >
        <span>{this.props.name}</span><br/>
        <span>{this.state.counter}</span>
      </button>
    );
  }
}

export default TestState;
