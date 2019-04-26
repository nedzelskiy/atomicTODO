import * as React from 'react';
import { withRouter } from 'react-router';
import Button from '../../atomes/Button/Button';
import withTranslations, { I18nTranslatePropsHelper } from '../../../hocs/withTranslations';

interface Props extends I18nTranslatePropsHelper {}

export const todoItemCreator: React.FunctionComponent<I18nTranslatePropsHelper> =
  (props: Props): JSX.Element => (
    <div className="create-todo-item">
        <input />
        <Button
            className = "create-todo"
            text={`+ ${props.t('New task')}`}
        />
    </div>
);

export default withTranslations(todoItemCreator);
