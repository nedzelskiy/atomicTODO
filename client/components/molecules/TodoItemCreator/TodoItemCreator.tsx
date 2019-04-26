import * as React from 'react';
import Button from '../../atomes/Button/Button';
import withTranslations, { I18nTranslatePropsHelper } from '../../../hocs/withTranslations';
import './todoitemcreator.styles.scss';

interface Props extends I18nTranslatePropsHelper {
  onAdd: (todoName: string) => void;
}

class TodoItemCreator extends React.Component<Props, {}> {
  private readonly input: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.input = React.createRef();
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick() {
    if (this.input && this.input.current && this.input.current.value) {
      this.props.onAdd(this.input.current.value);
      this.input.current.value = '';
      this.input.current.blur();
    }
  }

  render() {
    return (
      <div className="create-todo-item">
        <input type="text" ref={this.input}/>
        <Button
          className="create-todo"
          onClick={this.handleBtnClick}
          text={`+ ${this.props.t('New task')}`}
        />
      </div>
    );
  }
}

export default withTranslations(TodoItemCreator);
