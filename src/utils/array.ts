export default class ArrayUtils {
  static isEmpty = <Type>(array: Type[]) => {
    return array.length === 0;
  };
}
