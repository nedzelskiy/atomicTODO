import * as React from 'react';
import ChangeThemeBtn from '../../../containers/buttons/ChangeThemeBtn/ChangeThemeBtn';

let i = 0;

const ChangeThemePanel = () => (
  <div>
    <div>YAHOO!!!!!!!!!! {i++}</div>
    <ChangeThemeBtn theme="white" />
    <ChangeThemeBtn theme="dark" />
  </div>
);

export default ChangeThemePanel;
