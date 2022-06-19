import { useState, useEffect, useMemo, useCallback } from "react";
import Pagination from "./Pagination";
import Search from "./Search";
import Table from "./Table";

const LIMIT = 10;
const BASE_URL = "https://jsonplaceholder.typicode.com";

const Dashboard = () => {
  const [searchValue, setSearchedValue] = useState("");
  const [postsList, setPostsList] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [editData, setEditData] = useState({});

  const getPostsList = useCallback(() => {
    (async function () {
      const posts = await fetch(`${BASE_URL}/posts`).then((res) => res.json());
      setPostsList(posts);
    })();
  }, []);

  useEffect(() => {
    if (Array.isArray(postsList) && postsList.length == 0) {
      getPostsList();
    }
  }, []);

  const onEdit = (data) => {
    setEditData(data);
  };

  const onSave = () => {
    setEditData({});
  };

  const onDelete = (id) => {
    const list = [...postsList];
    list.splice(id, 1);
    setPostsList(list);
  };

  const onChangeEdit = (value, id) => {
    const list = [...postsList];
    list.splice(id - 1, 1, { ...editData, title: value });
    setPostsList(list);
  };

  /* Filter the posts records only on change of searchValue else return all postList */
  const filteredData = useMemo(() => {
    return !searchValue
      ? postsList
      : postsList.filter(
          (item) =>
            item.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        );
  }, [searchValue, postsList]);

  /* Pagination data on changes of page or filterData */
  const perPageData = useMemo(() => {
    return filteredData.slice(activePage * LIMIT, activePage * LIMIT + LIMIT);
  }, [filteredData, activePage]);

  return (
    <div className="p-5">
      <div className="container">
        <div className="row ">
          <div className="d-flex justify-content-between">
            <div>
              <h3>Posts</h3>
            </div>
            <div className="col-3">
              {/* Search component */}
              <Search
                searchValue={searchValue}
                setSearchedValue={(value) => {
                  setSearchedValue(value);
                  setActivePage(0);
                }}
              />
            </div>
          </div>
        </div>
        {/* Table component */}
        <Table
          postsList={perPageData}
          onEdit={onEdit}
          editData={editData}
          onChangeEdit={onChangeEdit}
          onSave={onSave}
          onDelete={onDelete}
        />
        {/* Pagination component */}
        <Pagination
          count={filteredData.length}
          rowsPerPage={LIMIT}
          activePage={activePage}
          onChangePage={setActivePage}
        />
      </div>
    </div>
  );
};
export default Dashboard;
