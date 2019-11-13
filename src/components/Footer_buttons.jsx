import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';

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

renderstyleQuantity(numb) {
  const { quantityTasks } = this.props;
  const styleClass = cn({
    'btn-quantity': true,
    'quantity-click': quantityTasks === numb,
  });
  return styleClass;
}

renderstyleChannel(numb) {
  const { currentId } = this.props;
  const styleClass = cn({
    'btn-channel': true,
    'channel-click': currentId === numb,
  });
  return styleClass;
}

render() {
  return (
    <footer className="footer">
      <div className="buttons-quantity row no-gutters">
        <p>Количество строк на странице:</p>
        <button onClick={this.changeQuantity(10)} type="button" className={this.renderstyleQuantity(10)}>10</button>
        <button onClick={this.changeQuantity(50)} type="button" className={this.renderstyleQuantity(50)}>50</button>
        <button onClick={this.changeQuantity(100)} type="button" className={this.renderstyleQuantity(100)}>100</button>
      </div>


      <div className="buttons-channels">
        <button onClick={this.changeChannel(1)} type="button" className={this.renderstyleChannel(1)}>1</button>
        <button onClick={this.changeChannel(2)} type="button" className={this.renderstyleChannel(2)}>2</button>
        <button onClick={this.changeChannel(3)} type="button" className={this.renderstyleChannel(3)}>3</button>
        <button onClick={this.changeChannel(4)} type="button" className={this.renderstyleChannel(4)}>4</button>
        <button onClick={this.changeChannel(5)} type="button" className={this.renderstyleChannel(5)}>5</button>
        <button onClick={this.changeChannel(6)} type="button" className={this.renderstyleChannel(6)}>6</button>
      </div>
    </footer>
  );
}
}
export default connect(mapProps, allActions)(FooterButtons);
