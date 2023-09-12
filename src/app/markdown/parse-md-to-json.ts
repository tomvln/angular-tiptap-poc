import {unified} from 'unified'
import remarkParse from 'remark-parse'

export const parseMdToJson = async (md: string) => unified()
    .use(remarkParse)
    .process(md)
