import { io } from 'socket.io-client'
import { ResourceQueryService } from './api/ResourceQueryService'
import { useEffect } from 'react'

const socket = io('http://localhost:3333')

export default function useWebSocket<T>(
  key: string,
  queryService: ResourceQueryService<T, T>,
) {
  useEffect(() => {
    socket.on(key, (event) => {
      console.log(event)
      if (event !== null) {
        queryService.invalidateQueries()
      }
    })

    return () => {
      socket.off(key)
    }
  }, [queryService, key])
}
