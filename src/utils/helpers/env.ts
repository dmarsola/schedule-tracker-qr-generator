/**
 * Get an environment variable value by name.
 * @param name - environment variable name
 * @throws error if value not available
 */
export const env = (name: string): string => {
  const value = process.env[name]
  if (value == undefined) {
    throw new Error(`Environment variable ${name} is undefined.`)
  }
  return value
}
