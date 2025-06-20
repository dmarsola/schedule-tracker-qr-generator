import { v4 as uuid } from 'uuid'

export const formatForExport = (data: any, id: string = uuid()) => {
  return {
    uuid: id,
    schedule: data,
  }
}
