
import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/snippets/json';
import 'ace-builds/src-noconflict/theme-xcode';

const CodeEditor = (props) => {
    return (
        <>
        <AceEditor
            {...props}
            className="code-editor"
            mode="json"
            theme="xcode"
            name="code-editor"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }} />
        </>
    );
};

export default CodeEditor;
