import * as React from 'react';
import Button from '../../atomes/Button/Button';
import withTranslations, { I18nTranslatePropsHelper } from '../../../hocs/withTranslations';

export interface Props extends I18nTranslatePropsHelper {
  todoName: string;
  isDone: boolean;
}

export const todoItem: React.FunctionComponent<Props> =
  (props: Props): JSX.Element => (
    <div className={`todo-item ${props.isDone ? 'done' : ''}`}>
      {props.todoName}
      <Button
        className="todo-trigger-done"
        text="U+2713"
      />
      <Button
        className="todo-delete"
        text={props.t('delete')}
      />
    </div>
  );

export default withTranslations(todoItem);
