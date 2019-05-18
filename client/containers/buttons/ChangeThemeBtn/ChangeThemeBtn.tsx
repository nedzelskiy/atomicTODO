import * as React from 'react';
import Button from '../../../presentations/atomes/buttons/Button/Button';

interface Props {
  theme: string;
}

class ChangeThemeBtn extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    console.log('change theme');
  }

  render() {
    return (
      <Button
        className="change-theme-btn"
        onClick={this.handleOnClick}
      >{this.props.theme}</Button>
    );
  }
}

export default ChangeThemeBtn;
