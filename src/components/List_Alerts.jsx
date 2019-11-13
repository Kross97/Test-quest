import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';

const mapProps = ({ listAlerts }) => ({ listAlerts });

const allActions = {
  removeAlert: actions.removeAlert,
  removeAllList: actions.removeAllList,
};

class ListAlerts extends React.Component {
removeAlert = (id) => () => {
  const { removeAlert } = this.props;
  removeAlert({ id });
}

cleanList = () => {
  const { removeAllList } = this.props;
  removeAllList();
}

render() {
  const { listAlerts } = this.props;

  setTimeout(this.cleanList, 20000);
  return (
    <div className="list-alerts list-group">
      {listAlerts.map((alert) => {
        const classAlert = cn({
          'item-alert alert': true,
          'alert-dismissible fade show': true,
          'alert-success': alert.type === 'user',
          'alert-primary': alert.type === 'add_task',
          'alert-danger': alert.type === 'remove_task',
        });
        return (
          <div key={alert.id} className={classAlert} role="alert">
            {alert.message}
            <button onClick={this.removeAlert(alert.id)} type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
}

export default connect(mapProps, allActions)(ListAlerts);
