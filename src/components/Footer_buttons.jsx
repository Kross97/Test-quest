import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import { buttonsQuantity, buttonsChannels } from './AST_buttons_span';

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
      <div className="buttons-quantity row no-gutters">
        <p>Количество строк на странице:</p>
        {buttonsQuantity.map((btn) => {
          const styleClass = cn({
            'btn-quantity': true,
            'quantity-click': quantityTasks === btn.value,
          });
          return <button key={btn.value} onClick={this.changeQuantity(btn.value)} type="button" className={styleClass}>{btn.text}</button>;
        })}
      </div>


      <div className="buttons-channels">
        {buttonsChannels.map((btn) => {
          const styleClass = cn({
            'btn-channel': true,
            'channel-click': currentId === btn.value,
          });
          return <button key={btn.value} onClick={this.changeChannel(btn.value)} type="button" className={styleClass}>{btn.text}</button>;
        })}
      </div>
    </footer>
  );
}
}
export default connect(mapProps, allActions)(FooterButtons);
