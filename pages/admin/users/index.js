import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Button } from '../../../src/components/button';
import { OutlinedButton } from '../../../src/components/outlinedButton';
import { SearchBar } from '../../../src/components/searchBar';
import Table from '../../../src/components/table';
import DashboardLayout from '../../../src/dashboard/layout';
import { destroy } from '../../../src/services/users';

const style = {
  container: `flex flex-col flex-wrap sm:flex-row`,
  card: `mb-6 shadow-lg rounded-lg dark:rounded bg-white dark:bg-gray-800`,
  topSection: `flex flex-row w-full px-4 pt-4`,
  pagination: `flex flex-row w-full px-4 py-4 text-sm text-purple-800 dark:text-purple-200`,
};

export default function UsersTable() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const { data, error } = useSWR(`/users?limit=${pageLimit}&page=${pageIndex}`);
  const router = useRouter();

  if (error) return 'An error has occured';
  // if (!data) return <DashboardLayout>Loading...</DashboardLayout>;

  const cols = [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Password', accessor: 'password' },
    { Header: 'CreatedAt', accessor: 'createdAt' },
    { Header: 'UpdatedAt', accessor: 'updatedAt' },
  ];

  return (
    <DashboardLayout>
      <div className={`${style.container} ${style.card}`}>
        {/* Header Section: Filters, Search, and Add button */}
        <div className={style.topSection}>
          <div>
            <OutlinedButton color="primary" faIcon="fas fa-filter" size="sm">
              Filter
            </OutlinedButton>
          </div>
          <div className={`ml-4`}>
            <SearchBar hintText="Search..." name="_search" />
          </div>
          <div className={`ml-auto`}>
            <Button
              color="primary"
              size="md"
              onClick={() => router.push(`/admin/users/create`)}
            >
              Add +
            </Button>
          </div>
        </div>

        {/* Table Component */}
        <main className={`w-full mt-4`}>
          <Table
            columns={cols}
            data={data ? data.data : []}
            onView={(row) => {
              router.push(`/admin/users/view/${row.original.id}`);
            }}
            onUpdate={(row) => {
              router.push(`/admin/users/edit/${row.original.id}`);
            }}
            onDelete={async (row) => {
              // remove row
              const tableData = [...data.data];
              tableData.splice(row.index, 1);
              console.log(tableData);

              // update local data immediately
              mutate(
                `/users?limit=${pageLimit}&page=${pageIndex}`,
                { ...data, data: tableData },
                true,
              );

              // update data in server
              await destroy(row.original.id);

              // revalidate
              mutate(`/users?limit=${pageLimit}&page=${pageIndex}`);
            }}
          />
        </main>

        {/* Pagination Component */}
        <div className={style.pagination}>
          <div className={`ml-auto`}>
            <p>Rows per page: {data ? data.limit : 'NaN'}</p>
          </div>
          <div className={`ml-14`}>
            <p>
              Page {data ? data.page : 'NaN'} of{' '}
              {data ? data.total_page : 'Nan'}
            </p>
          </div>
          <div className={`ml-14`}>
            <i
              className="fas fa-chevron-left"
              onClick={() => {
                if (pageIndex > 1) {
                  setPageIndex(pageIndex - 1);
                }
              }}
            ></i>
          </div>
          <div className={`ml-6`}>
            <i
              className="fas fa-chevron-right"
              onClick={() => {
                const total = data ? data.total_page : 1;
                if (pageIndex < total) setPageIndex(pageIndex + 1);
              }}
            ></i>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
