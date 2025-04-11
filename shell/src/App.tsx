// import { Button as ShadcnButton } from "@/components/ui/button";
// import Button from '../../mfe-1/src/Button';
// import useCount from "../../mfe-1/src/store/";
import { Layout, LayoutBody } from "./components/custom/layout";

function App() {
  // const [count, setCount] = useCount();

  return (
    <Layout className='relative flex h-full w-full flex-col overflow-hidden'>
      <LayoutBody className='flex flex-col gap-4 items-center justify-center rounded-lg border bg-white text-card-foreground shadow m-2 p-8 h-full overflow-hidden'>
        <h1>Shell Application</h1>
        {/* <Button label="Remote Button Counter" /> */}
        <div className="card">
          {/* <ShadcnButton onClick={() => setCount((count: number) => count + 1)}>
            count is {count}
          </ShadcnButton> */}
        </div>
      </LayoutBody>
    </Layout>
  );
}

export default App;
