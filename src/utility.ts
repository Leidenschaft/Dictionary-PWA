import { XMLParser } from 'fast-xml-parser';

export const XML2JSON = <T extends object>(raw: string): T =>
    new XMLParser({
        ignoreAttributes: false,
        parseAttributeValue: true,
        attributeNamePrefix: '',
        textNodeName: 'text'
    }).parse(raw);
