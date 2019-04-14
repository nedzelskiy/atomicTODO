import * as React from 'react';
import TodoItemCreator from '../molecules/TodoItemCreator/TodoItemCreator';
import './app.styles.scss';

export default (): JSX.Element => (
    <div className="wrapper">
        <TodoItemCreator />
    </div>
);
