import Image from 'next/image'
import ClientInfoTable from './components/ClientInfoTable'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <div>
        <ClientInfoTable/>
      </div>
    </main>
  )
}
