import { io } from 'socket.io-client'
import { ResourceQueryService } from './api/ResourceQueryService'
import { useEffect } from 'react'
import { BASE_URL } from './api/api'

const socket = io(BASE_URL + '')

export default function useWebSocket<T>(
  key: string,
  queryService: ResourceQueryService<T, T>,
) {
  useEffect(() => {
    socket.on(key, (event) => {
      if (event !== null) {
        queryService.invalidateQueries()
      }
    })

    return () => {
      socket.off(key)
    }
  }, [queryService, key])
}
