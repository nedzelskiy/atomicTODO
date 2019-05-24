import * as React from 'react';
import withTranslator, { TranslateHelperProps } from '../../containers/decorators/withTranslator';

interface Props extends TranslateHelperProps {}

class Loading extends React.Component<Readonly<Props>, {}> {
  render() {
    const { t } = this.props;
    return (
      <div>{t('Loading...')}</div>
    );
  }
}

export default withTranslator(Loading);
