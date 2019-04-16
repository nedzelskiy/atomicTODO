import * as React from 'react';
import Button from '../../atomes/button/Button';

export default (): JSX.Element => (
    <div className="create-todo-item">
        <input />
        <Button
            className="create-todo"
            text="+ Add New"
        />
    </div>
)
