import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";

const data = [];
for (let i = 1; i < 46; i++) {
  data.push({
    key: i,
    no: i,
    matricule: `15P10 ${i}`,
    name: `Harley Marshall Jane Orlanie ${i}`
  });
}

class App extends Component {
  state = {
    searchText: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "black" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  start = () => {
    //set loading to true then to false after axios 200 response
  this.setState({ loading: true });
  // ajax request after empty completing
  setTimeout(() => {
    this.setState({
      selectedRowKeys: [],
      loading: false,
    });
  }, 1000);
};

  render() {
    const columns = [
      {
        title: "S/N",
        dataIndex: "no",
        key: "no",
        width: "10%"
      },
      {
        title: "Matricule",
        dataIndex: "matricule",
        key: "matricule",
        width: "15%",
        ...this.getColumnSearchProps("matricule")
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "75%",
        ...this.getColumnSearchProps("name")
      }
    ];
    const { loading} = this.state;
    return (
      <div className="reg_candidates">
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.start} loading={loading}>
            Reload
          </Button>
        </div>
        <Table columns={columns} dataSource={data}  />
      </div>
    );
  }
}
export default App;
