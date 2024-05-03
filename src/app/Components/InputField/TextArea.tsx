import React, { useState, ChangeEvent, useEffect } from "react";
import { z, ZodError } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, RichUtils } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const stringType = z.coerce.string();

interface TextAreaProps {
  type?: "text";
  classNames?: string;
  label?: string;
  clearOnSuccess?: boolean;
  onChange?: (value: string) => void;
}

function TextArea({
  type = "text",
  classNames,
  label,
  clearOnSuccess,
  onChange,
}: TextAreaProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState<string | null>(null);
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>("");

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const inputValue = JSON.stringify(rawContentState);
    validateInput(inputValue);
  };

  const validateInput = (inputValue: string) => {
    try {
      const sanitizedValue = DOMPurify.sanitize(inputValue);
      getTypeValidator().parse(sanitizedValue);
      setError(null);

      if (onChange) {
        onChange(sanitizedValue);
      }
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        setError(validationError.errors[0]?.message ?? "Invalid input");
      } else {
        setError("Invalid input");
      }
    }
  };

  const getTypeValidator = () => {
    switch (type) {
      case "text":
      default:
        return z.string();
    }
  };

  const insertLink = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: linkUrl }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
    setLinkUrl("");
    setShowLinkInput(false);
  };

  useEffect(() => {
    if (clearOnSuccess) {
      setEditorState(EditorState.createEmpty());
    }
  }, [clearOnSuccess]);

  return (
    <div>
      {label && (
        <label className="block  text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <div className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block">
        <hr />
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            options: ["inline", "list", "link"],
            inline: { options: ["bold", "italic", "underline"] },
            link: {
              className: showLinkInput ? "link-input-active" : "",
              onClick: () => {
                console.log("Link option clicked");
                // Implement your custom logic here, such as showing a link input dialog
                setShowLinkInput(true);
              },
            },
          }}
        />

        {showLinkInput && (
          <div className="link-input-container">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter link URL"
              className="link-input"
            />
            <button onClick={insertLink} className="insert-link-button">
              Insert
            </button>
          </div>
        )}
      </div>
      {error && (
        <div className="text-red-500 text-xs mt-1">{`Error: ${error}`}</div>
      )}
    </div>
  );
}

export default TextArea;
