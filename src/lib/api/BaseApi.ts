import { AxiosInstance, AxiosResponse } from 'axios'
import { IBaseApi, Response } from './IBaseApi'
import { api } from './api'

export class BaseApi<Q, C> implements IBaseApi<Q, C> {
  axios: AxiosInstance

  constructor() {
    this.axios = api
  }

  getAll(url: string, token?: string): Promise<Response<Q[]>> {
    return this.axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  }

  getOne(url: string, token?: string): Promise<Response<Q>> {
    return this.axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  }

  post(
    url: string,
    data?: Record<string, unknown> | undefined,
    token?: string,
  ): Promise<Response<C | C[]>> {
    return this.axios.post(url, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  }

  put(
    url: string,
    token?: string,
    data?: Record<string, unknown> | undefined,
  ): Promise<Response<C>> {
    return this.axios.put(url, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  }

  patch(
    url: string,
    data?: Record<string, unknown> | undefined,
    token?: string,
  ): Promise<Response<C>> {
    return this.axios.patch(url, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  }

  delete(url: string, token?: string): Promise<Response<void>> {
    return this.axios.delete(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  }

  upload(
    url: string,
    data: Record<string, unknown>,
    token?: string,
    onUploadProgress?: ((progressEvent: unknown) => void) | undefined,
    signal?: AbortSignal | undefined,
  ): Promise<Response<C>> {
    const formData = new FormData()
    this.buildFormData(formData, data)
    return this.axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Bearer ${token}` : null,
      },
      onUploadProgress,
      signal,
    })
  }

  updateUpload(
    url: string,
    data: Record<string, unknown>,
    token?: string,
    onUploadProgress?: ((progressEvent: unknown) => void) | undefined,
    signal?: AbortSignal | undefined,
  ): Promise<Response<C>> {
    const formData = new FormData()
    this.buildFormData(formData, data)
    return this.axios.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Bearer ${token}` : null,
      },
      onUploadProgress,
      signal,
    })
  }

  download(
    url: string,
    data?: unknown,
    onDownloadProgress?: ((progressEvent: unknown) => void) | undefined,
  ): Promise<AxiosResponse<unknown, unknown>> {
    return this.axios.post(url, data, {
      responseType: 'arraybuffer' as 'json',
      onDownloadProgress,
    })
  }

  regenerateToken(): Promise<unknown> {
    throw new Error('Method not implemented.')
  }

  private buildFormData(formData: FormData, data: any, parentKey?: string) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File) &&
      !(data instanceof Blob)
    ) {
      Object.keys(data).forEach((key: string) => {
        this.buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key,
        )
      })
    } else {
      const value = data == null ? '' : data
      const separateStringsByPoints = parentKey
        ?.replace(/\[(\w+)\]\[(\w+)\]/g, '[$1].$2')
        .split('.')
      const lastWordAfterLastPoint = separateStringsByPoints?.splice(
        separateStringsByPoints?.length - 1,
        1,
      )
      const removeParenthesisOfLastWord = lastWordAfterLastPoint?.[0]
        .replace('[', '.')
        .replace(']', '')
      separateStringsByPoints?.push(removeParenthesisOfLastWord as string)
      const rebuiltString = separateStringsByPoints?.join('.')

      formData.append(rebuiltString as string, value)
    }
  }
}
