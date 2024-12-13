import {AiEditor as AiEditorClass} from "aieditor";
import "aieditor/dist/style.css";
import {useEffect, useRef} from "react";

const AiEditor = ({
                      placeholder,
                      defaultValue,
                      value,
                      onChange,
                      options,
                      ...props
                  }) => {
    const divRef = useRef(null);
    const aiEditorRef = useRef(null);

    useEffect(() => {
        if (!divRef.current) return;

        if (!aiEditorRef.current) {
            const aiEditor = new AiEditorClass({
                element: divRef.current,
                placeholder,
                content: defaultValue,
                onChange: (editor) => {
                    if (typeof onChange === "function") {
                        onChange(editor.getMarkdown());
                    }
                },
                ...options,
            });

            aiEditorRef.current = aiEditor;
        }

        return () => {
            if (aiEditorRef.current) {
                aiEditorRef.current.destroy();
                aiEditorRef.current = null;
            }
        };
    }, [placeholder, defaultValue, options, onChange]);

    useEffect(() => {
        if (aiEditorRef.current && value !== aiEditorRef.current.getMarkdown()) {
            aiEditorRef.current.setContent(value || "");
        }
    }, [value]);

    return <div ref={divRef} {...props} />;
};

export default AiEditor;
