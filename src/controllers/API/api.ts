import { FlowType } from "@/types/flow";
import axios from "axios";

// 创建模拟数据接口
const mockData = {
  types: {
    LLMComponent: {
      type: "LLMComponent",
      display_name: "LLM",
      description: "Language model component",
      base_classes: ["LLM"],
      fields: {
        model: {
          type: "str",
          required: true,
          display_name: "Model",
          options: ["gpt-3.5-turbo", "gpt-4", "claude-3"],
        },
        temperature: {
          type: "float",
          required: false,
          display_name: "Temperature",
          default: 0.7,
        },
      },
    },
    PromptComponent: {
      type: "PromptComponent",
      display_name: "Prompt",
      description: "Prompt template component",
      base_classes: ["Prompt"],
      fields: {
        template: {
          type: "str",
          required: true,
          display_name: "Template",
          multiline: true,
        },
      },
    },
    OutputParserComponent: {
      type: "OutputParserComponent",
      display_name: "Output Parser",
      description: "Parse output from LLM",
      base_classes: ["OutputParser"],
      fields: {
        format: {
          type: "str",
          required: true,
          display_name: "Format",
          options: ["json", "xml", "yaml"],
        },
      },
    },
  },
  flows: [
    {
      id: "f678749d-9275-4539-9ed4-592488fe6d01",
      name: "Simple Chat Flow",
      description: "A basic chat flow with LLM",
      data: {
        nodes: [
          {
            id: "llm-1",
            type: "genericNode",
            position: { x: 200, y: 200 },
            data: {
              type: "LLMComponent",
              node: {
                display_name: "LLM",
                description: "Language model component",
              },
              id: "llm-1",
              value: {
                model: "gpt-3.5-turbo",
                temperature: 0.7,
              },
            },
          },
          {
            id: "prompt-1",
            type: "genericNode",
            position: { x: 0, y: 200 },
            data: {
              type: "PromptComponent",
              node: {
                display_name: "Prompt",
                description: "Prompt template component",
              },
              id: "prompt-1",
              value: {
                template: "You are a helpful assistant. User: {{query}}",
              },
            },
          },
          {
            id: "parser-1",
            type: "genericNode",
            position: { x: 400, y: 200 },
            data: {
              type: "OutputParserComponent",
              node: {
                display_name: "Output Parser",
                description: "Parse output from LLM",
              },
              id: "parser-1",
              value: {
                format: "json",
              },
            },
          },
        ],
        edges: [
          {
            id: "edge-1",
            source: "prompt-1",
            target: "llm-1",
            sourceHandle: "output",
            targetHandle: "input",
          },
          {
            id: "edge-2",
            source: "llm-1",
            target: "parser-1",
            sourceHandle: "output",
            targetHandle: "input",
          },
        ],
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  examples: [
    {
      id: "example-1",
      name: "Example Flow",
      description: "An example flow to get you started",
      data: {
        nodes: [
          {
            id: "example-llm",
            type: "genericNode",
            position: { x: 200, y: 200 },
            data: {
              type: "LLMComponent",
              node: {
                display_name: "LLM",
                description: "Language model component",
              },
              id: "example-llm",
              value: {
                model: "gpt-3.5-turbo",
                temperature: 0.7,
              },
            },
          },
        ],
        edges: [],
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  config: {
    ui_version: "1.0.0",
    server_version: "1.0.0",
  },
};

// 创建一个 API 模拟
const api = {
  get: async <T>(url: string, config?: any): Promise<{ data: T }> => {
    console.log("Mock API GET:", url);
    
    // 返回模拟数据
    if (url.includes("/all")) {
      return { data: mockData.types as T };
    } else if (url.includes("/flows/basic_examples")) {
      return { data: mockData.examples as T };
    } else if (url.includes("/flows/") && url.includes("f678749d-9275-4539-9ed4-592488fe6d01")) {
      // 如果是根据ID请求特定流程
      const flow = mockData.flows.find(f => f.id === "f678749d-9275-4539-9ed4-592488fe6d01");
      return { data: flow as unknown as T };
    } else if (url.includes("/flows")) {
      return { data: mockData.flows as unknown as T };
    } else if (url.includes("/config")) {
      return { data: mockData.config as unknown as T };
    }

    // 对于不匹配的URL，返回空对象
    return { data: {} as T };
  },
  post: async <T>(url: string, data?: any, config?: any): Promise<{ data: T }> => {
    console.log("Mock API POST:", url, data);
    return { data: {} as T };
  },
  put: async <T>(url: string, data?: any, config?: any): Promise<{ data: T }> => {
    console.log("Mock API PUT:", url, data);
    return { data: {} as T };
  },
  delete: async <T>(url: string, config?: any): Promise<{ data: T }> => {
    console.log("Mock API DELETE:", url);
    return { data: {} as T };
  },
};

export { api }; 