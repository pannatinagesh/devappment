import { Layout, LayoutBody } from '@/components/custom/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LineChart from './Chart'

const Dashboard = () => {
  return (
    <Layout className='relative flex w-full flex-col overflow-auto'>
      <LayoutBody className='rounded-lg border bg-white text-card-foreground shadow m-2 p-8 h-full overflow-auto'>
        <div className='flex'>
          <div className='text-6xl'>63,179.71</div>
          <div className='text-1xl text-[#BDBEBF]'>USD</div>
        </div>
        <div className='text-[#67BF6B] text-lg mt-2'>+ 2,161.42 (3.54%)</div>

        <Tabs defaultValue="chart" className="w-full mt-3" orientation="horizontal">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <div className='text-2xl flex justify-center items-center h-[62vh]'>
              Summary Details
            </div>
          </TabsContent>
          <TabsContent value="chart">
            <LineChart />
          </TabsContent>
          <TabsContent value="statistics">
            <div className='text-2xl flex justify-center items-center h-[62vh]'>
              Statistics
            </div>
          </TabsContent>
          <TabsContent value="analysis">
            <div className='text-2xl flex justify-center items-center h-[62vh]'>
              Analysis
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className='text-2xl flex justify-center items-center h-[62vh]'>
              Settings
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  )
}
export default Dashboard
