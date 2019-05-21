import React from 'react';
import { stylesTagID } from './pre-build';
import { getAllowedThemes, getThemeFileName } from '../config';
import addons, { types } from '@storybook/addons';

class ThemeChanger extends React.Component {
  static getHrefTag(themeName) {
    return `/storybook/${getThemeFileName('storybook', themeName)}`;
  }

  renderThemesOptions() {
    return this.props.themes.map((themeName) => {
       return <option key={themeName} value={themeName}>{themeName}</option>;
     });
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.getThemeTag = this.getThemeTag.bind(this);
  }

  getThemeTag() {
    if (!this.stylesTag) {
      this.stylesTag = document.getElementById('storybook-preview-iframe')
        .contentWindow.document.getElementById(stylesTagID);
    }
    return this.stylesTag;
  }

  onChange(e) {
    const stylesTag = this.getThemeTag();
    const themeName = e.target.value;
    stylesTag.setAttribute('href', ThemeChanger.getHrefTag(themeName));
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
          {this.renderThemesOptions()}
        </select>
      );
    }
    return null;
  }
}

addons.register('themeChanger', api => {
  const render = ({ active }) => (
    <ThemeChanger
      api={api}
      active={active}
      themes={Array.from(getAllowedThemes())}
      key="theme-changer"
    />
  );
  const title = 'Themes';

  addons.add('themeChanger', {
    type: types.PANEL,
    title,
    render,
  });
});
