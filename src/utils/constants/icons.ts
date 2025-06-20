import { Library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { IconDefinition, IconPack, IconPrefix } from '@fortawesome/free-solid-svg-icons'

export const importAllIcons = (lib: Library) => {
  type IconDefinitionOrPack = IconDefinition | IconPack
  interface ImportedIcons {
    [key: string]: IconPrefix | IconDefinitionOrPack
  }

  // Type `Icons` as a interface containing keys whose values are
  // union of the resulting union type from above and `IconPrefix`.
  const iconList = Object.keys(Icons)
    .filter((key) => key !== 'fas' && key !== 'prefix')
    .map((icon) => (Icons as ImportedIcons)[icon])

  lib.add(...(iconList as IconDefinitionOrPack[]))
}

export const iconMap = {
  apple: 'apple-alt',
  bath: 'bath',
  battery: 'battery-full',
  bed: 'bed',
  bell: 'bell',
  bird: 'dove',
  book: 'book',
  breakfast: 'mug-saucer',
  bus: 'bus',
  calendar: 'calendar',
  camera: 'camera',
  car: 'car',
  cat: 'cat',
  church: 'church',
  clock: 'clock',
  computer: 'computer',
  default: 'bolt-lightning',
  desk: 'desktop',
  doctor: 'user-doctor',
  dog: 'dog',
  email: 'envelope',
  fish: 'fish',
  food: 'bowl-food',
  game: 'gamepad',
  glasses: 'glasses',
  headphones: 'headphones',
  heart: 'heart',
  house: 'house',
  internet: 'wifi',
  lightbulb: 'lightbulb',
  lock: 'lock',
  mosque: 'mosque',
  music: 'music',
  phone: 'phone',
  plug: 'plug',
  poo: 'poo',
  rice: 'bowl-rice',
  robot: 'robot',
  school: 'school',
  shower: 'shower',
  star: 'star',
  synagogue: 'synagogue',
  toilet: 'toilet',
  tooth: 'tooth',
  uniform: 'shirt',
  van: 'van-shuttle',
  videogame: 'gamepad',
  wifi: 'wifi',
  worship: 'place-of-worship',
}
