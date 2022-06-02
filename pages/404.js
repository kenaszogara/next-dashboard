import { Button } from '../src/components/button';
import Link from 'next/dist/client/link';
export default function Custom404() {
  return (
    <div className={`flex justify-center w-full h-screen`}>
      <div className={`my-auto flex flex-row`}>
        <div className={`font-bold text-8xl text-red-300`}>404</div>
        <br />
        <div className={`mt-4 ml-4 text-xl font-semibold`}>
          <p className="text-3xl font-extrabold">Page Not Found</p>
          <p>Ops! There's nothing here.</p>
          <br />
          <Link href="/">
            <Button color="primary" size="sm">
              Bring Me Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
