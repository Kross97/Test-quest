import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import { buttonsQuantityAndChannels } from './AST_buttons_span';

const mapProps = ({ dataChannel }) => {
  const props = {
    currentId: dataChannel.currentId,
    quantityTasks: dataChannel.quantityTasks,
  };
  return props;
};

const allActions = {
  addIdCurrent: actions.addIdCurrent,
  addQuantityTasks: actions.addQuantityTasks,
};

class FooterButtons extends React.Component {
changeValueButton = (value, type) => () => {
  const { addIdCurrent, addQuantityTasks } = this.props;
  switch (type) {
    case 'channel':
      addIdCurrent({ id: value });
      break;
    case 'quantity':
      addQuantityTasks({ quantity: value });
      break;
    default:
  }
}

changeChannel = (id) => () => {
  const { addIdCurrent } = this.props;
  addIdCurrent({ id });
}

changeQuantity = (quantity) => () => {
  const { addQuantityTasks } = this.props;
  addQuantityTasks({ quantity });
}

render() {
  const { currentId, quantityTasks } = this.props;
  return (
    <footer className="footer">
      <div className="buttons-quantity-channels row no-gutters">
        <p>Количество строк на странице:</p>
        {buttonsQuantityAndChannels.map((btn) => {
          const styleClass = cn({
            'btn-quantity': btn.type === 'quantity',
            'btn-channel': btn.type === 'channel',
            'quantity-click': quantityTasks === btn.value,
            'channel-click': currentId === btn.value,
            'buttons-channel-first': btn.first,
          });
          return <button key={btn.value} onClick={this.changeValueButton(btn.value, btn.type)} type="button" className={styleClass}>{btn.text}</button>;
        })}
      </div>
    </footer>
  );
}
}
export default connect(mapProps, allActions)(FooterButtons);
