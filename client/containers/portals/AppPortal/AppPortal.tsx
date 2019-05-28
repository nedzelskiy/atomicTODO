import * as React from 'react';
import { createPortal } from 'react-dom';

class AppPortal extends React.Component<{}, {}> {
  private readonly domNode: HTMLElement;

  constructor(props: {}) {
    super(props);
    this.domNode = document.body;
  }

  render() {
    return (
      createPortal(
        this.props.children,
        this.domNode,
      )
    );
  }
}

export default AppPortal;
