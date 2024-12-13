import {useEffect, useRef} from 'react';
import {AiEditor} from 'aieditor';
import 'aieditor/dist/style.css';

function MyAiEditor({value, onGetValue}) {
    const divRef = useRef(null);
    const aiEditorRef = useRef(null);
    const editorContentRef = useRef(value);  // 保存编辑器内容的 ref

    // 初始化 AiEditor
    useEffect(() => {
        if (divRef.current) {
            aiEditorRef.current = new AiEditor({
                element: divRef.current,
                placeholder: '点击输入内容...',
                content: value,
                onChange: (editor) => {
                    // 更新 editorContentRef 并且同步到父组件
                    editorContentRef.current = editor.getMarkdown();
                },
            });

            return () => {
                aiEditorRef.current.destroy();
                aiEditorRef.current = null;
            };
        }
    }, [value]);

    // 当父组件的 value 变化时，更新 AiEditor 内容
    useEffect(() => {
        if (aiEditorRef.current && value !== aiEditorRef.current.getMarkdown()) {
            aiEditorRef.current.setContent(value || '');
        }
    }, [value]);

    // 失去焦点时调用回调将当前内容传递给父组件
    const handleBlur = () => {
        if (onGetValue) {
            onGetValue(editorContentRef.current);  // 将内容传递给父组件
        }
    };

    return (
        <div>
            <div
                ref={divRef}
                style={{height: '600px'}}
                onBlur={handleBlur}  // 失去焦点时触发
            />
        </div>
    );
}

export default MyAiEditor;
