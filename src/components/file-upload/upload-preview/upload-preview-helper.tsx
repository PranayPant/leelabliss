import { UploadPreviewState, UploadPreviewStateHandlers } from "./types";
import { TagInput } from "components/tag-input";

type UploadPreviewProps = {
  previews: UploadPreviewState[];
} & UploadPreviewStateHandlers;
export function getUploadPreviewSlides({
  previews,
  handleInputChange,
  handleInputKeydown,
  handleRemoveTag,
}: UploadPreviewProps) {
  return previews.map(({ fileName, tagInput, description, tags }) => ({
    id: fileName,
    data: (
      <div>
        <img />
        <form>
          <span>
            <label htmlFor="fileName">File name</label>
            <input
              id={fileName}
              name={fileName}
              placeholder={fileName}
              value={fileName}
              onChange={handleInputChange}
            />
          </span>
          <span>
            <label htmlFor="description">Description</label>
            <input
              id={fileName}
              name="description"
              placeholder="Enter a meaningful description"
              value={description}
              onChange={handleInputChange}
            />
          </span>
          <span>
            <label htmlFor="tags">Add up to 10 tags</label>
            <TagInput
              tags={tags}
              handleRemoveTag={handleRemoveTag}
              inputProps={{
                id: fileName,
                name: "tagInput",
                value: tagInput,
                onChange: handleInputChange,
                onKeyDown: handleInputKeydown,
              }}
            />
          </span>
        </form>
      </div>
    ),
  }));
}
