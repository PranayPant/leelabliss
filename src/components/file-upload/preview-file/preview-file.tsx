export function PreviewFile() {
  return (
    <div>
      <img />
      <form>
        <span>
          <label htmlFor="fileName">File name</label>
          <input name="fileName" />
        </span>
        <span>
          <label htmlFor="description">Description</label>
          <input name="description" />
        </span>
        <span>
          <label htmlFor="tags">Add up to 10 tags</label>
          <input name="tags" />
        </span>
      </form>
    </div>
  );
}
