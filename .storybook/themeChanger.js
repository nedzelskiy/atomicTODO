import React from 'react';
import { getAllowedThemes } from '../config';
import addons, { types } from '@storybook/addons';

class ThemeChanger extends React.Component {
  static getHrefTag(themeName) {
    return `/storybook/storybook.${themeName}.css`;
  }

  static renderThemesOptions() {
    const options = [];
     getAllowedThemes().forEach((themeName) => {
       options.push(<option key={themeName} value={themeName}>{themeName}</option>);
     });
    return options;
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.getThemeTag = this.getThemeTag.bind(this);
  }

  getThemeTag() {
    if (!this.themeTag) {
      this.themeTag = document.getElementById('storybook-preview-iframe')
        .contentWindow.document.getElementById('storybook');
    }
    return this.themeTag;
  }

  onChange(e) {
    const themeTag = this.getThemeTag();
    const themeName = e.target.value;
    themeTag.setAttribute('href', ThemeChanger.getHrefTag(themeName));
  }

  render() {
    const { active } = this.props;
    if (active) {
      return (
        <select
          className="theme-changer"
          onChange={this.onChange}
          style={{
            padding: "5px",
            margin: "5px",
            fontSize: "14px",
          }}
        >
          {ThemeChanger.renderThemesOptions()}
        </select>
      );
    }
    return null;
  }
}

addons.register('themeChanger', api => {
  const render = ({ active }) => <ThemeChanger api={api} active={active} key="theme-changer" />;
  const title = 'Themes';

  addons.add('themeChanger', {
    type: types.PANEL,
    title,
    render,
  });
});
