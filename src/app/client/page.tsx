import { controlClientRoutes } from '@/lib/auth'

export default async function ClientPage() {
  const { username } = await controlClientRoutes()

  if (username) {
    console.log(username)
  }
  return (
    <div>
      <h1>ola mundo</h1>
    </div>
  )
}
