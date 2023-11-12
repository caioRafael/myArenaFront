/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosResponse } from 'axios'

export interface Response<T> {
  headers: T
  status: number
  data: T
}

export interface IBaseApi<Q, C> {
  getAll(url: string, token?: string): Promise<Response<Q[]>>
  getOne(url: string, token?: string): Promise<Response<Q>>
  post(
    url: string,
    data?: Record<string, any>,
    token?: string,
  ): Promise<Response<C | C[]>>
  put(
    url: string,
    token?: string,
    data?: Record<string, any>,
  ): Promise<Response<C>>
  patch(
    url: string,
    data?: Record<string, any>,
    token?: string,
  ): Promise<Response<C>>
  delete(url: string, token?: string): Promise<Response<void>>
  upload(
    url: string,
    data: Record<string, any>,
    token?: string,
    onUploadProgress?: (progressEvent: any) => void,
    signal?: AbortSignal,
  ): Promise<Response<C>>
  updateUpload(
    url: string,
    data: Record<string, any>,
    token?: string,
    onUploadProgress?: (progressEvent: any) => void,
    signal?: AbortSignal,
  ): Promise<Response<C>>
  download(
    url: string,
    data?: unknown,
    onDownloadProgress?: (progressEvent: any) => void,
  ): Promise<AxiosResponse>
  regenerateToken(): Promise<unknown>
}
