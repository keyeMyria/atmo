import * as React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
const { default: AceEditor } = require("react-ace");
import "brace/mode/json";
import "brace/mode/xml";
import "brace/mode/markdown";
import "brace/mode/javascript";
import "brace/theme/github";

const Footer = styled.div`
  background-color: #e8e8e8;
  height: 40px;
`;

const PrettifyButton = styled(Button)`
  margin-left: 41px !important;
  margin-top: 10px !important;
  background: #767676 !important;
  color: white !important;
`;

interface IEditor {
  mode: string;
  code: string;
  onChange: (code: string) => void;
  className?: string;
  width: number;
  onPrettify: () => void;
}

function isPrettifyAvailable(mode) {
  return mode === "javascript";
}

function Editor({
  className,
  mode,
  code,
  width,
  onChange,
  onPrettify
}: IEditor) {
  return (
    <div>
      <AceEditor
        mode={mode}
        fontSize={14}
        theme="github"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
          hScrollBarAlwaysVisible: true
        }}
        className={className}
        wrapEnabled={false}
        width={`calc(100vw - ${width + 260}px)`}
        height="calc(100vh - 40px)"
        value={code}
        onChange={onChange}
      />
      <Footer />
    </div>
  );
}

export default observer(Editor);
