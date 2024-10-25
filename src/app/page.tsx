import Home from '@/app/home';

export default function Page() {
  return (
    <div className="relative flex m-auto lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 pointer-events-none [&_*]:pointer-events-auto">
      <Home />
    </div>
  );
}

