import * as React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atomes/Button/Button';
import { changeLocale, ChangeLocale } from '../../App/app.redux.actions';

interface Props {
  locale: string;
  changeLocale: ChangeLocale;
}

class ChangeLocaleBtn extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.changeLocale(this.props.locale);
  }

  render() {
    return (
      <Button
        className="change-locale"
        onClick={this.handleOnClick}
      >
        {this.props.locale}
      </Button>
    );
  }
}

export default connect(null, { changeLocale })(ChangeLocaleBtn);
