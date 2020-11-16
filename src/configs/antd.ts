import type { App } from 'vue'
import { Avatar, Button, Card, ConfigProvider, List, Select, Progress } from 'ant-design-vue'

/**
 * antd 按需加载配置
 * @param app
 */
export function setupAntd (app: App<Element>): void {
  app
    .use(Avatar)
    .use(Button)
    .use(Card)
    .use(ConfigProvider)
    .use(List)
    .use(Select)
    .use(Progress)
}
