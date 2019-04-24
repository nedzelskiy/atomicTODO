import * as React from 'react';
import Button from '../../atomes/button/Button';
import withTranslations, { I18nTranslatePropsHelper } from '../../../hocs/withTranslations';

export const todoItemCreator: React.FunctionComponent<I18nTranslatePropsHelper> =
  ({ t }: I18nTranslatePropsHelper): JSX.Element => (
    <div className="create-todo-item">
        <input />
        <Button
            className = "create-todo"
            text={`+ ${t('New task')}`}
        />
    </div>
);

export default withTranslations(todoItemCreator);
