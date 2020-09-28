
import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/theme-xcode';

const CodeEditor = ({ defaultValue, onChange=null }) => {
    const [toggleOn, setToggleOn] = useState(true);

    useEffect(() => {
        onChange(defaultValue);
    }, []);

    useEffect(() => {
        setToggleOn(!toggleOn);
    }, [defaultValue]);

    return (
        <>
            {
                toggleOn && <AceEditor
                    className="code-editor"
                    mode="javascript"
                    theme="xcode"
                    name="code-editor"
                    onChange={onChange}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    defaultValue={defaultValue}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }} />
            }
            {
                !toggleOn && <AceEditor
                    className="code-editor"
                    mode="javascript"
                    theme="xcode"
                    name="code-editor"
                    onChange={onChange}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    defaultValue={defaultValue}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }} />
            }

        </>
    );
};

export default CodeEditor;
