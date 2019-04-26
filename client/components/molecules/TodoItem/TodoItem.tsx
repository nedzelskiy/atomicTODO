import * as React from 'react';
import Button from '../../atomes/Button/Button';
import withTranslations, { I18nTranslatePropsHelper } from '../../../hocs/withTranslations';
import './todoitem.styles.scss';

export interface Props extends I18nTranslatePropsHelper {
  id: number;
  isDone: boolean;
  todoName: string;
  onDelete: (id: number) => void;
  onTriggerDone: (id: number) => void;
}

class TodoItem extends React.Component<Props, {}>{
  render() {
    const { isDone, todoName, t, onTriggerDone, onDelete , id } = this.props;
    const onTriggerDoneBinded: React.MouseEventHandler<HTMLElement> = () => {
      onTriggerDone.call(onTriggerDone, id);
    };
    const onDeleteBinded: React.MouseEventHandler<HTMLElement> = () => {
      onDelete.call(onDelete, id);
    };
    return (
      <div className={`todo-item ${isDone ? 'done' : ''}`}>
        <span className="todo-name">{todoName}</span>
        <Button
          className="todo-trigger-done"
          text="&#10004;"
          onClick={onTriggerDoneBinded}
        />
        <Button
          className="todo-delete"
          text={t('delete')}
          onClick={onDeleteBinded}
        />
      </div>
    );
  }
}

export default withTranslations(TodoItem);
