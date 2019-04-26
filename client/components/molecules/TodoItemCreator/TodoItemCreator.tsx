import * as React from 'react';
import Button from '../../atomes/Button/Button';
import withTranslations, { I18nTranslatePropsHelper } from '../../../hocs/withTranslations';
import './todoitemcreator.styles.scss';

interface Props extends I18nTranslatePropsHelper{}

class TodoItemCreator extends React.Component<Props, {}> {
  render() {
    return (
      <div className="create-todo-item">
        <input />
        <Button
          className = "create-todo"
          text={`+ ${this.props.t('New task')}`}
        />
      </div>
    );
  }
}

export default withTranslations(TodoItemCreator);
