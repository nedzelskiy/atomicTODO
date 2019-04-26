import * as React from 'react';
import Button from '../../atomes/Button/Button';
import withTranslations, { I18nTranslatePropsHelper } from '../../../hocs/withTranslations';

export interface Props extends I18nTranslatePropsHelper {
  todoName: string;
  isDone: boolean;
}

class TodoItem extends React.Component<Props, {}>{
  render() {
    const { isDone, todoName, t } = this.props;
    return (
      <div className={`todo-item ${isDone ? 'done' : ''}`}>
        {todoName}
        <Button
          className="todo-trigger-done"
          text="&#10004;"
        />
        <Button
          className="todo-delete"
          text={t('delete')}
        />
      </div>
    );
  }
}

export default withTranslations(TodoItem);
