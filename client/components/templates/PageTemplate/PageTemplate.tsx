import * as React from 'react';
import { ReactComponent } from '../../../containers/Router/routes';

interface Props {
  pageName: string;
  Header?: ReactComponent;
  Footer?: ReactComponent;
  children: React.ReactNode;
}

const PageTemplate: React.FunctionComponent<Props> =
  ({ children, pageName, Header, Footer }: Props) => {
    return (
      <div className={`page ${pageName} wrapper`}>
        {Header && <Header />}
        <main>{children}</main>
        {Footer && <Footer />}
      </div>
    );
  };

export default PageTemplate;
