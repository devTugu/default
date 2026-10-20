// @ts-nocheck
"use client"

import { lazy, Suspense } from "react"
import type { ApexOptions } from "apexcharts"
import { Card } from "@default/ui/primitives/card"
import { Checkbox } from "@default/ui/primitives/checkbox"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, } from "@default/ui/primitives/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@default/ui/primitives/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@default/ui/primitives/tabs"

const Chart = lazy(() => import("react-apexcharts"))
import { EllipsisVertical } from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const dropdownItems = ['Action', 'Another action', 'Something else']

const RecentProjectsData = [
  {
    logotext: 'PS',
    logotextcolor: 'bg-sky-400/10 text-sky-400',
    logoimg: '',
    name: 'Photoshop',
    budgets: '$29,374.60',
    leader: 'Erin',
    chart: 'success',
    teams: [
      {
        id: 1,
        user: 'https://images.shadcnspace.com/assets/profiles/user-2.jpg',
      },
      {
        id: 2,
        user: 'https://images.shadcnspace.com/assets/profiles/user-3.jpg',
      },
      {
        id: 3,
        user: 'https://images.shadcnspace.com/assets/profiles/user-4.jpg',
      },
      { id: 4, user: '', count: '+3' },
    ],
  },
  {
    logotext: '',
    logotextcolor: 'bg-amber-300/10 text-amber-300',
    logoimg:
      'https://images.shadcnspace.com/assets/svgs/icon-diamond.svg',
    name: 'Website SEO',
    budgets: '$1,843.73',
    leader: 'Timothy',
    chart: 'error',
    teams: [
      {
        id: 1,
        user: 'https://images.shadcnspace.com/assets/profiles/user-5.jpg',
      },
      {
        id: 2,
        user: 'https://images.shadcnspace.com/assets/profiles/user-6.jpg',
      },
      {
        id: 3,
        user: 'https://images.shadcnspace.com/assets/profiles/user-4.jpg',
      },
      { id: 4, user: '', count: '+3' },
    ],
  },
  {
    logotext: 'WS',
    logotextcolor: 'bg-teal-400/10 text-teal-400',
    logoimg: '',
    name: 'iOS Mobile App Design',
    budgets: '$0.9989',
    leader: 'Tyler',
    chart: 'primary',
    teams: [
      {
        id: 1,
        user: 'https://images.shadcnspace.com/assets/profiles/user-2.jpg',
      },
      {
        id: 2,
        user: 'https://images.shadcnspace.com/assets/profiles/user-3.jpg',
      },
      {
        id: 3,
        user: 'https://images.shadcnspace.com/assets/profiles/user-4.jpg',
      },
      { id: 4, user: '', count: '+3' },
    ],
  },
  {
    logotext: '',
    logotextcolor: 'bg-blue-500/10 text-blue-500',
    logoimg:
      'https://images.shadcnspace.com/assets/svgs/icon-figma.svg',
    name: 'Figma Components',
    budgets: '$238.61',
    leader: 'Kristen',
    chart: 'warning',
    teams: [
      {
        id: 1,
        user: 'https://images.shadcnspace.com/assets/profiles/user-6.jpg',
      },
      {
        id: 2,
        user: 'https://images.shadcnspace.com/assets/profiles/user-3.jpg',
      },
      {
        id: 3,
        user: 'https://images.shadcnspace.com/assets/profiles/user-2.jpg',
      },
      { id: 4, user: '', count: '+3' },
    ],
  },
  {
    logotext: '',
    logotextcolor: 'bg-sky-400/10 text-sky-400',
    logoimg:
      'https://images.shadcnspace.com/assets/svgs/icon-react.svg',
    name: 'Web App Design',
    budgets: '$0.629',
    leader: 'Isabelle',
    chart: 'success',
    teams: [
      {
        id: 1,
        user: 'https://images.shadcnspace.com/assets/profiles/user-3.jpg',
      },
      {
        id: 2,
        user: 'https://images.shadcnspace.com/assets/profiles/user-2.jpg',
      },
      {
        id: 3,
        user: 'https://images.shadcnspace.com/assets/profiles/user-5.jpg',
      },
      { id: 4, user: '', count: '+3' },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*                               CHART CONFIG                                 */
/* -------------------------------------------------------------------------- */

const chartColors: Record<string, string> = {
  success: 'oklch(70.4% 0.14 182.503)',
  error: 'oklch(64.5% 0.246 16.439)',
  warning: 'oklch(79.5% 0.184 86.047)',
  primary: 'oklch(68.5% 0.169 237.323)',
}

const createChartOptions = (color: string): ApexOptions => ({
  chart: {
    type: 'area',
    width: 143,
    height: 14,
    sparkline: { enabled: true },
    group: 'table-chart',
    fontFamily: 'inherit',
    foreColor: '#adb0bb',
  },
  colors: [color],
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
    crosshairs: { show: false },
  },
  yaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
    crosshairs: { show: false },
  },
  series: [{ color, data: [25, 66, 20, 40, 12, 58, 20] }],
  stroke: { curve: 'smooth', width: 2 },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0,
      inverseColors: false,
      opacityFrom: 0,
      opacityTo: 0,
      stops: [20, 180],
    },
  },
  markers: { size: 0 },
  tooltip: { enabled: false },
})

/* -------------------------------------------------------------------------- */
/*                               TABLE ROW                                    */
/* -------------------------------------------------------------------------- */

const ProjectRow = ({ item }: any) => {
  const chartOptions = createChartOptions(chartColors[item.chart])

  return (
    <TableRow className='hover:bg-transparent'>
      <TableCell className='px-6'>
        <Checkbox className='cursor-pointer' />
      </TableCell>

      <TableCell>
        <div className='flex gap-5 items-center'>
          <span
            className={`w-10 h-10 rounded-full flex items-center justify-center ${item.logotextcolor}`}>
            {item.logoimg ? (
              <img
                src={item.logoimg}
                alt='logo'
                className={`object-contain ${item.logoimg.includes('figma') ? 'w-5 h-5' : 'w-6 h-6'
                  }`}
              />
            ) : (
              <p className='text-sm font-medium'>{item.logotext}</p>
            )}
          </span>
          <h6 className='font-medium'>{item.name}</h6>
        </div>
      </TableCell>

      <TableCell className='font-medium'>{item.budgets}</TableCell>

      <TableCell>
        <div className='flex justify-start flex-nowrap'>
          {item.teams.map((team: any, i: number) => (
            <div key={i} className='-ms-2'>
              {team.user ? (
                <img
                  src={team.user}
                  alt='user'
                  className='border-2 border-border rounded-full shrink-0 min-w-[30px] min-h-[30px]'
                  width={30}
                  height={30}
                />
              ) : (
                <div className="p-0.5 bg-background rounded-full">
                  <div className='bg-sky-400/10 h-[30px] w-[30px] min-w-[30px] shrink-0 flex items-center justify-center rounded-full'>
                    {team.count}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </TableCell>

      <TableCell className='text-muted-foreground'>
        {item.leader}
      </TableCell>

      <TableCell className='text-start flex items-center justify-start pe-6'>
        <div className='py-5 [&_.apexcharts-ycrosshairs]:hidden [&_.apexcharts-xcrosshairs]:hidden'>
          <Suspense fallback={null}>
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type='area'
              height='14'
              width='143'
            />
          </Suspense>
        </div>
      </TableCell>
    </TableRow>
  )
}

/* -------------------------------------------------------------------------- */
/*                               TABLE COMPONENT                               */
/* -------------------------------------------------------------------------- */

const ProjectTable = ({ data }: any) => (
  <div className='overflow-x-auto'>
    <Table className='mt-2'>
      <TableHeader>
        <TableRow className='hover:bg-transparent'>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Leader</TableHead>
          <TableHead className='pe-6'>Activity Log</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any, i: number) => (
          <ProjectRow key={i} item={item} />
        ))}
      </TableBody>
    </Table>
  </div>
)

/* -------------------------------------------------------------------------- */
/*                                MAIN VIEW                                   */
/* -------------------------------------------------------------------------- */

export default function RecentProjects() {
  return (
    <div className='lg:py-20 sm:py-16 py-8 px-4 max-w-4xl mx-auto'>
      <Card className='w-full max-w-7xl mx-auto py-6 gap-6 overflow-x-auto'>
        <Tabs defaultValue='Sass' className='min-w-3xl'>
          <div className='flex sm:flex-row flex-col justify-between sm:items-center items-start gap-5 px-6'>
            <h5 className='text-lg font-medium'>Recent Projects</h5>

            <div className='flex gap-3'>
              <TabsList className='flex flex-wrap bg-muted rounded-full w-fit group-data-horizontal/tabs:h-auto'>
                {/*  */}
                <TabsTrigger
                  value='Sass'
                  className='py-1.5 px-4 rounded-full min-w-24 text-base font-medium data-[state=active]:bg-background dark:data-[state=active]:bg-dark data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground cursor-pointer h-auto'>
                  Sass
                </TabsTrigger>
                {/*  */}
                <TabsTrigger
                  value='Mobile'
                  className='py-1.5 px-4 rounded-full min-w-24 text-base font-medium data-[state=active]:bg-background dark:data-[state=active]:bg-dark data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground cursor-pointer h-auto'>
                  Mobile
                </TabsTrigger>
                {/*  */}
                <TabsTrigger
                  value='Others'
                  className='py-1.5 px-4 rounded-full min-w-24 text-base font-medium data-[state=active]:bg-background dark:data-[state=active]:bg-dark data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground cursor-pointer h-auto'>
                  Others
                </TabsTrigger>
              </TabsList>

              <DropdownMenu>
                <DropdownMenuTrigger className='outline-none'>
                  <span className='h-9 w-9 flex justify-center items-center rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer'>
                    <EllipsisVertical size={22} />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {dropdownItems.map((item, i) => (
                    <DropdownMenuItem
                      key={i}
                      className='font-normal cursor-pointer'>
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value='Sass'>
            <ProjectTable data={RecentProjectsData} />
          </TabsContent>

          <TabsContent value='Mobile'>
            <ProjectTable data={RecentProjectsData.slice(0, 3)} />
          </TabsContent>

          <TabsContent value='Others'>
            <ProjectTable data={RecentProjectsData.slice(3)} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
