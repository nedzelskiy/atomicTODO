import * as React from 'react';
import withTranslator, { TranslateHelperProps } from '../../hocs/withTranslator';

interface Props extends TranslateHelperProps {}

class LoadingPage extends React.Component<Readonly<Props>, {}> {
  render() {
    const { t } = this.props;
    return (
      <div>{t('Loading...')}</div>
    );
  }
}

export default withTranslator(LoadingPage);
