import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Select from './Select_Users';

const mapProps = ({ users, filters }) => {
  const { before, after } = filters.date;
  return {
    users,
    before,
    after,
    user: filters.user,
  };
};

const allActions = {
  addFilterUser: actions.addFilterUser,
  addFilterDateBefore: actions.addFilterDateBefore,
  addFilterDateAfter: actions.addFilterDateAfter,
  addFilterText: actions.addFilterText,
};

class FiltersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textSearch: '' };
  }

  changeDataFilter = (type) => ({ target }) => {
    const { textSearch } = this.state;
    const {
      addFilterUser,
      addFilterDateBefore,
      addFilterDateAfter,
      addFilterText,
    } = this.props;
    switch (type) {
      case 'user':
        addFilterUser({ user: target.value });
        break;
      case 'before':
        addFilterDateBefore({ before: target.value });
        break;
      case 'after':
        addFilterDateAfter({ after: target.value });
        break;
      case 'text':
        addFilterText({ text: textSearch });
        break;
      default:
    }
  }

  changeTextSearch = ({ target }) => {
    this.setState({ textSearch: target.value });
  }

  render() {
    const {
      users,
      before,
      after,
      user,
    } = this.props;
    const { textSearch } = this.state;
    const labelsDateFilters = [{ type: 'before', text: 'от' }, { type: 'after', text: 'до' }];
    return (
      <form>
        <div className="block-user">
          <Select users={users} onChange={this.changeDataFilter('user')} type="mainMenu" user={user} />
        </div>
        <div className="search-data">
          {labelsDateFilters.map((label) => (
            <label key={label.type} htmlFor>
              {label.text}
              <input onChange={this.changeDataFilter(`${label.type}`)} type="date" value={label.type === 'before' ? before : after} className="styleInputDate" />
              <img src="../images/data2.png" alt="data" width="35" height="35" />
            </label>
          ))}
        </div>
        <div className="block-search">
          <button onClick={this.changeDataFilter('text')} type="button" className="img-search">
            <img src="../images/search.png" width="35" height="35" alt="search" />
          </button>
          <input onChange={this.changeTextSearch} className="styleInputSearch" type="name" value={textSearch} placeholder="поиск по тексту" />
        </div>
      </form>
    );
  }
}

export default connect(mapProps, allActions)(FiltersForm);
