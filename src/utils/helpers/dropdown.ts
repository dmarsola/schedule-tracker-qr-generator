export interface DropdownData {
  name: string
  value: string
}

/**
 * Get an environment variable value by name.
 * @param obj - Object to be turned into dropdown label/value pair
 */
export const getDropdownValue = (obj: { [key: string]: string }): DropdownData[] => {
  const result: DropdownData[] = []
  for (const key in obj) {
    result.push({ name: key, value: obj[key] })
  }
  return result
}
