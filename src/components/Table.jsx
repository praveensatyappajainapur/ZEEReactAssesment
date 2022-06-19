const Table = ({
  postsList,
  onEdit,
  editData,
  onChangeEdit,
  onSave,
  onDelete,
}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(postsList) ? (
          <>
            {postsList.map((item, i) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>
                  {editData.id === item.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={item.title}
                      onChange={(e) => onChangeEdit(e.target.value, item.id)}
                    />
                  ) : (
                    item.title
                  )}
                </td>
                <td>
                  {editData.id === item.id ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => onSave()}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-info" onClick={() => onDelete(i)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </>
        ) : null}
      </tbody>
    </table>
  );
};
export default Table;
