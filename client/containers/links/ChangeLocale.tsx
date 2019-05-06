import * as React from 'react';
import { Link } from 'react-router-dom';
import withTranslations, { TranslateHelperProps } from '../hocs/withTranslations';

interface Props extends TranslateHelperProps {
  locale: string;
}

class ChangeLocale extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    
  }

  render() {
    return (
      <Link onClick={this.onClick} to={this.props.to}>{this.props.to}</Link>
    );
  }
}

export default withTranslations(ChangeLocale);
