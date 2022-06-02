import { useTable } from 'react-table';
import { Button, ActionButton } from './button';

const style = {
  table: `border-t border-purple-200 w-full text-gray-800 dark:text-gray-200`,
  cell: `text-left px-2 py-2 text-md`,
  row: `border-b border-purple-200`,
  head: `text-purple-900 dark:text-purple-200`,
};

export default function Table({ columns, data, onDelete, onUpdate, onView }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()} className={style.table}>
      <thead className={style.head}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className={style.row}>
            <th></th>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className={style.cell}>
                {column.render('Header')}
              </th>
            ))}
            <th></th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className={`${style.row} ${
                i % 2 == 0 ? `bg-purple-100 dark:bg-gray-600` : ``
              }`}
            >
              <td className={`w-4`}></td>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className={style.cell}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
              <td>
                <ActionButton
                  faIcon={`fas fa-eye`}
                  color={'success'}
                  onClick={() => (onView ? onView(row) : {})}
                />
                <ActionButton
                  faIcon={`fas fa-pen`}
                  color={'primary'}
                  onClick={() => (onUpdate ? onUpdate(row) : {})}
                />
                <ActionButton
                  faIcon={`fas fa-trash`}
                  color={'danger'}
                  onClick={() => onDelete(row)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
