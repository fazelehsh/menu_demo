"use client"

import Image from "next/image";
import { QueryClient, QueryClientProvider ,useQuery} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Tree from './components/menu';


const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example  />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://rasadent-webservice-userpanel.liara.run/api/categories').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <Tree list={data.data} />
    </div>
  )
}




export default App;
