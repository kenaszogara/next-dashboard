import router, { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR, { mutate } from 'swr';
import { Field } from '../../../src/components/field';
import DashboardLayout from '../../../src/dashboard/layout';
import { createUser, editUser } from '../../../src/services/users';
import Custom404 from '../../404';

const Swalert = withReactContent(Swal);

const style = {
  container: `p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg`,
};

export default function UsersPage({ params, id, pageType, is404 }) {
  const key = '/users';
  const { data, error } = useSWR(`${key}/${id}`);
  const router = useRouter();

  if (is404) return <Custom404 />;
  if (error) return 'Error';
  if (!data) return <DashboardLayout>Loading..</DashboardLayout>;

  console.log(data);

  const createData = (values) => {
    // create data in server
    createUser(values);

    // show alert
    Swalert.fire({
      title: <p>Create Successful</p>,
      didClose: () => {
        router.push('/admin/users');
      },
    });
  };

  const updateData = (values) => {
    console.log(values);

    // update local data immediately
    mutate(`${key}/${id}`, { ...data, data: values }, true);

    // update data in server
    editUser(values.id, values);

    // revalidate
    mutate(`${key}/${id}`);

    // show alert
    Swalert.fire({
      title: <p>Update Successful</p>,
      didClose: () => {
        router.push('/admin/users');
      },
    });
  };

  return (
    <DashboardLayout>
      {pageType == 'view' && <View formData={data.data} />}
      {pageType == 'edit' && (
        <Form formData={data.data} formType={pageType} submit={updateData} />
      )}
      {pageType == 'create' && (
        <Form formData={{}} formType={pageType} submit={createData} />
      )}
    </DashboardLayout>
  );
}

function View({ formData }) {
  return (
    <div className={`${style.container}`}>
      <div className={`relative mb-6 mt-3`}>
        <label className="text-gray-700 dark:text-gray-100">Username</label>
        <p>{formData.username}</p>
      </div>
      <div className={`relative mb-6 mt-3`}>
        <label className="text-gray-700 dark:text-gray-100">Email</label>
        <p>{formData.email}</p>
      </div>
      <div className={`relative mb-6 mt-3`}>
        <label className="text-gray-700 dark:text-gray-100">Password</label>
        <p>{formData.password}</p>
      </div>
    </div>
  );
}

function Form({ formData, formType, submit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  return (
    <div className={`${style.container}`}>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('username', { required: 'username required' })}
          dot={true}
          error={errors?.password?.message}
          label="Username"
          name="username"
          type="text"
        />
        <Field
          {...register('email', { required: 'Email is required' })}
          dot={true}
          error={errors?.email?.message}
          label="Email"
          name="email"
        />
        <Field
          {...register('password', { required: 'Password required' })}
          dot={true}
          error={errors?.password?.message}
          label="Password"
          name="password"
          type="password"
        />
        <button
          className="mt-8 px-4 py-1 text-white bg-black active:bg-gray-900 rounded focus:outline-none shadow"
          type="submit"
        >
          {formType == 'create' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const params = context.params;
  const pageType = params.slug[0];
  const secondSlug = params.slug[1] ? params.slug[1] : -1;
  let id = null;
  let is404 = false;

  if (params.slug.length > 2) {
    is404 = true;
  }

  if (!['view', 'edit', 'create'].includes(pageType)) {
    is404 = true;
  }

  // if pageType is create make sure there is not trailing secondSlug
  if (pageType == 'create' && secondSlug != -1) {
    is404 = true;
  }

  // make sure that second slug has to be an id
  if (checkIsNumeric(secondSlug)) {
    id = secondSlug;
  }

  if (pageType != 'create' && secondSlug == -1 && id == null) {
    is404 = true;
  }

  return {
    props: {
      params: context.params,
      id,
      pageType,
      is404,
    },
  };
}

function checkIsNumeric(str) {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
