import * as React from 'react';
import Button from '../../atomes/button/Button';
import { withTranslations, I18nTranslatePropsHelper } from '../../../utils/I18n';

export const todoItemCreator = ({ t }: I18nTranslatePropsHelper): JSX.Element => (
    <div className="create-todo-item">
        <input />
        <Button
            className = "create-todo"
            text={`+ ${t('New task')}`}
        />
    </div>
);

export default withTranslations(todoItemCreator);
