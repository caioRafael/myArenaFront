export interface ResourceService<Q, C> {
  findAll(...args: unknown[]): Promise<Q[]>
  findOne(id: string, ...args: unknown[]): Promise<Q | null>
  create(data: C, ...args: unknown[]): Promise<C | null>
  update(data: C | C[], ...args: unknown[]): Promise<C | null>
  delete(id: string | unknown[], ...args: unknown[]): Promise<void>
  queryToCommand(query: Q): C
}
