import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getPropsArrayFromJsonArrayAdv,
  getRandomStringKey,
} from "../../form generator/shared/utils/utils";
import "./TabView.css";
import { TAB_DATA } from "./values";

class TabView extends Component {
  static DATA_EXAMPLE = TAB_DATA;
  constructor(props) {
    super(props);
    this.state = {
      activeTabId: undefined,
      headers: undefined,
      animeKey: "3323344",
    };
  }
  static getDerivedStateFromProps(props, state) {
    const toGo = {};
    if (state.headers === undefined) {
      const headers = getPropsArrayFromJsonArrayAdv(props.data, (item) => ({
        name: item.name,
        id: item.id,
      }));
      toGo.headers = headers;
    }

    if (state.activeTabId === undefined && props.defaultTab)
      //set default tabid if it exists at mount time
      toGo.activeTabId = props.defaultTab;

    if (!state.activeTabId && !props.defaultTab) {
      // if not defaul ttab is set, just set the first tab item in data as default
      toGo.activeTabId = props.data[0]?.id;
    }

    return toGo;
  }

  renderComponent() {
    const { data } = this.props;
    const { activeTabId } = this.state;
    const tabItem = (data || []).find((tab) => tab.id === activeTabId);
    return tabItem?.component || <> Could not find component </>;
  }
  renderTabHeaders() {
    const { headers, activeTabId } = this.state;
    const { headerRender } = this.props;
    return (headers || []).map((tab, index) => {
      const onClick = () =>
        this.setState({
          activeTabId: tab.id,
          animeKey: getRandomStringKey(),
        });
      const isSelected = activeTabId === tab.id;
      if (headerRender) return headerRender(tab, isSelected, onClick, index);
      return (
        <div
          className={`tab-header ${isSelected && "tab-selected"}`}
          key={index.toString()}
          onClick={onClick}
        >
          <p>{tab.name}</p>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="tab-headers-container">{this.renderTabHeaders()}</div>
        <div className="tab-content-area" key={this.state.animeKey}>
          {this.renderComponent()}
        </div>
      </div>
    );
  }
}

TabView.propTypes = {
  /**
   * Take a look at `TabView.DATA_EXAMPLE` to see the structure of what your data prop should look like
   */
  data: PropTypes.arrayOf(PropTypes.object.object),

  /**
   * To set the preselected tab, add the id of your preferred tab
   */
  defaultTab: PropTypes.string,
  /**
   * Custom function used to render header
   * @param tabItem
   * @param isSelected
   * @param selectorFunction
   * @param index
   */
  headerRender: PropTypes.func,
};
TabView.defaultProps = {
  data: TAB_DATA,
  defaultTab: null,
};

export default TabView;
