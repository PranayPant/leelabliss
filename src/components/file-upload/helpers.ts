export async function readFile(file: File) {
  const oneMB = 1024 * 1000;
  console.log("file size", (file.size / oneMB).toFixed(1), "MB");
  //   const chunkSize = oneMB * 8;
  //   for (var offset = 0; offset < file.size; offset += eightMB) {
  //     var eightMBData = await file.slice(offset, offset + eightMB);
  //     console.log(file.name, (oneKBData.size / (1024 * 1000)).toFixed(1), "MB");
  //   }
}
