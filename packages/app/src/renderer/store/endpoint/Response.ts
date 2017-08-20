import { observable, action, computed } from "mobx";
import { bind } from "decko";
export type ResponseType = "json" | "xml" | "javascript" | "text";

export default class Response {
  @observable contentType: ResponseType;
  @observable content: string;

  constructor(type: ResponseType, responseContent: string = "") {
    this.contentType = type;
    this.content = responseContent;
  }

  @action.bound
  setType(value: ResponseType) {
    this.contentType = value;

    if (this.contentType === "javascript") {
      this.content = `
// Following variables are available for you to use
// request: express js request object
// response: express js response object

response.set('Content-Type', 'application/json');
response.send({
  message: 'Hello from atmo!'
});
`;
    } else {
      this.content = "";
    }
  }

  @action.bound
  setResponseContent(response: string) {
    this.content = response;
  }

  @computed
  get typeForEditor() {
    if (this.contentType === "text") {
      return "markdown"; // Ace editor does not understand text
    }
    return this.contentType;
  }

  toJson() {
    let content = null;
    if (!this.content) {
      content = "{}";
    } else {
      content = this.content;
    }

    return {
      contentType: this.contentType,
      content: eval(`(${content})`),
      rawContent: content
    };
  }

  @action.bound
  prettifyResponse() {
    let options = {};

    if (this.contentType === "json") {
      options = { parser: "json" };
    }
  }

  static deserialize({
    type,
    responseContent
  }: {
    type: ResponseType;
    responseContent: string;
  }) {
    return new Response(type, responseContent);
  }
}
