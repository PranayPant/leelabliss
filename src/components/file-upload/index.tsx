import { readFile } from "./helpers";

export function FileUpload() {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const files = event.currentTarget.files;
    const readPromises = Array.from(files ?? []).map((file) => readFile(file));
    await Promise.all(readPromises);
    console.log("all done");
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
      <div>
        <input
          onChange={onChange}
          type="file"
          id="file"
          name="file"
          accept="image/*,video/*"
          multiple
        />
      </div>
      <div>
        <button type="submit">Upload</button>
      </div>
    </form>
  );
}
