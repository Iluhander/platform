export default function fixId(...obj: any) {
  if (obj?._id) {
    obj.id = obj._id;
    delete obj._id;
  }
}
